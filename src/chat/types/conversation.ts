import {Message} from "./message";

export interface Conversation {
    id: string;
    userId: string;
    secondUserId: string;
    lastMessage: Message;
}
