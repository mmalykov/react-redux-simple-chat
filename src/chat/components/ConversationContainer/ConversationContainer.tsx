import React from "react";
import {Grid} from "@material-ui/core";
import {MessagesList} from "../MessagesList/MessagesList";
import {AddMessage} from "../AddMessage/AddMessage";
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";

export const ConversationContainer: React.FC = () => {
    const {selectedConversation} = useTypedSelector(state => state.chat);

    if(!selectedConversation) {
        return (
            <Grid item xs={8}>
                Please select the conversation
            </Grid>
        );
    }

    return (
        <Grid item xs={8}>
            <MessagesList messages={selectedConversation?.messages}/>
            <AddMessage/>
        </Grid>
    );
};
