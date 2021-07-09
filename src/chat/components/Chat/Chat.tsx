import React from "react";
import {Grid, makeStyles, Paper} from "@material-ui/core";
import {ConversationContainer} from "../ConversationContainer/ConversationContainer";
import {ConversationListContainer} from "../ConversationListContainer/ConversationListContainer";

const useStyles = makeStyles(() => ({
    root: {
        height: '100%',
    }
}));

export const Chat: React.FC = () => {
    const classes = useStyles();

    return (
        <Grid container component={Paper} className={classes.root}>
            <ConversationListContainer/>
            <ConversationContainer/>
        </Grid>
    );
};
