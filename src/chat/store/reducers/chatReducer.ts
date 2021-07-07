import {ChatAction, ChatActionType, ChatState} from "../types/store";
import {conversations} from "../../../testData";

const initialState: ChatState = {
    conversations: conversations,
    filteredConversations: conversations,
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

export type RootState = ReturnType<typeof chatReducer>
