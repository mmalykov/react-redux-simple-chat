import {Message} from "./message";
import {User} from "../../users/types/user";

export interface Conversation {
    id: string;
    userId: string;
    user: User;
    participantsIds: string[];
    participants: User[];
    lastMessageId: string;
    lastMessage: Message;
}
