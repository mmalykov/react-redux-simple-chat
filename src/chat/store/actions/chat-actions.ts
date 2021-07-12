import {Dispatch} from "redux";
import {
    ChatAction,
    ChatActionType,
    FetchConversationMessagesSuccessfulAction,
    FilterConversationMessageAction,
    SelectConversationAction
} from "../types/store";
import {Message, MessageType} from "../../types/message";
import {Conversation} from "../../types/conversation";
import {firebaseContextValue} from "../../../contexts/firebase-context";
import {User} from "../../../users/types/user";
import {docToModel} from "../helpers";
import firebase from "firebase";

export const fetchConversations = (authId: string | undefined) => {
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

                const userDoc = usersSnapshot.docs.find(doc => doc.data().authId === authId);
                const user = docToModel<User>(userDoc);

                const participantsDocs = usersSnapshot.docs.filter(doc => doc.data().authId !== authId && data.participantsIds.includes(doc.id));
                const participants = participantsDocs.map(doc => docToModel<User>(doc));

                const lastMessageDoc = messagesSnapshot.docs.find(doc => doc.id === data.lastMessageId);
                const lastMessage = docToModel<Message>(lastMessageDoc);

                return {
                    ...data,
                    id: doc.id,
                    user,
                    userId: user.id,
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

export const fetchConversationMessagesSuccessful = (docs: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]): FetchConversationMessagesSuccessfulAction => {
    const messages = docs.map(doc => docToModel<Message>(doc))

    return {type: ChatActionType.FETCH_CONVERSATION_MESSAGES_SUCCESSFUL, payload: messages};
};

export const fetchConversationMessages = (conversationId: string) => {
    return async (dispatch: Dispatch<ChatAction>) => {
        try {
            const messagesSnapshot = await firebaseContextValue.firestore
                .collection('messages')
                .where('conversationId', '==', conversationId)
                .orderBy('createdAt', 'desc')
                .get();

            dispatch(fetchConversationMessagesSuccessful(messagesSnapshot.docs));
        } catch (e) {
            dispatch({type: ChatActionType.FETCH_CONVERSATION_MESSAGES_ERROR, payload: e.message});
        }
    };
};

export const sendTextMessage = (content: string, conversationId: string, userId: string) => {
    return async (dispatch: Dispatch<ChatAction>) => {
        try {
            const message = {
                content,
                conversationId,
                userId,
                messageType: MessageType.TEXT,
                createdAt: Date.now(),
                editedAt: Date.now(),
            } as Message;

            const doc = await firebaseContextValue.firestore
                .collection('messages')
                .add(message);
            await firebaseContextValue.firestore
                .collection('conversations')
                .doc(conversationId)
                .update({lastMessageId: doc.id});

            dispatch({type: ChatActionType.UPDATE_SELECTED_CONVERSATION_WITH_LAST_MESSAGE, payload: {id: doc.id, ...message}});
        } catch (e) {
            alert(e.message);
        }
    };
};

export const selectConversation = (conversationId: string): SelectConversationAction => ({
    type: ChatActionType.SELECT_CONVERSATION,
    payload: conversationId
});

export const storeDraftTextMessage = (conversationId: string, content: string) => ({
    type: ChatActionType.STORE_DRAFT_MESSAGE,
    payload: {conversationId, content},
});

export const filterConversations = (query: string): FilterConversationMessageAction => ({
    type: ChatActionType.FILTER_CONVERSATIONS,
    payload: query
});
