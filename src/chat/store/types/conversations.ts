import {Conversation} from "../../types/conversation";
import {Message} from "../../types/message";

export interface ConversationsState {
    conversations: Conversation[];
    filteredConversations: Conversation[];
    selectedConversation: Conversation | null;
    selectConversationError: string;
    isConversationsLoading: boolean;
    conversationsLoadingError: string;
}

export enum ConversationsActionType {
    FETCH_CONVERSATIONS = 'FETCH_CONVERSATIONS',
    FETCH_CONVERSATIONS_SUCCESSFUL = 'FETCH_CONVERSATIONS_SUCCESSFUL',
    FETCH_CONVERSATIONS_ERROR = 'FETCH_CONVERSATIONS_ERROR',
    UPDATE_SELECTED_CONVERSATION_WITH_LAST_MESSAGE = 'UPDATE_SELECTED_CONVERSATION_WITH_LAST_MESSAGE',
    ADD_NEW_CONVERSATION = 'ADD_NEW_CONVERSATION',
    SELECT_CONVERSATION = 'SELECT_CONVERSATION',
    FILTER_CONVERSATIONS = 'FILTER_CONVERSATIONS',
}

export interface FetchConversationsAction {
    type: ConversationsActionType.FETCH_CONVERSATIONS;
    payload: boolean;
}

export interface FetchConversationsSuccessfulAction {
    type: ConversationsActionType.FETCH_CONVERSATIONS_SUCCESSFUL;
    payload: Conversation[];
}

export interface FetchConversationsErrorAction {
    type: ConversationsActionType.FETCH_CONVERSATIONS_ERROR;
    payload: string;
}

export interface UpdateSelectedConversationWithLastMessageAction {
    type: ConversationsActionType.UPDATE_SELECTED_CONVERSATION_WITH_LAST_MESSAGE;
    payload: Message;
}

export interface SelectConversationAction {
    type: ConversationsActionType.SELECT_CONVERSATION;
    payload: string;
}

export interface AddNewConversationAction {
    type: ConversationsActionType.ADD_NEW_CONVERSATION;
    payload: Conversation;
}

export interface FilterConversationsAction {
    type: ConversationsActionType.FILTER_CONVERSATIONS;
    payload: string;
}

export type ConversationsAction =
    FetchConversationsAction |
    FetchConversationsSuccessfulAction |
    FetchConversationsErrorAction |
    UpdateSelectedConversationWithLastMessageAction |
    SelectConversationAction |
    AddNewConversationAction |
    FilterConversationsAction;
