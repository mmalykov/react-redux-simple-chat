import React from "react";
import {Avatar, ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core";
import {AvatarGroup} from "@material-ui/lab";
import {Conversation} from "../../../types/conversation";

const buildAvatarText = (fullName: string = '') => {
    const [firstName, lastName] = fullName.split(' ');

    return `${firstName.charAt(0)} ${lastName.charAt(0)}`;
};

type Props = {
    conversation: Conversation;
    selected: boolean;
    selectConversation: Function;
    draftMessage: string;
};

export const ConversationListItem: React.FC<Props> = ({conversation, selectConversation, draftMessage, selected= false}) => {
    const {id, lastMessage = null, participants} = conversation;
    const participantsNames = participants.map(p => p.fullName).join(' ');
    const handleClick = () => selectConversation(id);
    const secondaryContent = draftMessage || lastMessage?.content;
    const secondaryNode = draftMessage ?
        (
            <React.Fragment>
                <Typography
                    variant="body2"
                    component="span"
                    color="error"
                >
                    Draft:&nbsp;
                </Typography>
                {secondaryContent}
            </React.Fragment>
        ) : secondaryContent;

    return (
        <ListItem button key={id} selected={selected} onClick={handleClick}>
            <ListItemIcon>
                <AvatarGroup max={3}>
                    {participants.map(participant => {
                        return (
                            <Avatar key={participant.id} alt={participant?.fullName} src={participant?.avatarUrl}>
                                {buildAvatarText(participant?.fullName)}
                            </Avatar>
                        );
                    })}
                </AvatarGroup>
            </ListItemIcon>
            <ListItemText
                primary={participantsNames}
                secondary={secondaryNode}
                secondaryTypographyProps={{noWrap: true}}/>
        </ListItem>
    );
};
