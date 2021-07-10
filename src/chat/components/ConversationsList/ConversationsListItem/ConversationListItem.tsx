import React from "react";
import {Avatar, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {AvatarGroup} from "@material-ui/lab";
import {Conversation} from "../../../types/conversation";

const buildAvatarText = (fullName: string) => {
    const [firstName, lastName] = fullName.split(' ');

    return `${firstName.charAt(0)} ${lastName.charAt(0)}`;
};

type Props = {
    conversation: Conversation;
    selectConversation: Function;
};

export const ConversationListItem: React.FC<Props> = ({conversation, selectConversation}) => {
    const {id, participants, lastMessage} = conversation;
    const participantsNames = participants.map(p => p.name).join(' ');
    const handleClick = () => selectConversation(id);

    return (
        <ListItem button key={id} onClick={handleClick}>
            <ListItemIcon>
                <AvatarGroup max={3}>
                    {participants.map(participant => {
                        return (
                            <Avatar key={participant.id} alt={participant.name} src={participant.avatarUrl}>
                                {buildAvatarText(participant.name)}
                            </Avatar>
                        );
                    })}
                </AvatarGroup>
            </ListItemIcon>
            <ListItemText primary={participantsNames} secondary={lastMessage.content}/>
        </ListItem>
    );
};
