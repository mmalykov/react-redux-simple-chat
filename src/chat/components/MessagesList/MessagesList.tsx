import React from "react";
import {List, ListItem, makeStyles} from "@material-ui/core";
import {Message as MessageType} from "../../types/message";
import {Message} from './Message/Message';


type Props = {
    messages: MessageType[];
}

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        maxHeight: 'calc(100% - 56px)',
        overflowY: 'auto',
        flexGrow: 1
    }
}));

export const MessagesList: React.FC<Props> = ({messages = []}) => {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {messages.map(message => (
                <ListItem key={message.id}>
                    <Message message={message}/>
                </ListItem>
            ))}
        </List>
    )
};
