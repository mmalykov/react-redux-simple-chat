import React from "react";
import {Avatar, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Conversation} from "../../../types/conversation";

type Props = {
    conversation: Conversation;
    selectConversation: Function;
};

export const ConversationListItem: React.FC<Props> = ({conversation, selectConversation}) => {
    const handleClick = () => selectConversation(conversation.id);

    return (
        <ListItem button key={conversation.id} onClick={handleClick}>
            <ListItemIcon>
                <Avatar alt={conversation.secondUser.name} src="https://material-ui.com/static/images/avatar/1.jpg">
                    If no avatar provided
                </Avatar>
            </ListItemIcon>
            <ListItemText primary={conversation.secondUser.name} secondary={conversation.lastMessage.content}/>
        </ListItem>
    );
};
