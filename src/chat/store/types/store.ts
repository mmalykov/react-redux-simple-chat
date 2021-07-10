import {Conversation} from "../../types/conversation";
import {Message} from "../../types/message";

export interface DraftMessagesMap {
    [conversationId: string]: string;
}

export interface ChatState {
    conversations: Conversation[];
    filteredConversations: Conversation[];
    selectedConversation: Conversation | null;
    isConversationsLoading: boolean;
    conversationsLoadingError: string;
    draftMessages: DraftMessagesMap;
}

export enum ChatActionType {
    FETCH_CONVERSATIONS = 'FETCH_CONVERSATIONS',
    FETCH_CONVERSATIONS_SUCCESSFUL = 'FETCH_CONVERSATIONS_SUCCESSFUL',
    FETCH_CONVERSATIONS_ERROR = 'FETCH_CONVERSATIONS_ERROR',
    SEND_MESSAGE = 'SEND_MESSAGE',
    STORE_DRAFT_MESSAGE = 'STORE_DRAFT_MESSAGE',
    SELECT_CONVERSATION = 'SELECT_CONVERSATION',
    FILTER_CONVERSATIONS = 'FILTER_CONVERSATIONS'
}

export interface FetchConversationsAction {
    type: ChatActionType.FETCH_CONVERSATIONS;
}

export interface FetchConversationsSuccessfulAction {
    type: ChatActionType.FETCH_CONVERSATIONS_SUCCESSFUL;
    payload: Conversation[];
}

export interface FetchConversationsErrorAction {
    type: ChatActionType.FETCH_CONVERSATIONS_ERROR;
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

export interface SelectConversationAction {
    type: ChatActionType.SELECT_CONVERSATION;
    payload: string;
}

export interface FilterConversationMessageAction {
    type: ChatActionType.FILTER_CONVERSATIONS;
    payload: string;
}

export type ChatAction =
    FetchConversationsAction |
    FetchConversationsSuccessfulAction |
    FetchConversationsErrorAction |
    SendMessageAction |
    StoreDraftMessageAction |
    SelectConversationAction |
    FilterConversationMessageAction;
