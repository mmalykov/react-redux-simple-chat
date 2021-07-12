import {Dispatch} from "redux";
import {
    ChatAction,
    ChatActionType,
    FilterConversationMessageAction,
    SelectConversationAction,
    SendMessageAction
} from "../types/store";
import {Message, MessageType} from "../../types/message";
import {Conversation} from "../../types/conversation";
import {firebaseContextValue} from "../../../contexts/firebase-context";
import {User} from "../../../users/types/user";

export const fetchConversations = () => {
    return async (dispatch: Dispatch<ChatAction>) => {
        try {
            dispatch({type: ChatActionType.FETCH_CONVERSATIONS});

            const conversationsSnapshot = await firebaseContextValue.firestore
                .collection('conversations')
                .get();
            // TODO: optimize query to not load all messages
            const messagesSnapshot = await firebaseContextValue.firestore
                .collection('messages')
                .get();
            const usersSnapshot = await firebaseContextValue.firestore
                .collection('users')
                .get();

            const conversations = conversationsSnapshot.docs.map(doc => {
                const data = doc.data();

                const participantsDocs = usersSnapshot.docs.filter(doc => data.participantsIds.includes(doc.id));
                const participants = participantsDocs.map(doc => ({id: doc?.id, ...doc.data()}) as User);

                const lastMessageDoc = messagesSnapshot.docs.find(doc => doc.id === data.lastMessageId);
                const lastMessage = {id: lastMessageDoc?.id, ...lastMessageDoc?.data()} as Message;

                return {
                    ...data,
                    id: doc.id,
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

export const addTextMessage = (content: string, conversationId: string, userId: string): SendMessageAction => ({
    type: ChatActionType.SEND_MESSAGE,
    payload: {
        content,
        conversationId,
        userId,
        messageType: MessageType.TEXT,
        timestamp: Date.now(),
        id: `${Date.now()}`
    }
});

export const storeDraftTextMessage = (conversationId: string, content: string) => ({
    type: ChatActionType.STORE_DRAFT_MESSAGE,
    payload: {conversationId, content},
});

export const selectConversation = (conversationId: string): SelectConversationAction => ({
    type: ChatActionType.SELECT_CONVERSATION,
    payload: conversationId
});

export const filterConversations = (query: string): FilterConversationMessageAction => ({
    type: ChatActionType.FILTER_CONVERSATIONS,
    payload: query
});
