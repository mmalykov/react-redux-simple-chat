import React from "react";
import {ListItemText, makeStyles} from "@material-ui/core";
import {Message as MessageType} from "../../../types/message";

type Props = {
    message: MessageType;
    isOwn?: boolean;
}

const useStyles = makeStyles(() => ({
    root: {
        textAlign: 'right',
    }
}));

export const MessageListItem: React.FC<Props> = ({message, isOwn = false}) => {
    const classes = useStyles();
    const appliedClasses = isOwn ? classes.root : '';

    return (
        <ListItemText className={appliedClasses} primary={message.content} secondary="09:31"/>
    );
};
