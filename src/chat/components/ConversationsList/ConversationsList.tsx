import React from "react";
import {Grid} from "@material-ui/core";
import {ConversationListItem} from "./ConversationsListItem/ConversationListItem";
import {Conversation} from "../../types/conversation";
import {useChatActions} from "../../store/hooks/useChatActions";
import {DraftMessagesMap} from "../../store/types/store";

type Props = {
    conversations: Conversation[];
    draftMessages: DraftMessagesMap;
}

export const ConversationsList: React.FC<Props> = ({conversations, draftMessages}) => {
    const {selectConversation} = useChatActions();

    if (conversations.length === 0) {
        return (
            <Grid container alignItems="center" justifyContent="center">
                Can't find user with provided name
            </Grid>
        );
    }

    return (
        <Grid>
            {conversations.map(conversation =>
                <ConversationListItem
                    key={conversation.id}
                    conversation={conversation}
                    draftMessage={draftMessages[conversation.id]}
                    selectConversation={selectConversation}/>)
            }
        </Grid>
    );
};
