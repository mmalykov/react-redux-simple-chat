import React from "react";
import {Grid} from "@material-ui/core";
import {ConversationsList} from "../ConversationsList/ConversationsList";
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";
import debounce from "@material-ui/core/utils/debounce";
import {useChatActions} from "../../store/hooks/useChatActions";
import {SearchTextField} from "../SearchTextField/SearchTextField";

export const ConversationListContainer: React.FC = () => {
    const {conversations, filteredConversations, conversationsLoadingError, isConversationsLoading} = useTypedSelector(state => state.chat);
    const {filterConversations} = useChatActions();
    const filterConversationsDebounced = debounce(filterConversations, 500);

    return (
        <Grid item xs={4}>
            <Grid item xs={12} style={{padding: '10px'}}>
                <SearchTextField queryChanged={filterConversationsDebounced}/>
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
            {conversations?.length > 0 && (
                <ConversationsList conversations={filteredConversations}/>
            )}
        </Grid>
    );
};
