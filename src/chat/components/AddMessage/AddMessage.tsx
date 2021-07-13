import React from "react";
import {Message} from "../Message/Message";

type Props = {
    conversationId: string;
    draftMessage: string;
    sendMessage: (content: string) => void;
    storeDraftMessage: (conversationId: string, content: string) => void;
}

export const AddMessage: React.FC<Props> = ({conversationId, draftMessage, sendMessage, storeDraftMessage}) => {
    const handleNewMessageChange = (content: string) => {
        storeDraftMessage(conversationId, content);
    };

    const handleAddNewMessageClick = (content: string) => {
        sendMessage(content);
        storeDraftMessage(conversationId, '');
    };

    return (
        <Message initialContent={draftMessage} contentChange={handleNewMessageChange} buttonClick={handleAddNewMessageClick}/>
    );
};
