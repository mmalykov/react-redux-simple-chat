import {Message, MessageType} from "../chat/types/message";
import {Conversation} from "../chat/types/conversation";
import {User} from "../models/user";

export const messages: Message[] = [
    {id: '1', conversationId: '1', content: 'Hello', messageType: MessageType.TEXT, userId: '1'},
    {id: '2', conversationId: '1', content: 'Hi', messageType: MessageType.TEXT, userId: '2'},
    {id: '3', conversationId: '1', content: 'Whats up?', messageType: MessageType.TEXT, userId: '1'},
    {id: '4', conversationId: '1', content: 'Everything fine, what about you', messageType: MessageType.TEXT, userId: '2'},
    {id: '5', conversationId: '1', content: 'OK', messageType: MessageType.TEXT, userId: '1'},
    {id: '6', conversationId: '1', content: 'Where are you?', messageType: MessageType.TEXT, userId: '2'},
    {id: '7', conversationId: '1', content: 'At home', messageType: MessageType.TEXT, userId: '1'},
];

export const conversations: Conversation[] = [
    {id: '1', userId: '1', secondUserId: '2', lastMessage: messages[messages.length - 1]},
];

export const users: User[] = [
    {id: '1', name: 'Mike M', username: 'mikem', email: 'mike@g.com'},
    {id: '2', name: 'John J', username: 'johnh', email: 'john@g.com'},
];
