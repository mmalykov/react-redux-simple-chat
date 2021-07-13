import {ConversationsState} from "../types";

type RootConversationsState = {conversations: ConversationsState};

export const selectConversations = ({conversations: {conversations, filteredConversations, selectedConversation}}: RootConversationsState) => ({
    conversations,
    filteredConversations,
    selectedConversation
});

export const selectConversationsLoading = ({conversations: {conversationsLoadingError, isConversationsLoading}}: RootConversationsState) => ({
    conversationsLoadingError,
    isConversationsLoading
});
