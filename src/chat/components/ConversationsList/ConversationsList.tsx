import React from "react";
import {Grid} from "@material-ui/core";
import {ConversationListItem} from "./ConversationsListItem/ConversationListItem";
import {useChatActions} from "../../store/hooks/useChatActions";
import {useSelector} from "react-redux";
import {selectConversations, selectDraftMessages} from "../../store/selectors";

export const ConversationsList: React.FC = () => {
    const {conversations, filteredConversations} = useSelector(selectConversations);
    const {draftMessages} = useSelector(selectDraftMessages);
    const {selectConversation, fetchConversationMessages} = useChatActions();
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
