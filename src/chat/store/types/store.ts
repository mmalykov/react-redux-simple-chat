export interface ChatState {
    conversations: [];
    filteredConversations: [];
    selectedConversation: any;
}

export enum ChatActionType {
    SEND_MESSAGE = 'SEND_MESSAGE',
    SELECT_CONVERSATION = 'SELECT_CONVERSATION',
    FILTER_CONVERSATIONS = 'FILTER_CONVERSATIONS'
}

export interface SendMessageAction {
    type: ChatActionType.SEND_MESSAGE;
    payload: any;
}

export interface SelectConversationAction {
    type: ChatActionType.SELECT_CONVERSATION;
    payload: any;
}

export interface FilterConversationMessageAction {
    type: ChatActionType.FILTER_CONVERSATIONS;
    payload: string;
}

export type ChatAction = SendMessageAction |
    SelectConversationAction |
    FilterConversationMessageAction;
