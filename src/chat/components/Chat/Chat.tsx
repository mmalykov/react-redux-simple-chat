import React, {useContext, useEffect} from "react";
import {Grid, makeStyles, Paper} from "@material-ui/core";
import {ConversationContainer} from "../ConversationContainer/ConversationContainer";
import {ConversationListContainer} from "../ConversationListContainer/ConversationListContainer";
import {useChatActions} from "../../store/hooks/useChatActions";
import {FirebaseContext} from "../../../contexts/firebase-context";
import {useAuthState} from "react-firebase-hooks/auth";

const useStyles = makeStyles(() => ({
    root: {
        height: '100%',
    }
}));

export const Chat: React.FC = () => {
    const classes = useStyles();
    const {auth} = useContext(FirebaseContext);
    const [user] = useAuthState(auth);
    const {fetchConversations} = useChatActions();

    useEffect(() => {
        fetchConversations(user?.uid);
    });

    return (
        <Grid container component={Paper} className={classes.root}>
            <ConversationListContainer/>
            <ConversationContainer/>
        </Grid>
    );
};
