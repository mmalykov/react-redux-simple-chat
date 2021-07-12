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
import {firebaseContextValue} from "../../../contexts/firebase-context";
import {User} from "../../../users/types/user";
import {docToModel} from "../helpers";
import firebase from "firebase";

export const fetchConversations = (authId?: string) => {
    return async (dispatch: Dispatch<ChatAction>) => {
        try {
            const conversationsSnapshot = await firebaseContextValue.firestore
                .collection('conversations')
                .get();

            const conversationIds = conversationsSnapshot.docs.map(doc => doc.id);
            const messagesSnapshot = await firebaseContextValue.firestore
                .collection('messages')
                .where('conversationId', 'in', conversationIds)
                .get();

            const participantsIds = [...new Set(conversationsSnapshot.docs.flatMap(doc => doc.data().participantsIds))];
            const usersSnapshot = await firebaseContextValue.firestore
                .collection('users')
                .where(firebase.firestore.FieldPath.documentId(), 'in', participantsIds)
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

export const clearConversationMessages = (): ClearConversationMessagesAction => ({type: ChatActionType.CLEAR_CONVERSATION_MESSAGES});

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

            dispatch({
                type: ChatActionType.UPDATE_SELECTED_CONVERSATION_WITH_LAST_MESSAGE,
                payload: {id: doc.id, ...message}
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
        const participantsIds = [user?.id, currentUser?.id];
        const docRef = await firebaseContextValue.firestore
            .collection('conversations')
            .add({
                participantsIds,
                lastMessageId: ''
            } )

        const usersSnapshot = await firebaseContextValue.firestore
            .collection('users')
            .where(firebase.firestore.FieldPath.documentId(), 'in', participantsIds)
            .get();
        const participants = usersSnapshot.docs.map(doc => docToModel<User>(doc));

        const doc = await docRef.get();
        const conversation = docToModel<Conversation>(doc, {
            userId: currentUser?.id,
            user: currentUser as User,
            participants: participants.filter(p => p.id !== currentUser?.id)
        });

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

        const querySnapshot = await firebaseContextValue.firestore
            .collection('users')
            .where(firebase.firestore.FieldPath.documentId(), 'not-in', excludeParticipantsIds)
            .get();

        return querySnapshot.docs.map(doc => docToModel<User>(doc));
    } catch (e) {
        return [];
    }
};
