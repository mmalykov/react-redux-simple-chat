import React from "react";
import {Grid, makeStyles} from "@material-ui/core";
import {MessagesList} from "../MessagesList/MessagesList";
import {AddMessage} from "../AddMessage/AddMessage";
import {useSelector} from "react-redux";
import {selectConversations, selectDraftMessages, selectMessagesLoading} from "../../store/selectors";
import {useConversationMessages} from "../../hooks/useConversationMessages";
import {useConversationsActions, useMessagesActions} from "../../store/hooks";

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
    const {draftMessages} = useSelector(selectDraftMessages);
    const {sendTextMessage} = useConversationsActions();
    const {storeDraftTextMessage} = useMessagesActions();
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

    const addMessageHandler = (content: string) => {
        sendTextMessage(content, selectedConversation.id, selectedConversation.userId);
    };

    return (
        <Grid container direction="column" item xs={9} className={containerClasses.root}>
            <MessagesList selectedConversation={selectedConversation} messages={messages}/>
            <AddMessage
                conversationId={selectedConversation.id}
                draftMessage={messageContent}
                addMessage={addMessageHandler}
                storeDraftMessage={storeDraftTextMessage}/>
        </Grid>
    );
};
