import React from "react";
import {Avatar, ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core";
import {Conversation} from "../../../types/conversation";

type Props = {
    conversation: Conversation;
    selectConversation: Function;
    draftMessage: string;
};

export const ConversationListItem: React.FC<Props> = ({conversation, selectConversation, draftMessage}) => {
    const {id, lastMessage, secondUser} = conversation;
    const handleClick = () => selectConversation(id);
    const secondaryContent = draftMessage || lastMessage.content;
    const secondary = draftMessage ?
        (
            <React.Fragment>
                <Typography
                    component="span"
                    color="error"
                >
                    Draft:
                </Typography>
                {secondaryContent}
            </React.Fragment>
        ) :
        secondaryContent;

    return (
        <ListItem button key={id} onClick={handleClick}>
            <ListItemIcon>
                <Avatar alt={secondUser.name} src="https://material-ui.com/static/images/avatar/1.jpg">
                    If no avatar provided
                </Avatar>
            </ListItemIcon>
            <ListItemText
                primary={secondUser.name}
                secondary={secondary}
                secondaryTypographyProps={{noWrap: true}}/>
        </ListItem>
    );
};
