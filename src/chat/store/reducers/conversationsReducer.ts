import {Conversation} from "../../types/conversation";
import {ConversationsAction, ConversationsActionType, ConversationsState} from "../types";

const initialState: ConversationsState = {
    conversations: [],
    filteredConversations: [],
    selectedConversation: null,
    selectConversationError: '',
    isConversationsLoading: false,
    conversationsLoadingError: '',
}

export const conversationsReducer = (state = initialState, action: ConversationsAction): ConversationsState => {
    switch (action.type) {
        case ConversationsActionType.FETCH_CONVERSATIONS:
            return {...state, isConversationsLoading: action.payload};
        case ConversationsActionType.FETCH_CONVERSATIONS_SUCCESSFUL:
            return {
                ...state,
                isConversationsLoading: false,
                conversations: [...action.payload],
                filteredConversations: [...action.payload]
            };
        case ConversationsActionType.FETCH_CONVERSATIONS_ERROR:
            return {...state, conversationsLoadingError: action.payload, isConversationsLoading: false};
        case ConversationsActionType.UPDATE_SELECTED_CONVERSATION_WITH_LAST_MESSAGE: {
            const {conversations, filteredConversations, selectedConversation} = state;
            const updatedConversation = {
                ...state.selectedConversation,
                lastMessage: action.payload,
            } as Conversation;

            return {
                ...state,
                conversations: replaceConversation(conversations, (selectedConversation as Conversation).id, updatedConversation),
                filteredConversations: replaceConversation(filteredConversations, (selectedConversation as Conversation).id, updatedConversation),
                selectedConversation: updatedConversation
            };
        }
        case ConversationsActionType.SELECT_CONVERSATION:
            const selectedConversation = state.conversations.find(c => c.id === action.payload) as Conversation;

            return {...state, selectedConversation: selectedConversation};
        case ConversationsActionType.ADD_NEW_CONVERSATION:
            return {
                ...state,
                conversations: [...state.conversations, action.payload],
                filteredConversations: [...state.filteredConversations, action.payload]
            };
        case ConversationsActionType.FILTER_CONVERSATIONS:
            return {
                ...state,
                filteredConversations: state.conversations.filter(
                    conversation => {
                        const participantsNames = conversation.participants.map(p => p.fullName?.toLowerCase()).join(' ');

                        return participantsNames.includes(action.payload.toLowerCase())
                    }
                )
            };
        default:
            return state
    }
};

function replaceConversation(conversations: Conversation[], conversationId: string, updatedConversation: Conversation): Conversation[] {
    const updatedConversations = [...conversations];

    updatedConversations.splice(
        conversations.findIndex(c => c.id === conversationId),
        1,
        updatedConversation
    );

    return updatedConversations;
}
