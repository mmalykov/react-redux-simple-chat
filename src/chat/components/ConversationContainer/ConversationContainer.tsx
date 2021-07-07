import React from "react";
import {Grid} from "@material-ui/core";
import {MessagesList} from "../MessagesList/MessagesList";
import {AddMessage} from "../AddMessage/AddMessage";
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";
import {useActions} from "../../store/hooks/useActions";
import {MessageType} from "../../types/message";

export const ConversationContainer: React.FC = () => {
    const {selectedConversation} = useTypedSelector(state => state.chat);
    const {addMessage} = useActions();

    if(!selectedConversation) {
        return (
            <Grid item xs={8}>
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
        <Grid item xs={8}>
            <MessagesList messages={selectedConversation.messages}/>
            <AddMessage addMessage={addMessageHandler}/>
        </Grid>
    );
};
