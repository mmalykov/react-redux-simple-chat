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
        maxHeight: `calc(100% - 64px)`, // TODO: refactor to responsive height (not depend on parent layout)
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
