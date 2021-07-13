import React from "react";
import { Message } from "../Message/Message";
import {Message as MessageType} from "../../types/message";

type Props = {
    editingMessage: MessageType;
    editMessage: (message: MessageType) => void;
};

export const EditMessage: React.FC<Props> = ({editingMessage, editMessage}) => {
    const handleButtonClick = (content: string) => {
        editMessage({...editingMessage, content});
    };

    return (
        <Message initialContent={editingMessage.content} buttonClick={handleButtonClick}/>
    );
};
