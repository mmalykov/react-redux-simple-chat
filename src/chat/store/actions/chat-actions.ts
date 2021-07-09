import {
    ChatActionType,
    FilterConversationMessageAction,
    SelectConversationAction,
    SendMessageAction
} from "../types/store";
import {MessageType} from "../../types/message";
import {Conversation} from "../../types/conversation";

export const addTextMessage = (content: string, conversationId: string, userId: string): SendMessageAction => ({
    type: ChatActionType.SEND_MESSAGE,
    payload: {
        content,
        conversationId,
        userId,
        messageType: MessageType.TEXT,
        id: `${Date.now()}`
    }
});

export const selectConversation = (conversation: Conversation): SelectConversationAction => ({
    type: ChatActionType.SELECT_CONVERSATION,
    payload: conversation
});

export const filterConversations = (query: string): FilterConversationMessageAction => ({
    type: ChatActionType.FILTER_CONVERSATIONS,
    payload: query
});
