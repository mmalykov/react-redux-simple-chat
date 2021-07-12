import {ChatAction, ChatActionType, ChatState} from "../types/store";
import {Conversation} from "../../types/conversation";

const initialState: ChatState = {
    conversations: [],
    filteredConversations: [],
    selectedConversation: null,
    selectConversationError: '',
    isConversationsLoading: false,
    conversationsLoadingError: '',
    messages: [],
    draftMessages: {},
};

export const chatReducer = (state = initialState, action: ChatAction): ChatState => {
    switch (action.type) {
        case ChatActionType.FETCH_CONVERSATIONS_SUCCESSFUL:
            return {
                ...state,
                isConversationsLoading: false,
                conversations: [...action.payload],
                filteredConversations: [...action.payload]
            };
        case ChatActionType.FETCH_CONVERSATIONS_ERROR:
            return {...state, conversationsLoadingError: action.payload, isConversationsLoading: false};
        case ChatActionType.UPDATE_SELECTED_CONVERSATION_WITH_LAST_MESSAGE: {
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
        case ChatActionType.STORE_DRAFT_MESSAGE: {
            const {conversationId, content} = action.payload;
            const {[conversationId]: previousContent, ...restDraftMessages} = state.draftMessages;
            const draftMessages = {
                ...restDraftMessages,
                [conversationId]: content,
            };

            return {...state, draftMessages};
        }
        case ChatActionType.FETCH_CONVERSATION_MESSAGES_SUCCESSFUL:
            return {...state, messages: action.payload};
        case ChatActionType.CLEAR_CONVERSATION_MESSAGES:
            return {...state, messages: []};
        case ChatActionType.SELECT_CONVERSATION:
            const selectedConversation = state.conversations.find(c => c.id === action.payload) as Conversation;

            return {...state, selectedConversation: selectedConversation};
        case ChatActionType.ADD_NEW_CONVERSATION:
            return {
                ...state,
                conversations: [...state.conversations, action.payload],
                filteredConversations: [...state.filteredConversations, action.payload]
            };
        case ChatActionType.FETCH_CONVERSATION_MESSAGES_ERROR:
            return {...state, selectConversationError: action.payload};
        case ChatActionType.FILTER_CONVERSATIONS:
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
