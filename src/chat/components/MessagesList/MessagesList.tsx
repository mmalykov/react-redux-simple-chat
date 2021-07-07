import React from "react";
import {List, ListItem} from "@material-ui/core";
import {Message} from "./Message/Message";

export const MessagesList: React.FC = () => {
    return (
        <List>
            <ListItem key="1">
                <Message />
            </ListItem>
            <ListItem key="2">
                <Message />
            </ListItem>
            <ListItem key="3">
                <Message />
            </ListItem>
        </List>
    )
};
