import React from "react";
import {List, ListItem} from "@material-ui/core";
import {Message as MessageType} from "../../types/message";
import {Message} from './Message/Message';


type Props = {
    messages: MessageType[];
}

export const MessagesList: React.FC<Props> = ({messages = []}) => {
    return (
        <List>
            {messages.map(message => (
                <ListItem key={message.id}>
                    <Message message={message}/>
                </ListItem>
            ))}
        </List>
    )
};
