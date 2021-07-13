import {Dispatch} from "redux";
import {Message} from "../../types/message";
import {
    ClearConversationMessagesAction,
    EditMessageAction,
    FetchConversationMessagesSuccessfulAction,
    MessagesAction,
    MessagesActionType
} from "../types";
import {fetchMessagesByConversationId, putMessage, deleteMessage as deleteMessageApi} from "../../api";

export const fetchConversationMessagesSuccessful = (messages: Message[]): FetchConversationMessagesSuccessfulAction => (
    {type: MessagesActionType.FETCH_CONVERSATION_MESSAGES_SUCCESSFUL, payload: messages}
);

export const fetchConversationMessages = (conversationId: string) => {
    return async (dispatch: Dispatch<MessagesAction>) => {
        try {
            const messages = await fetchMessagesByConversationId(conversationId);

            dispatch(fetchConversationMessagesSuccessful(messages));
        } catch (e) {
            dispatch({type: MessagesActionType.FETCH_CONVERSATION_MESSAGES_ERROR, payload: e.message});
        }
    };
};

export const editTextMessage = (message: Message) => {
    return async (dispatch: Dispatch<MessagesAction>) => {
        try {
            await putMessage(message.id as string, {
                ...message,
                edited: true,
                editedAt: Date.now()
            });

            dispatch({type: MessagesActionType.EDIT_MESSAGE_SUCCESSFUL});
        } catch (e) {
            console.error(e);
        }
    };
};

export const clearConversationMessages = (): ClearConversationMessagesAction => ({type: MessagesActionType.CLEAR_CONVERSATION_MESSAGES});

export const storeDraftTextMessage = (conversationId: string, content: string) => ({
    type: MessagesActionType.STORE_DRAFT_MESSAGE,
    payload: {conversationId, content},
});

export const setEditingMessage = (message: Message): EditMessageAction => ({type: MessagesActionType.EDIT_MESSAGE, payload: message});

export const deleteMessage = (message: Message) => {
    return async () => {
        try {
            await deleteMessageApi(message);
        } catch (e) {
            console.error(e);
        }
    };
};
