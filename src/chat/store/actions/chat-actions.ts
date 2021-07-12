import {Dispatch} from "redux";
import {ChatAction, ChatActionType, FilterConversationMessageAction, SendMessageAction} from "../types/store";
import {Message, MessageType} from "../../types/message";
import {Conversation} from "../../types/conversation";
import {firebaseContextValue} from "../../../contexts/firebase-context";
import {User} from "../../../users/types/user";
import firebase from "firebase";

export const fetchConversations = () => {
    return async (dispatch: Dispatch<ChatAction>) => {
        try {
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

                const userDoc = usersSnapshot.docs.find(doc => doc.id === data.userId);
                const user = docToModel<User>(userDoc);

                const participantsDocs = usersSnapshot.docs.filter(doc => data.participantsIds.includes(doc.id));
                const participants = participantsDocs.map(doc => docToModel<User>(doc));

                const lastMessageDoc = messagesSnapshot.docs.find(doc => doc.id === data.lastMessageId);
                const lastMessage = docToModel<Message>(lastMessageDoc);

                return {
                    ...data,
                    id: doc.id,
                    user,
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

// TODO: refactor inappropriate name of action creator (does not correspond to loading conversation messages)
export const  selectConversation = (conversationId: string) => {
    return async (dispatch: Dispatch<ChatAction>) => {
        try {
            const messagesSnapshot = await firebaseContextValue.firestore
                .collection('messages')
                .where('conversationId', '==', conversationId)
                .orderBy('createdAt', 'asc')
                .get();
            const messages = messagesSnapshot.docs.map(doc => docToModel<Message>(doc));

            dispatch({type: ChatActionType.SELECT_CONVERSATION_SUCCESSFUL, payload: {conversationId, messages}});
        } catch (e) {
            dispatch({type: ChatActionType.SELECT_CONVERSATION_ERROR, payload: e.message});
        }
    };
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

export const filterConversations = (query: string): FilterConversationMessageAction => ({
    type: ChatActionType.FILTER_CONVERSATIONS,
    payload: query
});

function docToModel<T extends {id: string | undefined}>(doc: firebase.firestore.QueryDocumentSnapshot | undefined): T {
    return {
        id: doc?.id,
        ...doc?.data(),
    } as T;
}
