import {Dispatch} from "redux";
import {
    AddNewConversationAction,
    ChatAction,
    ChatActionType,
    ClearConversationMessagesAction,
    FetchConversationMessagesSuccessfulAction,
    FilterConversationsAction,
    SelectConversationAction
} from "../types/store";
import {Message, MessageType} from "../../types/message";
import {Conversation} from "../../types/conversation";
import {User} from "../../../users/types/user";
import {
    addDocumentToCollection,
    fetchAllDocuments,
    fetchDocumentsByFieldValue,
    fetchDocumentsByIds,
    fetchDocumentsNotInIds,
    updateDocumentInCollection
} from "../../../integrations";

export const fetchConversations = (authId?: string) => {
    return async (dispatch: Dispatch<ChatAction>) => {
        try {
            dispatch({type: ChatActionType.FETCH_CONVERSATIONS});

            const conversationsSnapshot = await fetchAllDocuments('conversations');

            const conversationIds = conversationsSnapshot.docs.map(doc => doc.id);
            const messages = await fetchDocumentsByIds<Message>('messages', conversationIds, 'conversationId');

            const participantsIds = [...new Set(conversationsSnapshot.docs.flatMap(doc => doc.data().participantsIds))];
            const users = await fetchDocumentsByIds<User>('users', participantsIds);

            const conversations = conversationsSnapshot.docs.map(doc => {
                const data = doc.data();
                const user = users.find(user => user.authId === authId);
                const participants = users.filter(user => user.authId !== authId && data.participantsIds.includes(user.id));
                const lastMessage = messages.find(message => message.id === data.lastMessageId);

                return {
                    ...data,
                    id: doc.id,
                    user,
                    userId: user?.id,
                    participants,
                    lastMessage,
                };
            }) as Conversation[];

            dispatch({type: ChatActionType.FETCH_CONVERSATIONS_SUCCESSFUL, payload: conversations})
        } catch (e) {
            dispatch({
                type: ChatActionType.FETCH_CONVERSATIONS_ERROR,
                payload: e.message,
            });
        }
    }
};

export const fetchConversationMessagesSuccessful = (messages: Message[]): FetchConversationMessagesSuccessfulAction => (
    {type: ChatActionType.FETCH_CONVERSATION_MESSAGES_SUCCESSFUL, payload: messages}
);

export const fetchConversationMessages = (conversationId: string) => {
    return async (dispatch: Dispatch<ChatAction>) => {
        try {
            const messages = await fetchDocumentsByFieldValue<Message>(
                'messages',
                'conversationId',
                conversationId,
                {fieldPath: 'createdAt', directionStr: 'desc'}
            );

            dispatch(fetchConversationMessagesSuccessful(messages));
        } catch (e) {
            dispatch({type: ChatActionType.FETCH_CONVERSATION_MESSAGES_ERROR, payload: e.message});
        }
    };
};

export const clearConversationMessages = (): ClearConversationMessagesAction => ({type: ChatActionType.CLEAR_CONVERSATION_MESSAGES});

export const sendTextMessage = (content: string, conversationId: string, userId: string) => {
    return async (dispatch: Dispatch<ChatAction>) => {
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
                type: ChatActionType.UPDATE_SELECTED_CONVERSATION_WITH_LAST_MESSAGE,
                payload: message
            });
        } catch (e) {
            alert(e.message);
        }
    };
};

export const selectConversation = (conversationId: string): SelectConversationAction => ({
    type: ChatActionType.SELECT_CONVERSATION,
    payload: conversationId
});

export const addNewConversation = (conversation: Conversation): AddNewConversationAction => ({
    type: ChatActionType.ADD_NEW_CONVERSATION,
    payload: conversation
});

export const storeDraftTextMessage = (conversationId: string, content: string) => ({
    type: ChatActionType.STORE_DRAFT_MESSAGE,
    payload: {conversationId, content},
});

export const filterConversations = (query: string): FilterConversationsAction => ({
    type: ChatActionType.FILTER_CONVERSATIONS,
    payload: query
});

export const createConversation = (user: User | null, currentUser: User | null) => {
    return async (dispatch: Dispatch<ChatAction>) => {
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
        await dispatch(clearConversationMessages());
    };
};

// TODO: refactor move to appropriate file, use userId insted of authId
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
