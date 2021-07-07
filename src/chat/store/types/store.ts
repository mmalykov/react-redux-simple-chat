import {Conversation} from "../../types/conversation";
import {Message} from "../../types/message";

export interface ChatState {
    conversations: Conversation[];
    filteredConversations: Conversation[];
    selectedConversation: Conversation | null;
}

export enum ChatActionType {
    SEND_MESSAGE = 'SEND_MESSAGE',
    SELECT_CONVERSATION = 'SELECT_CONVERSATION',
    FILTER_CONVERSATIONS = 'FILTER_CONVERSATIONS'
}

export interface SendMessageAction {
    type: ChatActionType.SEND_MESSAGE;
    payload: Message;
}

export interface SelectConversationAction {
    type: ChatActionType.SELECT_CONVERSATION;
    payload: Conversation;
}

export interface FilterConversationMessageAction {
    type: ChatActionType.FILTER_CONVERSATIONS;
    payload: string;
}

export type ChatAction = SendMessageAction |
    SelectConversationAction |
    FilterConversationMessageAction;
