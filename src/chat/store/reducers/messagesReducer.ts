import {MessagesAction, MessagesActionType, MessagesState} from "../types";

const initialState: MessagesState = {
    messages: [],
    draftMessages: {},
    fetchMessagesError: '',
};

export const messagesReducer = (state = initialState, action: MessagesAction): MessagesState => {
    switch (action.type) {
        case MessagesActionType.FETCH_CONVERSATION_MESSAGES_SUCCESSFUL:
            return {...state, messages: action.payload};
        case MessagesActionType.FETCH_CONVERSATION_MESSAGES_ERROR:
            return {...state, fetchMessagesError: action.payload};
        case MessagesActionType.CLEAR_CONVERSATION_MESSAGES:
            return {...state, messages: []};
        case MessagesActionType.STORE_DRAFT_MESSAGE: {
            const {conversationId, content} = action.payload;
            const {[conversationId]: previousContent, ...restDraftMessages} = state.draftMessages;
            const draftMessages = {
                ...restDraftMessages,
                [conversationId]: content,
            };

            return {...state, draftMessages};
        }
        default:
            return state
    }
};
