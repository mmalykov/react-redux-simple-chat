import React from "react";
import {Grid} from "@material-ui/core";
import {ConversationsList} from "../ConversationsList/ConversationsList";
import debounce from "@material-ui/core/utils/debounce";
import {useChatActions} from "../../store/hooks/useChatActions";
import {SearchTextField} from "../SearchTextField/SearchTextField";
import {useSelector} from "react-redux";
import {selectConversations, selectConversationsLoading, selectDraftMessages} from "../../store/selectors";

export const ConversationListContainer: React.FC = () => {
    const {conversations, filteredConversations} = useSelector(selectConversations);
    const {conversationsLoadingError, isConversationsLoading} = useSelector(selectConversationsLoading);
    const {draftMessages} = useSelector(selectDraftMessages);
    const {filterConversations} = useChatActions();
    const filterConversationsDebounced = debounce(filterConversations, 500);

    return (
        <Grid item xs={3}>
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
                <ConversationsList conversations={filteredConversations} draftMessages={draftMessages}/>
            )}
        </Grid>
    );
};
