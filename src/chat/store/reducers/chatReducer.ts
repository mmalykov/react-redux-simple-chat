import {ChatAction, ChatActionType, ChatState} from "../types/store";
import {conversations} from "../../../testData";
import {Conversation} from "../../types/conversation";

const initialState: ChatState = {
    conversations: conversations,
    filteredConversations: conversations,
    selectedConversation: null
};

export const chatReducer = (state = initialState, action: ChatAction): ChatState => {
    switch (action.type) {
        case ChatActionType.SEND_MESSAGE:
            const messages = [...(state.selectedConversation as Conversation).messages];
            messages.unshift(action.payload);

            return {
                ...state,
                selectedConversation: {
                    ...state.selectedConversation,
                    messages,
                } as Conversation
            };
        case ChatActionType.SELECT_CONVERSATION:
            return {...state, selectedConversation: action.payload as Conversation};
        case ChatActionType.FILTER_CONVERSATIONS:
            return {...state, filteredConversations: state.conversations.filter(conversation => conversation.secondUser.name.includes(action.payload)) };
        default:
            return state
    }
};

export type RootState = ReturnType<typeof chatReducer>
