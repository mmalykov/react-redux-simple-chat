import React from "react";
import {Grid, makeStyles} from "@material-ui/core";
import {MessagesList} from "../MessagesList/MessagesList";
import {AddMessage} from "../AddMessage/AddMessage";
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";
import {useChatActions} from "../../store/hooks/useChatActions";

const useConversationContainerStyles = makeStyles(() => ({
    root: {
        height: '100%',
        overflow: 'hidden',
    }
}));

export const ConversationContainer: React.FC = () => {
    const containerClasses = useConversationContainerStyles();
    const {selectedConversation} = useTypedSelector(state => state.chat);
    const {addMessage} = useChatActions();

    if (!selectedConversation) {
        return (
            <Grid container alignItems="center" justifyContent="center" item xs={8}>
                Please select the conversation
            </Grid>
        );
    }

    const addMessageHandler = (content: string) => {
        addMessage({
            content,
            userId: selectedConversation.userId,
            conversationId: selectedConversation.id,
            messageType: MessageType.TEXT,
            id: `${Date.now()}`
        });
    };

    return (
        <Grid container direction="column" item xs={8} className={containerClasses.root}>
            <MessagesList selectedConversation={selectedConversation}/>
            <AddMessage addMessage={addMessageHandler}/>
        </Grid>
    );
};
