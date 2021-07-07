import React from "react";
import {Grid} from "@material-ui/core";
import {MessagesList} from "../MessagesList/MessagesList";
import {AddMessage} from "../AddMessage/AddMessage";

export const ConversationContainer: React.FC = () => {
    return (
        <Grid item xs={8}>
            <MessagesList />
            <AddMessage/>
        </Grid>
    );
};
