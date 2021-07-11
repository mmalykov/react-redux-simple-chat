import {Message, MessageType} from "../chat/types/message";
import {Conversation} from "../chat/types/conversation";
import {User} from "../users/types/user";

export const users: User[] = [
    {id: '1', name: 'Mike M', username: 'mikem', email: 'mike@g.com'},
    {id: '2', name: 'John J', username: 'johnh', email: 'john@g.com'},
    {id: '3', name: 'Sam S', username: 'sams', email: 'sam@g.com'},
];

export const messages: Message[] = [
    {timestamp: Date.now(), id: '1', conversationId: '1', content: 'Hello John', messageType: MessageType.TEXT, userId: '1'},
    {timestamp: Date.now(), id: '2', conversationId: '1', content: 'Hi', messageType: MessageType.TEXT, userId: '2'},
    {timestamp: Date.now(), id: '3', conversationId: '1', content: 'Whats up?', messageType: MessageType.TEXT, userId: '1'},
    {timestamp: Date.now(), id: '4', conversationId: '1', content: 'Everything fine, what about you', messageType: MessageType.TEXT, userId: '2'},
    {timestamp: Date.now(), id: '5', conversationId: '1', content: 'OK', messageType: MessageType.TEXT, userId: '1'},
    {timestamp: Date.now(), id: '6', conversationId: '1', content: 'Where are you?', messageType: MessageType.TEXT, userId: '2'},
    {timestamp: Date.now(), id: '7', conversationId: '1', content: 'At home', messageType: MessageType.TEXT, userId: '1'},


    {timestamp: Date.now(), id: '8', conversationId: '2', content: 'Hello Sam', messageType: MessageType.TEXT, userId: '1'},
    {timestamp: Date.now(), id: '9', conversationId: '2', content: 'Hi', messageType: MessageType.TEXT, userId: '3'},
    {timestamp: Date.now(), id: '10', conversationId: '2', content: 'Whats up?', messageType: MessageType.TEXT, userId: '1'},
    {timestamp: Date.now(), id: '11', conversationId: '2', content: 'Everything fine, what about you', messageType: MessageType.TEXT, userId: '3'},
    {timestamp: Date.now(), id: '12', conversationId: '2', content: 'OK', messageType: MessageType.TEXT, userId: '1'},
    {timestamp: Date.now(), id: '13', conversationId: '2', content: 'Where are you?', messageType: MessageType.TEXT, userId: '3'},
    {timestamp: Date.now(), id: '14', conversationId: '2', content: 'At home', messageType: MessageType.TEXT, userId: '1'},
    {timestamp: Date.now(), id: '34', conversationId: '2', content: 'Hello Sam', messageType: MessageType.TEXT, userId: '1'},
    {timestamp: Date.now(), id: '15', conversationId: '2', content: 'Hi', messageType: MessageType.TEXT, userId: '3'},
    {timestamp: Date.now(), id: '16', conversationId: '2', content: 'Whats up?', messageType: MessageType.TEXT, userId: '1'},
    {timestamp: Date.now(), id: '17', conversationId: '2', content: 'Everything fine, what about you', messageType: MessageType.TEXT, userId: '3'},
    {timestamp: Date.now(), id: '18', conversationId: '2', content: 'OK', messageType: MessageType.TEXT, userId: '1'},
    {timestamp: Date.now(), id: '19', conversationId: '2', content: 'Where are you?', messageType: MessageType.TEXT, userId: '3'},
    {timestamp: Date.now(), id: '20', conversationId: '2', content: 'At home', messageType: MessageType.TEXT, userId: '1'},
    {timestamp: Date.now(), id: '35', conversationId: '2', content: 'Hello Sam', messageType: MessageType.TEXT, userId: '1'},
    {timestamp: Date.now(), id: '21', conversationId: '2', content: 'Hi', messageType: MessageType.TEXT, userId: '3'},
    {timestamp: Date.now(), id: '22', conversationId: '2', content: 'Whats up?', messageType: MessageType.TEXT, userId: '1'},
    {timestamp: Date.now(), id: '23', conversationId: '2', content: 'Everything fine, what about you', messageType: MessageType.TEXT, userId: '3'},
    {timestamp: Date.now(), id: '24', conversationId: '2', content: 'OK', messageType: MessageType.TEXT, userId: '1'},
    {timestamp: Date.now(), id: '25', conversationId: '2', content: 'Where are you?', messageType: MessageType.TEXT, userId: '3'},
    {timestamp: Date.now(), id: '26', conversationId: '2', content: 'At home', messageType: MessageType.TEXT, userId: '1'},
    {timestamp: Date.now(), id: '27', conversationId: '2', content: 'Hello Sam', messageType: MessageType.TEXT, userId: '1'},
    {timestamp: Date.now(), id: '28', conversationId: '2', content: 'Hi', messageType: MessageType.TEXT, userId: '3'},
    {timestamp: Date.now(), id: '29', conversationId: '2', content: 'Whats up?', messageType: MessageType.TEXT, userId: '1'},
    {timestamp: Date.now(), id: '30', conversationId: '2', content: 'Everything fine, what about you', messageType: MessageType.TEXT, userId: '3'},
    {timestamp: Date.now(), id: '31', conversationId: '2', content: 'OK', messageType: MessageType.TEXT, userId: '1'},
    {timestamp: Date.now(), id: '32', conversationId: '2', content: 'Where are you?', messageType: MessageType.TEXT, userId: '3'},
    {timestamp: Date.now(), id: '33', conversationId: '2', content: 'At home', messageType: MessageType.TEXT, userId: '1'},

    {timestamp: Date.now(), id: '41', conversationId: '3', content: 'OK', messageType: MessageType.TEXT, userId: '1'},
    {timestamp: Date.now(), id: '42', conversationId: '3', content: 'Where are you?', messageType: MessageType.TEXT, userId: '2'},
    {timestamp: Date.now(), id: '43', conversationId: '3', content: 'At home', messageType: MessageType.TEXT, userId: '3'},
].reverse();

const [lastMessage1] = messages.filter(({conversationId}) => conversationId === '1');
const [lastMessage2] = messages.filter(({conversationId}) => conversationId === '2');

export const conversations: Conversation[] = [
    {
        id: '1',
        userId: '1',
        lastMessage: lastMessage1,
        user: users[0],
        participants: [users[1]],
        messages: messages.filter(({conversationId}) => conversationId === '1')
    },{
        id: '2',
        userId: '1',
        lastMessage: lastMessage2,
        user: users[0],
        participants: [users[2]],
        messages: messages.filter(({conversationId}) => conversationId === '2')
    },{
        id: '3',
        userId: '1',
        lastMessage: messages.filter(({conversationId}) => conversationId === '3').pop() as Message,
        user: users[0],
        participants: [...users],
        messages: messages.filter(({conversationId}) => conversationId === '3')
    },
];
