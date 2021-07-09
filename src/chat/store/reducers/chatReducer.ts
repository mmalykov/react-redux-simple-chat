import {ChatAction, ChatActionType, ChatState} from "../types/store";
import {Conversation} from "../../types/conversation";

const initialState: ChatState = {
    conversations: [],
    filteredConversations: [],
    selectedConversation: null,
    isConversationsLoading: false,
    conversationsLoadingError: '',
};

export const chatReducer = (state = initialState, action: ChatAction): ChatState => {
    switch (action.type) {
        case ChatActionType.FETCH_CONVERSATIONS:
            return {...state, isConversationsLoading: true};
        case ChatActionType.FETCH_CONVERSATIONS_SUCCESSFUL:
            return {
                ...state,
                isConversationsLoading: false,
                conversations: [...action.payload],
                filteredConversations: [...action.payload]
            };
        case ChatActionType.FETCH_CONVERSATIONS_ERROR:
            return {...state, conversationsLoadingError: action.payload, isConversationsLoading: false};
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
