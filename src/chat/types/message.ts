export enum MessageType {
    TEXT = 'TEXT',
    IMAGE = 'IMAGE'
}

export interface Message {
    id: string | undefined;
    userId: string;
    conversationId: string;
    messageType: MessageType;
    content: string;
    createdAt: number;
    editedAt: number;
    forwarded?: boolean;
    pinned?: boolean;
    replayed?: boolean;
    read?: boolean;
}
