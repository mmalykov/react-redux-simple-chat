import {Conversation} from "../../types/conversation";
import {Message} from "../../types/message";

export interface DraftMessagesMap {
    [conversationId: string]: string;
}

export interface ChatState {
    conversations: Conversation[];
    filteredConversations: Conversation[];
    selectedConversation: Conversation | null;
    selectConversationError: string;
    isConversationsLoading: boolean;
    conversationsLoadingError: string;
    messages: Message[];
    draftMessages: DraftMessagesMap;
}

export enum ChatActionType {
    FETCH_CONVERSATIONS_SUCCESSFUL = 'FETCH_CONVERSATIONS_SUCCESSFUL',
    FETCH_CONVERSATIONS_ERROR = 'FETCH_CONVERSATIONS_ERROR',
    SELECT_CONVERSATION_SUCCESSFUL = 'SELECT_CONVERSATION_SUCCESSFUL',
    SELECT_CONVERSATION_ERROR = 'SELECT_CONVERSATION_ERROR',
    SEND_MESSAGE = 'SEND_MESSAGE',
    STORE_DRAFT_MESSAGE = 'STORE_DRAFT_MESSAGE',
    FILTER_CONVERSATIONS = 'FILTER_CONVERSATIONS'
}

export interface FetchConversationsSuccessfulAction {
    type: ChatActionType.FETCH_CONVERSATIONS_SUCCESSFUL;
    payload: Conversation[];
}

export interface FetchConversationsErrorAction {
    type: ChatActionType.FETCH_CONVERSATIONS_ERROR;
    payload: string;
}

export interface SelectConversationSuccessfulAction {
    type: ChatActionType.SELECT_CONVERSATION_SUCCESSFUL;
    payload: {
        conversationId: string;
        messages: Message[];
    };
}

export interface SelectConversationErrorAction {
    type: ChatActionType.SELECT_CONVERSATION_ERROR;
    payload: string;
}

export interface SendMessageAction {
    type: ChatActionType.SEND_MESSAGE;
    payload: Message;
}

export interface StoreDraftMessageAction {
    type: ChatActionType.STORE_DRAFT_MESSAGE;
    payload: {
        conversationId: string;
        content: string;
    };
}

export interface FilterConversationMessageAction {
    type: ChatActionType.FILTER_CONVERSATIONS;
    payload: string;
}

export type ChatAction =
    FetchConversationsSuccessfulAction |
    FetchConversationsErrorAction |
    SelectConversationSuccessfulAction |
    SelectConversationErrorAction |
    SendMessageAction |
    StoreDraftMessageAction |
    FilterConversationMessageAction;
