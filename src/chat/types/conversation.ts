import {Message} from "./message";
import {User} from "../../users/types/user";

export interface Conversation {
    id: string;
    userId: string;
    user: User;
    participants: User[];
    lastMessage: Message;
    messages: Message[];
}
