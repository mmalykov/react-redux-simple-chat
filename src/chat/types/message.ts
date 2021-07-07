export enum MessageType {
    TEXT = 'TEXT',
    IMAGE = 'IMAGE'
}

export interface Message {
    id: string;
    userId: string;
    conversationId: string;
    messageType: MessageType;
    content: string;
}
