import React, {useMemo} from "react";
import {List, ListItem, makeStyles} from "@material-ui/core";
import {MessageListItem} from './MessageListItem/MessageListItem';
import {Conversation} from "../../types/conversation";
import {User} from "../../../users/types/user";
import {Message} from "../../types/message";


type Props = {
    selectedConversation: Conversation;
    messages: Message[];
}

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: '1 0 85%',
    }
}));

export const MessagesList: React.FC<Props> = ({selectedConversation, messages}) => {
    const classes = useStyles();
    const {userId, user, participants} = selectedConversation;
    const allParticipantsMap: { [userId: string]: User } = useMemo(
        () => [user, ...participants].reduce((acc, p) => ({...acc, [p.id]: p}), {}),
        [user, participants]
    );

    return (
        <List className={classes.root}>
            {messages.map(message => (
                <ListItem key={message.id}>
                    <MessageListItem
                        message={message}
                        user={allParticipantsMap[message.userId]}
                        isOwn={message.userId === userId}
                        inMultiUserConversation={participants.length > 1}
                    />
                </ListItem>
            ))}
        </List>
    )
};
