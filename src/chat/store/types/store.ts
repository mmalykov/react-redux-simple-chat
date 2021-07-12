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
    FETCH_CONVERSATION_MESSAGES_SUCCESSFUL = 'FETCH_CONVERSATION_MESSAGES_SUCCESSFUL',
    FETCH_CONVERSATION_MESSAGES_ERROR = 'FETCH_CONVERSATION_MESSAGES_ERROR',
    UPDATE_SELECTED_CONVERSATION_WITH_LAST_MESSAGE = 'UPDATE_SELECTED_CONVERSATION_WITH_LAST_MESSAGE',
    SELECT_CONVERSATION = 'SELECT_CONVERSATION',
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

export interface FetchConversationMessagesSuccessfulAction {
    type: ChatActionType.FETCH_CONVERSATION_MESSAGES_SUCCESSFUL;
    payload: Message[];
}

export interface FetchConversationMessagesErrorAction {
    type: ChatActionType.FETCH_CONVERSATION_MESSAGES_ERROR;
    payload: string;
}

export interface UpdateSelectedConversationWithLastMessageAction {
    type: ChatActionType.UPDATE_SELECTED_CONVERSATION_WITH_LAST_MESSAGE;
    payload: Message;
}

export interface SelectConversationAction {
    type: ChatActionType.SELECT_CONVERSATION;
    payload: string;
}

export interface StoreDraftMessageAction {
    type: ChatActionType.STORE_DRAFT_MESSAGE;
    payload: {
        conversationId: string;
        content: string;
    };
}

export interface FilterConversationsAction {
    type: ChatActionType.FILTER_CONVERSATIONS;
    payload: string;
}

export type ChatAction =
    FetchConversationsSuccessfulAction |
    FetchConversationsErrorAction |
    FetchConversationMessagesSuccessfulAction |
    FetchConversationMessagesErrorAction |
    UpdateSelectedConversationWithLastMessageAction |
    SelectConversationAction |
    StoreDraftMessageAction |
    FilterConversationsAction;
