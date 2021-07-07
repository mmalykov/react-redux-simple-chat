import React from "react";
import {Grid, Paper} from "@material-ui/core";
import {ConversationsList} from "../ConversationsList/ConversationsList";
import {ConversationContainer} from "../ConversationContainer/ConversationContainer";

export const Chat: React.FC = () => {
    return (
        <Grid container component={Paper}>
            <ConversationsList />
            <ConversationContainer />
        </Grid>
    );
};
