import React from "react";
import {List, ListItem, makeStyles} from "@material-ui/core";
import {MessageListItem} from './MessageListItem/MessageListItem';
import {Conversation} from "../../types/conversation";


type Props = {
    selectedConversation: Conversation;
}

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        maxHeight: 'calc(100% - 56px)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        flexGrow: 1
    }
}));

export const MessagesList: React.FC<Props> = ({selectedConversation}) => {
    const classes = useStyles();
    const {messages = [], userId} = selectedConversation;

    return (
        <List className={classes.root}>
            {messages.map(message => (
                <ListItem key={message.id}>
                    <MessageListItem message={message} isOwn={message.userId === userId}/>
                </ListItem>
            ))}
        </List>
    )
};
