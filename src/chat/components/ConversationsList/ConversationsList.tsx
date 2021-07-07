import React from "react";
import {Grid} from "@material-ui/core";
import {ConversationListItem} from "./ConversationsListItem/ConversationListItem";
import {Conversation} from "../../types/conversation";
import {useActions} from "../../store/hooks/useActions";

type Props = {
    conversations: Conversation[];
}

export const ConversationsList: React.FC<Props> = ({conversations}) => {
    const {selectConversation} = useActions();

    if (conversations.length === 0) {
        return (
            <Grid>
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
                    selectConversation={selectConversation}/>)
            }
        </Grid>
    );
};
