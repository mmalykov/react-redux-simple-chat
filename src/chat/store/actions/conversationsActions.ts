import {Conversation} from "../../types/conversation";
import {Dispatch} from "redux";
import {
    AddNewConversationAction,
    ConversationsAction,
    ConversationsActionType,
    FilterConversationsAction,
    SelectConversationAction
} from "../types";
import {
    addDocumentToCollection,
    fetchDocumentsByIds,
    fetchDocumentsNotInIds,
    updateDocumentInCollection
} from "../../../integrations";
import {Message, MessageType} from "../../types/message";
import {User} from "../../../users/types/user";

export const fetchConversations = (loadedConversations: Conversation[], authId?: string) => {
    return async (dispatch: Dispatch<ConversationsAction>) => {
        try {
            dispatch({type: ConversationsActionType.FETCH_CONVERSATIONS});

            const conversationIds = loadedConversations.map(c => c.id);
            const messages = await fetchDocumentsByIds<Message>('messages', conversationIds, 'conversationId');

            const participantsIds = [...new Set(loadedConversations.flatMap(c => c.participantsIds))];
            const users = await fetchDocumentsByIds<User>('users', participantsIds);

            const conversations = loadedConversations.map(conversation => {
                const user = users.find(user => user.authId === authId);
                const participants = users.filter(user => user.authId !== authId && conversation.participantsIds.includes(user.id));
                const lastMessage = messages.find(message => message.id === conversation.lastMessageId);

                return {
                    ...conversation,
                    id: conversation.id,
                    user,
                    userId: user?.id,
                    participants,
                    lastMessage,
                };
            }) as Conversation[];

            dispatch({type: ConversationsActionType.FETCH_CONVERSATIONS_SUCCESSFUL, payload: conversations})
        } catch (e) {
            dispatch({
                type: ConversationsActionType.FETCH_CONVERSATIONS_ERROR,
                payload: e.message,
            });
        }
    }
};

export const sendTextMessage = (content: string, conversationId: string, userId: string) => {
    return async (dispatch: Dispatch<ConversationsAction>) => {
        try {
            const messageModel = {
                content,
                conversationId,
                userId,
                messageType: MessageType.TEXT,
                createdAt: Date.now(),
                editedAt: Date.now(),
            } as Message;

            const message = await addDocumentToCollection<Message>('messages', messageModel);
            await updateDocumentInCollection('conversations', conversationId, {lastMessageId: message.id});

            dispatch({
                type: ConversationsActionType.UPDATE_SELECTED_CONVERSATION_WITH_LAST_MESSAGE,
                payload: message
            });
        } catch (e) {
            alert(e.message);
        }
    };
};

export const selectConversation = (conversationId: string): SelectConversationAction => ({
    type: ConversationsActionType.SELECT_CONVERSATION,
    payload: conversationId
});

export const addNewConversation = (conversation: Conversation): AddNewConversationAction => ({
    type: ConversationsActionType.ADD_NEW_CONVERSATION,
    payload: conversation
});

export const filterConversations = (query: string): FilterConversationsAction => ({
    type: ConversationsActionType.FILTER_CONVERSATIONS,
    payload: query
});

export const createConversation = (user: User | null, currentUser: User | null) => {
    return async (dispatch: Dispatch<ConversationsAction>) => {
        const participantsIds = [user?.id, currentUser?.id] as string[];
        const participants = await fetchDocumentsByIds<User>('users', participantsIds);

        const documentModel = {participantsIds, lastMessageId: ''};
        const overrides = {
            userId: currentUser?.id,
            user: currentUser as User,
            participants: participants.filter(p => p.id !== currentUser?.id)
        };
        const conversation = await addDocumentToCollection<Conversation>('conversations', documentModel, overrides);

        await dispatch(addNewConversation(conversation));
        await dispatch(selectConversation(conversation.id));
    };
};

// TODO: refactor move to appropriate file, use userId instead of authId
export const fetchUsersForNewConversation = async (conversations: Conversation[], authId: string = ''): Promise<User[]> => {
    try {
        const existedParticipantsIds = conversations.reduce((participantsIds: string[], conversation) => {
            if (conversation.user.authId === authId) {
                const participantsIdsSet = new Set([...participantsIds, ...conversation.participantsIds]);
                return Array.from(participantsIdsSet.values());
            }

            return participantsIds;
        }, []);
        const excludeParticipantsIds = [conversations[0].userId, ...existedParticipantsIds];

        return await fetchDocumentsNotInIds<User>('users', excludeParticipantsIds);
    } catch (e) {
        return [];
    }
};
