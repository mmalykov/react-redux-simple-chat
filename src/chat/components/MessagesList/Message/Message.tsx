import React from "react";
import {ListItemText} from "@material-ui/core";
import {Message as MessageType} from "../../../types/message";

type Props = {
    message: MessageType;
}

export const Message: React.FC<Props> = ({message}) => {
    return (
        <ListItemText primary={message.content} secondary="09:31"/>
    );
};
