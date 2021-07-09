import {
    ChatAction,
    ChatActionType,
    FilterConversationMessageAction,
    SelectConversationAction,
    SendMessageAction
} from "../types/store";
import {MessageType} from "../../types/message";
import {Conversation} from "../../types/conversation";
import {Dispatch} from "redux";
import {conversations} from "../../../testData";

export const fetchConversations = () => {
    return async (dispatch: Dispatch<ChatAction>) => {
        try {
            dispatch({type: ChatActionType.FETCH_CONVERSATIONS});
            setTimeout(() => {
                dispatch({type: ChatActionType.FETCH_CONVERSATIONS_SUCCESSFUL, payload: conversations})
            }, 500)
        } catch (e) {
            dispatch({
                type: ChatActionType.FETCH_CONVERSATIONS_ERROR,
                payload: `Error during loading conversations`,
            });
        }
    }
};

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

export const selectConversation = (conversationId: string): SelectConversationAction => ({
    type: ChatActionType.SELECT_CONVERSATION,
    payload: conversationId
});

export const filterConversations = (query: string): FilterConversationMessageAction => ({
    type: ChatActionType.FILTER_CONVERSATIONS,
    payload: query
});
