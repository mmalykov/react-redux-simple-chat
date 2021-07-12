import {Message} from "../../types/message";

export interface DraftMessagesMap {
    [conversationId: string]: string;
}

export interface MessagesState {
    messages: Message[];
    draftMessages: DraftMessagesMap;
    fetchMessagesError: string;
}

export enum MessagesActionType {
    FETCH_CONVERSATION_MESSAGES_SUCCESSFUL = 'FETCH_CONVERSATION_MESSAGES_SUCCESSFUL',
    FETCH_CONVERSATION_MESSAGES_ERROR = 'FETCH_CONVERSATION_MESSAGES_ERROR',
    CLEAR_CONVERSATION_MESSAGES = 'CLEAR_CONVERSATION_MESSAGES',
    STORE_DRAFT_MESSAGE = 'STORE_DRAFT_MESSAGE',
}

export interface FetchConversationMessagesSuccessfulAction {
    type: MessagesActionType.FETCH_CONVERSATION_MESSAGES_SUCCESSFUL;
    payload: Message[];
}

export interface FetchConversationMessagesErrorAction {
    type: MessagesActionType.FETCH_CONVERSATION_MESSAGES_ERROR;
    payload: string;
}

export interface ClearConversationMessagesAction {
    type: MessagesActionType.CLEAR_CONVERSATION_MESSAGES;
}

export interface StoreDraftMessageAction {
    type: MessagesActionType.STORE_DRAFT_MESSAGE;
    payload: {
        conversationId: string;
        content: string;
    };
}

export type MessagesAction =
    FetchConversationMessagesSuccessfulAction |
    FetchConversationMessagesErrorAction |
    ClearConversationMessagesAction |
    StoreDraftMessageAction;
