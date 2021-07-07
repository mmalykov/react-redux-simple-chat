import React from "react";
import {Grid} from "@material-ui/core";
import {ConversationListItem} from "./ConversationsListItem/ConversationListItem";
import {conversations} from "../../../testData";

export const ConversationsList: React.FC = () => {
    const conversation = conversations[0];

    return (
        <Grid item xs={4}>
            <ConversationListItem conversation={conversation}/>
        </Grid>
    );
};
