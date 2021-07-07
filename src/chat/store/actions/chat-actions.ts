import {
    ChatActionType,
    FilterConversationMessageAction,
    SelectConversationAction,
    SendMessageAction
} from "../types/store";
import {Message} from "../../types/message";
import {Conversation} from "../../types/conversation";

export const addMessage = (message: Message): SendMessageAction => ({
    type: ChatActionType.SEND_MESSAGE,
    payload: message
});

export const selectConversation = (conversation: Conversation): SelectConversationAction => ({
    type: ChatActionType.SELECT_CONVERSATION,
    payload: conversation
});

export const filterConversations = (query: string): FilterConversationMessageAction => ({
    type: ChatActionType.FILTER_CONVERSATIONS,
    payload: query
});
