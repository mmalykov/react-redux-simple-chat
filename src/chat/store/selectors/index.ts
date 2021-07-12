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

export const selectMessages = ({chat: {messages}}: RootChatState) => ({messages});

export const selectMessagesLoading = ({chat: {selectConversationError}}: RootChatState) => ({selectConversationError});

export const selectDraftMessages = ({chat: {draftMessages}}: RootChatState) => ({draftMessages});
