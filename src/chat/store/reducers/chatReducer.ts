import {ChatAction, ChatActionType, ChatState} from "../types/store";

const initialState: ChatState = {
    conversations: [],
    filteredConversations: [],
    selectedConversation: null
};

export const chatReducer = (state = initialState, action: ChatAction): ChatState => {
    switch (action.type) {
        case ChatActionType.SEND_MESSAGE:
        case ChatActionType.SELECT_CONVERSATION:
        case ChatActionType.FILTER_CONVERSATIONS:
        default:
            return state
    }
};
