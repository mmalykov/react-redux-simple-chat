import React from "react";
import {Grid, makeStyles} from "@material-ui/core";
import {MessagesList} from "../MessagesList/MessagesList";
import {AddMessage} from "../AddMessage/AddMessage";
import {useChatActions} from "../../store/hooks/useChatActions";
import {useSelector} from "react-redux";
import {selectConversations, selectDraftMessages} from "../../store/selectors";

const useConversationContainerStyles = makeStyles(() => ({
    root: {
        height: '100%',
        overflow: 'hidden',
    }
}));

export const ConversationContainer: React.FC = () => {
    const containerClasses = useConversationContainerStyles();
    const {selectedConversation} = useSelector(selectConversations);
    const {draftMessages} = useSelector(selectDraftMessages);
    const messageContent = selectedConversation ?
        (draftMessages[selectedConversation.id] ?? '') :
        '';
    const {addTextMessage, storeDraftTextMessage} = useChatActions();

    if (!selectedConversation) {
        return (
            <Grid container alignItems="center" justifyContent="center" item xs={8}>
                Please select the conversation
            </Grid>
        );
    }

    const addMessageHandler = (content: string) => {
        addTextMessage(content, selectedConversation.id, selectedConversation.userId);
    };

    return (
        <Grid container direction="column" item xs={9} className={containerClasses.root}>
            <MessagesList selectedConversation={selectedConversation}/>
            <AddMessage
                conversationId={selectedConversation.id}
                draftMessage={messageContent}
                addMessage={addMessageHandler}
                storeDraftMessage={storeDraftTextMessage}/>
        </Grid>
    );
};
