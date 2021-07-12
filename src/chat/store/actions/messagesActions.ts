import {Dispatch} from "redux";
import {Message} from "../../types/message";
import {
    ClearConversationMessagesAction,
    FetchConversationMessagesSuccessfulAction,
    MessagesAction,
    MessagesActionType
} from "../types";
import {fetchDocumentsByFieldValue} from "../../../integrations";

export const fetchConversationMessagesSuccessful = (messages: Message[]): FetchConversationMessagesSuccessfulAction => (
    {type: MessagesActionType.FETCH_CONVERSATION_MESSAGES_SUCCESSFUL, payload: messages}
);

export const fetchConversationMessages = (conversationId: string) => {
    return async (dispatch: Dispatch<MessagesAction>) => {
        try {
            const messages = await fetchDocumentsByFieldValue<Message>(
                'messages',
                'conversationId',
                conversationId,
                {fieldPath: 'createdAt', directionStr: 'desc'}
            );

            dispatch(fetchConversationMessagesSuccessful(messages));
        } catch (e) {
            dispatch({type: MessagesActionType.FETCH_CONVERSATION_MESSAGES_ERROR, payload: e.message});
        }
    };
};

export const clearConversationMessages = (): ClearConversationMessagesAction => ({type: MessagesActionType.CLEAR_CONVERSATION_MESSAGES});

export const storeDraftTextMessage = (conversationId: string, content: string) => ({
    type: MessagesActionType.STORE_DRAFT_MESSAGE,
    payload: {conversationId, content},
});
