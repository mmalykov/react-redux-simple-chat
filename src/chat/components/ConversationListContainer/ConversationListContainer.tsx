import React, {useContext} from "react";
import {Grid} from "@material-ui/core";
import {ConversationsList} from "../ConversationsList/ConversationsList";
import {useSelector} from "react-redux";
import {selectConversationsLoading} from "../../store/selectors";
import {ConversationListSearch} from "../ConversationsList/ConversationListSearch/ConversationListSearch";
import {FirebaseContext} from "../../../contexts/firebaseContext";
import {useAuthState} from "react-firebase-hooks/auth";
import {useConversations} from "../../hooks/useConversations";

export const ConversationListContainer: React.FC = () => {
    const {auth} = useContext(FirebaseContext);
    const [user] = useAuthState(auth);
    useConversations(user);
    const {conversationsLoadingError, isConversationsLoading} = useSelector(selectConversationsLoading);

    return (
        <Grid item xs={3}>
            <Grid item xs={12} style={{padding: '10px'}}>
                <ConversationListSearch/>
            </Grid>
            {isConversationsLoading && (
                <Grid container alignItems="center" justifyContent="center">
                    Loading ...
                </Grid>
            )}
            {conversationsLoadingError && (
                <Grid container alignItems="center" justifyContent="center">
                    {conversationsLoadingError}
                </Grid>
            )}
            <ConversationsList/>
        </Grid>
    );
};
