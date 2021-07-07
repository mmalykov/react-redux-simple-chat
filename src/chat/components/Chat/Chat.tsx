import React from "react";
import {Grid, Paper} from "@material-ui/core";
import {ConversationContainer} from "../ConversationContainer/ConversationContainer";
import {ConversationListContainer} from "../ConversationListContainer/ConversationListContainer";
import './Chat.css';

export const Chat: React.FC = () => {
    return (
        <Grid className="chat" container component={Paper}>
            <ConversationListContainer />
            <ConversationContainer />
        </Grid>
    );
};
