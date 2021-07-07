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
