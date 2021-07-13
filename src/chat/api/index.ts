import {
    addDocumentToCollection,
    deleteDocumentFromCollection,
    fetchDocumentsByFieldValue,
    fetchDocumentsByIds, onCollectionByFieldValueSnapshot, onCollectionSnapshot,
    updateDocumentInCollection
} from "../../integrations";
import {Message} from "../types/message";
import {Conversation} from "../types/conversation";
import {fetchUsersNotInIds} from "../../users/api";

// TODO: try to avoid cross module dependency
export const fetchUsersForNewConversation = async (conversations: Conversation[], userId: string = '') => {
    try {
        if (conversations.length === 0) {
            return await fetchUsersNotInIds([userId]);
        }

        const existedParticipantsIds = extractParticipantsIdsFromConversations(conversations, userId);
        const excludeParticipantsIds = [userId, ...existedParticipantsIds];

        return await fetchUsersNotInIds(excludeParticipantsIds);
    } catch (e) {
        return [];
    }
};

export const fetchMessagesByIds = async (conversationIds: string[]) => {
    return await fetchDocumentsByIds<Message>('messages', conversationIds, 'conversationId');
};

export const fetchMessagesByConversationId = async (conversationId: string) => {
    return await fetchDocumentsByFieldValue<Message>(
        'messages',
        'conversationId',
        conversationId,
        {fieldPath: 'createdAt', directionStr: 'desc'}
    )
}

export const postNewMessage = async (message: Message) => {
    return await addDocumentToCollection<Message>('messages', message);
};

export const putMessage = async (messageId: string, message: Partial<Message>) => {
    await updateDocumentInCollection<Message>('messages', messageId, message);
}

export const deleteMessage = async (message: Message) => {
    return await deleteDocumentFromCollection('messages', message.id as string);
};

export const postNewConversation = async (conversation: Partial<Conversation>, overrides: Partial<Conversation>) => {
    return await addDocumentToCollection<Conversation>('conversations', conversation, overrides);
}

export const putConversation = async (conversationId: string, conversation: Partial<Conversation>) => {
    await updateDocumentInCollection<Conversation>('conversations', conversationId, conversation);
}

export const subscribeOnConversationMessagesChanges = (conversationId: string, callback: (messages: Message[]) => any) => {
    return onCollectionByFieldValueSnapshot<Message>(
        'messages',
        'conversationId', conversationId,
        {fieldPath: 'createdAt', directionStr: 'desc'},
        callback
    );
};

export const subscribeOnConversationsChanges = (callback: (conversations: Conversation[]) => void) => {
    return onCollectionSnapshot<Conversation>('conversations', callback);
};

function extractParticipantsIdsFromConversations(conversations: Conversation[], userId: string): string[] {
    return conversations.reduce((participantsIds: string[], conversation) => {
        if (conversation.user.id === userId) {
            const participantsIdsSet = new Set([...participantsIds, ...conversation.participantsIds]);
            return Array.from(participantsIdsSet.values());
        }

        return participantsIds;
    }, []);
}
