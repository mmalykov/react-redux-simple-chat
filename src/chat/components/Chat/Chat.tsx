import React from "react";
import {Grid, makeStyles, Paper} from "@material-ui/core";
import {ConversationContainer} from "../ConversationContainer/ConversationContainer";
import {ConversationListContainer} from "../ConversationListContainer/ConversationListContainer";

const useStyles = makeStyles(() => ({
    root: {
        height: '100%',
        maxHeight: `calc(100% - 64px)`, // TODO: refactor to responsive height (not depend on parent layout)
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
