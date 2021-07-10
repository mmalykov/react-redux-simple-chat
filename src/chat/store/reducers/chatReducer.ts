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
            const updatedConversation = {
                ...state.selectedConversation,
                messages: [action.payload, ...state.selectedConversation?.messages ?? []],
            } as Conversation;

            const conversations = [...state.conversations];
            conversations.splice(
                state.conversations.findIndex(c => c.id === state.selectedConversation?.id),
                1,
                updatedConversation
            );

            return {
                ...state,
                conversations,
                selectedConversation: updatedConversation
            };
        case ChatActionType.SELECT_CONVERSATION:
            const selectedConversation = state.conversations.find(c => c.id === action.payload);

            return {...state, selectedConversation: selectedConversation as Conversation};
        case ChatActionType.FILTER_CONVERSATIONS:
            return {
                ...state,
                filteredConversations: state.conversations.filter(
                    conversation => {
                        const participantsNames = conversation.participants.map(p => p.name.toLowerCase()).join(' ');

                        return participantsNames.includes(action.payload.toLowerCase())
                    }
                )
            };
        default:
            return state
    }
};

export type RootState = ReturnType<typeof chatReducer>
