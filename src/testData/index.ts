import {Message, MessageType} from "../chat/types/message";
import {Conversation} from "../chat/types/conversation";
import {User} from "../models/user";

export const users: User[] = [
    {id: '1', name: 'Mike M', username: 'mikem', email: 'mike@g.com'},
    {id: '2', name: 'John J', username: 'johnh', email: 'john@g.com'},
    {id: '3', name: 'Sam S', username: 'sams', email: 'sam@g.com'},
];

export const messages: Message[] = [
    {id: '1', conversationId: '1', content: 'Hello John', messageType: MessageType.TEXT, userId: '1'},
    {id: '2', conversationId: '1', content: 'Hi', messageType: MessageType.TEXT, userId: '2'},
    {id: '3', conversationId: '1', content: 'Whats up?', messageType: MessageType.TEXT, userId: '1'},
    {id: '4', conversationId: '1', content: 'Everything fine, what about you', messageType: MessageType.TEXT, userId: '2'},
    {id: '5', conversationId: '1', content: 'OK', messageType: MessageType.TEXT, userId: '1'},
    {id: '6', conversationId: '1', content: 'Where are you?', messageType: MessageType.TEXT, userId: '2'},
    {id: '7', conversationId: '1', content: 'At home', messageType: MessageType.TEXT, userId: '1'},


    {id: '8', conversationId: '2', content: 'Hello Sam', messageType: MessageType.TEXT, userId: '1'},
    {id: '9', conversationId: '2', content: 'Hi', messageType: MessageType.TEXT, userId: '3'},
    {id: '10', conversationId: '2', content: 'Whats up?', messageType: MessageType.TEXT, userId: '1'},
    {id: '11', conversationId: '2', content: 'Everything fine, what about you', messageType: MessageType.TEXT, userId: '3'},
    {id: '12', conversationId: '2', content: 'OK', messageType: MessageType.TEXT, userId: '1'},
    {id: '13', conversationId: '2', content: 'Where are you?', messageType: MessageType.TEXT, userId: '3'},
    {id: '14', conversationId: '2', content: 'At home', messageType: MessageType.TEXT, userId: '1'},
    {id: '34', conversationId: '2', content: 'Hello Sam', messageType: MessageType.TEXT, userId: '1'},
    {id: '15', conversationId: '2', content: 'Hi', messageType: MessageType.TEXT, userId: '3'},
    {id: '16', conversationId: '2', content: 'Whats up?', messageType: MessageType.TEXT, userId: '1'},
    {id: '17', conversationId: '2', content: 'Everything fine, what about you', messageType: MessageType.TEXT, userId: '3'},
    {id: '18', conversationId: '2', content: 'OK', messageType: MessageType.TEXT, userId: '1'},
    {id: '19', conversationId: '2', content: 'Where are you?', messageType: MessageType.TEXT, userId: '3'},
    {id: '20', conversationId: '2', content: 'At home', messageType: MessageType.TEXT, userId: '1'},
    {id: '35', conversationId: '2', content: 'Hello Sam', messageType: MessageType.TEXT, userId: '1'},
    {id: '21', conversationId: '2', content: 'Hi', messageType: MessageType.TEXT, userId: '3'},
    {id: '22', conversationId: '2', content: 'Whats up?', messageType: MessageType.TEXT, userId: '1'},
    {id: '23', conversationId: '2', content: 'Everything fine, what about you', messageType: MessageType.TEXT, userId: '3'},
    {id: '24', conversationId: '2', content: 'OK', messageType: MessageType.TEXT, userId: '1'},
    {id: '25', conversationId: '2', content: 'Where are you?', messageType: MessageType.TEXT, userId: '3'},
    {id: '26', conversationId: '2', content: 'At home', messageType: MessageType.TEXT, userId: '1'},
    {id: '27', conversationId: '2', content: 'Hello Sam', messageType: MessageType.TEXT, userId: '1'},
    {id: '28', conversationId: '2', content: 'Hi', messageType: MessageType.TEXT, userId: '3'},
    {id: '29', conversationId: '2', content: 'Whats up?', messageType: MessageType.TEXT, userId: '1'},
    {id: '30', conversationId: '2', content: 'Everything fine, what about you', messageType: MessageType.TEXT, userId: '3'},
    {id: '31', conversationId: '2', content: 'OK', messageType: MessageType.TEXT, userId: '1'},
    {id: '32', conversationId: '2', content: 'Where are you?', messageType: MessageType.TEXT, userId: '3'},
    {id: '33', conversationId: '2', content: 'At home', messageType: MessageType.TEXT, userId: '1'},
].reverse();

const [lastMessage1] = messages.filter(({conversationId}) => conversationId === '1');
const [lastMessage2] = messages.filter(({conversationId}) => conversationId === '2');

export const conversations: Conversation[] = [
    {
        id: '1',
        userId: '1',
        secondUserId: '2',
        lastMessage: lastMessage1,
        user: users[0],
        secondUser: users[1],
        messages: messages.filter(({conversationId}) => conversationId === '1')
    },{
        id: '2',
        userId: '1',
        secondUserId: '3',
        lastMessage: lastMessage2,
        user: users[0],
        secondUser: users[2],
        messages: messages.filter(({conversationId}) => conversationId === '2')
    },
];
