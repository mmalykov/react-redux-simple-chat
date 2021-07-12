import {ChatState} from "../types/store";

type RootChatState = { chat: ChatState };

export const selectConversations = ({chat: {conversations, filteredConversations, selectedConversation}}: RootChatState) => ({
    conversations,
    filteredConversations,
    selectedConversation
});

export const selectConversationsLoading = ({chat: {conversationsLoadingError, isConversationsLoading}}: RootChatState) => ({
    conversationsLoadingError,
    isConversationsLoading
});

export const selectDraftMessages = ({chat: {draftMessages}}: RootChatState) => ({draftMessages});
