import React from "react";
import {Grid, makeStyles} from "@material-ui/core";
import {MessagesList} from "../MessagesList/MessagesList";
import {AddMessage} from "../AddMessage/AddMessage";
import {useSelector} from "react-redux";
import {
    selectConversations,
    selectDraftMessages,
    selectEditingMessage,
    selectMessagesLoading
} from "../../store/selectors";
import {useConversationMessages} from "../../hooks/useConversationMessages";
import {useConversationsActions, useMessagesActions} from "../../store/hooks";
import {Message} from "../../types/message";

const useConversationContainerStyles = makeStyles(() => ({
    root: {
        height: '100%',
        overflow: 'hidden',
    }
}));

export const ConversationContainer: React.FC = () => {
    const containerClasses = useConversationContainerStyles();
    const {selectedConversation} = useSelector(selectConversations);
    const {fetchMessagesError} = useSelector(selectMessagesLoading);
    const {editingMessage} = useSelector(selectEditingMessage);
    const {draftMessages} = useSelector(selectDraftMessages);
    const {sendTextMessage} = useConversationsActions();
    const {storeDraftTextMessage, editTextMessage} = useMessagesActions();
    const [messages] = useConversationMessages(selectedConversation);
    const messageContent = selectedConversation ?
        (draftMessages[selectedConversation.id] ?? '') :
        '';

    if (!selectedConversation) {
        return (
            <Grid container alignItems="center" justifyContent="center" item xs={8}>
                {fetchMessagesError ? fetchMessagesError : 'Please select the conversation'}
            </Grid>
        );
    }

    const handleSendMessage = (content: string) => {
        sendTextMessage(content, selectedConversation.id, selectedConversation.userId);
    };

    const handleEditMessage = (message: Message) => {
        editTextMessage(message);
    };

    return (
        <Grid container direction="column" item xs={9} className={containerClasses.root}>
            <MessagesList selectedConversation={selectedConversation} messages={messages}/>
            <AddMessage
                conversationId={selectedConversation.id}
                editingMessage={editingMessage}
                draftMessage={messageContent}
                sendMessage={handleSendMessage}
                editMessage={handleEditMessage}
                storeDraftMessage={storeDraftTextMessage}/>
        </Grid>
    );
};
