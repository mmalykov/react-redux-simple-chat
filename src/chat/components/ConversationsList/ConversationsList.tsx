import React from "react";
import {useSelector} from "react-redux";
import {Grid} from "@material-ui/core";
import {ConversationListItem} from "./ConversationsListItem/ConversationListItem";
import {useConversationsActions, useMessagesActions} from "../../store/hooks";
import {selectDraftMessages} from "../../store/selectors";
import {Conversation} from "../../types/conversation";

type Props = {
    allConversations: Conversation[];
    visibleConversations: Conversation[];
};

export const ConversationsList: React.FC<Props> = ({allConversations, visibleConversations}) => {
    const {draftMessages} = useSelector(selectDraftMessages);
    const {selectConversation} = useConversationsActions();
    const {fetchConversationMessages} = useMessagesActions();
    const handleSelectConversation = (conversationId: string) => {
        selectConversation(conversationId);
        fetchConversationMessages(conversationId);
    };

    if (allConversations.length === 0) {
        return null;
    }

    if (visibleConversations.length === 0) {
        return (
            <Grid container alignItems="center" justifyContent="center">
                Can't find user with provided name
            </Grid>
        );
    }

    return (
        <Grid>
            {visibleConversations.map(conversation =>
                <ConversationListItem
                    key={conversation.id}
                    conversation={conversation}
                    draftMessage={draftMessages[conversation.id]}
                    selectConversation={handleSelectConversation}/>)
            }
        </Grid>
    );
};
