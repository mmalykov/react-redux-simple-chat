import React from "react";
import {Conversation} from "../../../types/conversation";
import {Avatar, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";

type Props = {
    conversation: Conversation;
};

export const ConversationListItem: React.FC<Props> = ({ conversation }) => {
    return (
        <ListItem button key="RemySharp">
            <ListItemIcon>
                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg">
                    If no avatar provided
                </Avatar>
            </ListItemIcon>
            <ListItemText primary="John Wick"  secondary="Last message text"/>
        </ListItem>
    );
};
