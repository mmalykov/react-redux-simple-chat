import React from "react";
import {useSelector} from "react-redux";
import {Grid} from "@material-ui/core";
import {ConversationListItem} from "./ConversationsListItem/ConversationListItem";
import {useConversationsActions, useMessagesActions} from "../../store/hooks";
import {selectConversations, selectDraftMessages} from "../../store/selectors";

export const ConversationsList: React.FC = () => {
    const {conversations, filteredConversations} = useSelector(selectConversations);
    const {draftMessages} = useSelector(selectDraftMessages);
    const {selectConversation} = useConversationsActions();
    const {fetchConversationMessages} = useMessagesActions();
    const selectConversationHandler = (conversationId: string) => {
        selectConversation(conversationId);
        fetchConversationMessages(conversationId);
    };

    if (conversations.length === 0) {
        return null;
    }

    if (filteredConversations.length === 0) {
        return (
            <Grid container alignItems="center" justifyContent="center">
                Can't find user with provided name
            </Grid>
        );
    }

    return (
        <Grid>
            {filteredConversations.map(conversation =>
                <ConversationListItem
                    key={conversation.id}
                    conversation={conversation}
                    draftMessage={draftMessages[conversation.id]}
                    selectConversation={selectConversationHandler}/>)
            }
        </Grid>
    );
};
