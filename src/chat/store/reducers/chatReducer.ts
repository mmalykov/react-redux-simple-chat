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
            return {
                ...state,
                selectedConversation: {
                    ...state.selectedConversation,
                    messages: [action.payload, ...state.selectedConversation?.messages ?? []],
                } as Conversation
            };
        case ChatActionType.SELECT_CONVERSATION:
            return {...state, selectedConversation: action.payload};
        case ChatActionType.FILTER_CONVERSATIONS:
            return {
                ...state,
                filteredConversations: state.conversations.filter(
                    conversation => conversation.secondUser.name.toLowerCase().includes(action.payload.toLowerCase())
                )
            };
        default:
            return state
    }
};

export type RootState = ReturnType<typeof chatReducer>
