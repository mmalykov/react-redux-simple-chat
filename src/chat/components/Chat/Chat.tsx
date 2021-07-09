import React, {useEffect} from "react";
import {Grid, makeStyles, Paper} from "@material-ui/core";
import {ConversationContainer} from "../ConversationContainer/ConversationContainer";
import {ConversationListContainer} from "../ConversationListContainer/ConversationListContainer";
import {useChatActions} from "../../store/hooks/useChatActions";

const useStyles = makeStyles(() => ({
    root: {
        height: '100%',
    }
}));

export const Chat: React.FC = () => {
    const classes = useStyles();
    const {fetchConversations} = useChatActions();

    useEffect(() => {
        fetchConversations();
    });

    return (
        <Grid container component={Paper} className={classes.root}>
            <ConversationListContainer/>
            <ConversationContainer/>
        </Grid>
    );
};
