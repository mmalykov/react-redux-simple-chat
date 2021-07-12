import {MessagesState} from "../types";

type RootMessagesState = {messages: MessagesState};

export const selectMessages = ({messages: {messages}}: RootMessagesState) => ({messages});

export const selectMessagesLoading = ({messages: {fetchMessagesError}}: RootMessagesState) => ({fetchMessagesError});

export const selectDraftMessages = ({messages: {draftMessages}}: RootMessagesState) => ({draftMessages});
