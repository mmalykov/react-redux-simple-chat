import {ChatAction, ChatActionType, ChatState} from "../types/store";
import {Conversation} from "../../types/conversation";

const initialState: ChatState = {
    conversations: [],
    filteredConversations: [],
    selectedConversation: null,
    isConversationsLoading: false,
    conversationsLoadingError: '',
    draftMessages: {},
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
        case ChatActionType.SEND_MESSAGE: {
            const {conversations, filteredConversations, selectedConversation} = state;
            const messages = [action.payload, ...selectedConversation?.messages ?? []];
            const [lastMessage] = messages;
            const updatedConversation = {
                ...state.selectedConversation,
                messages,
                lastMessage,
            } as Conversation;

            return {
                ...state,
                conversations: replaceConversation(conversations, (selectedConversation as Conversation).id, updatedConversation),
                filteredConversations: replaceConversation(filteredConversations, (selectedConversation as Conversation).id, updatedConversation),
                selectedConversation: updatedConversation
            };
        }
        case ChatActionType.STORE_DRAFT_MESSAGE:
            const {conversationId, content} = action.payload;
            const {[conversationId]: previousContent, ...restDraftMessages} = state.draftMessages;
            const draftMessages = {
                ...restDraftMessages,
                [conversationId]: content,
            };

            return {...state, draftMessages};
        case ChatActionType.SELECT_CONVERSATION:
            const selectedConversation = state.conversations.find(c => c.id === action.payload);

            return {...state, selectedConversation: selectedConversation as Conversation};
        case ChatActionType.FILTER_CONVERSATIONS:
            return {
                ...state,
                filteredConversations: state.conversations.filter(
                    conversation => {
                        const participantsNames = conversation.participants.map(p => p.name?.toLowerCase()).join(' ');

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
