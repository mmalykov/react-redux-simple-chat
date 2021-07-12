import React from "react";
import {Grid, makeStyles} from "@material-ui/core";
import {MessagesList} from "../MessagesList/MessagesList";
import {AddMessage} from "../AddMessage/AddMessage";
import {useChatActions} from "../../store/hooks/useChatActions";
import {useSelector} from "react-redux";
import {selectConversations, selectDraftMessages, selectMessagesLoading} from "../../store/selectors";
import {useConversationMessages} from "../../hooks/useConversationMessages";

const useConversationContainerStyles = makeStyles(() => ({
    root: {
        height: '100%',
        overflow: 'hidden',
    }
}));

export const ConversationContainer: React.FC = () => {
    const containerClasses = useConversationContainerStyles();
    const {selectedConversation} = useSelector(selectConversations);
    const {selectConversationError} = useSelector(selectMessagesLoading);
    const {draftMessages} = useSelector(selectDraftMessages);
    const {sendTextMessage, storeDraftTextMessage} = useChatActions();
    const [messages] = useConversationMessages(selectedConversation);
    const messageContent = selectedConversation ?
        (draftMessages[selectedConversation.id] ?? '') :
        '';

    if (!selectedConversation) {
        return (
            <Grid container alignItems="center" justifyContent="center" item xs={8}>
                {selectConversationError ? selectConversationError : 'Please select the conversation'}
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
