import React from "react";
import {alpha, Grid, makeStyles} from "@material-ui/core";
import {ConversationsList} from "../ConversationsList/ConversationsList";
import {useSelector} from "react-redux";
import {selectConversationsLoading} from "../../store/selectors";
import {ConversationListSearch} from "../ConversationsList/ConversationListSearch/ConversationListSearch";
import {useConversations} from "../../hooks/useConversations";

const useStyles = makeStyles((theme) => ({
    root: {
        border: `1px solid ${alpha(theme.palette.primary.dark, 0.1)}`
    }
}));

export const ConversationListContainer: React.FC = () => {
    const classes = useStyles();
    const [conversations, filteredConversations] = useConversations();
    const {conversationsLoadingError, isConversationsLoading} = useSelector(selectConversationsLoading);

    return (
        <Grid className={classes.root} item xs={3}>
            <Grid item xs={12} style={{padding: '10px'}}>
                <ConversationListSearch disabled={isConversationsLoading || !!conversationsLoadingError}/>
            </Grid>
            {conversationsLoadingError && (
                <Grid container alignItems="center" justifyContent="center">
                    {conversationsLoadingError}
                </Grid>
            )}
            {isConversationsLoading ?
                (<Grid container alignItems="center" justifyContent="center">
                    Loading...
                </Grid>) :
                <ConversationsList allConversations={conversations} visibleConversations={filteredConversations}/>
            }
        </Grid>
    );
};
