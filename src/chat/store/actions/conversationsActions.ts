import {Conversation} from "../../types/conversation";
import {Dispatch} from "redux";
import {
    AddNewConversationAction,
    ConversationsAction,
    ConversationsActionType,
    FilterConversationsAction,
    SelectConversationAction
} from "../types";
import {Message, MessageType} from "../../types/message";
import {User} from "../../../users/types/user";
import {fetchMessagesByIds, postNewConversation, postNewMessage, putConversation} from "../../api";
import {fetchUsersByIds} from "../../../users/api";

export const fetchConversations = (loadedConversations: Conversation[], userId?: string, loadSilent: boolean = false) => {
    return async (dispatch: Dispatch<ConversationsAction>) => {
        try {
            if (loadedConversations.length === 0) {
                return;
            }

            dispatch({type: ConversationsActionType.FETCH_CONVERSATIONS, payload: loadSilent});

            const conversationIds = loadedConversations.map(c => c.id);
            const messages = await fetchMessagesByIds(conversationIds);

            const participantsIds = [...new Set(loadedConversations.flatMap(c => c.participantsIds))];
            const users = await fetchUsersByIds(participantsIds);
            const user = users.find(user => user.id === userId);

            const conversations = loadedConversations.map(conversation => {
                const participants = users.filter(user => user.id !== userId && conversation.participantsIds.includes(user.id));
                const lastMessage = messages.find(message => message.id === conversation.lastMessageId);

                return {
                    ...conversation,
                    id: conversation.id,
                    user,
                    userId: user?.id,
                    participants,
                    lastMessage,
                } as Conversation;
            });

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
            const message = await postNewMessage(messageModel);

            await putConversation(conversationId, {lastMessageId: message.id});

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

export const createConversation = (users: User[], currentUser: User | null) => {
    return async (dispatch: Dispatch<ConversationsAction>) => {
        const participantsIds = [...users.map(u => u.id), currentUser?.id] as string[];
        const participants = await fetchUsersByIds(participantsIds);

        const conversationModel = {participantsIds, lastMessageId: ''};
        const overrides = {
            userId: currentUser?.id,
            user: currentUser as User,
            participants: participants.filter(p => p.id !== currentUser?.id)
        };
        const conversation = await postNewConversation(conversationModel, overrides);

        await dispatch(selectConversation(conversation.id));
    };
};
