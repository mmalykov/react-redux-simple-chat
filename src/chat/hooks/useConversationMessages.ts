import {useEffect} from "react";
import {useSelector} from "react-redux";
import {Conversation} from "../types/conversation";
import {Message} from "../types/message";
import {useMessagesActions} from "../store/hooks";
import {selectMessages} from "../store/selectors";
import {onCollectionByFieldValueSnapshot} from "../../integrations";

export const useConversationMessages = (conversation: Conversation | null) => {
    const {fetchConversationMessagesSuccessful} = useMessagesActions();
    const {messages} = useSelector(selectMessages);

    useEffect(() => {
        if (!conversation) {
            return;
        }

        return onCollectionByFieldValueSnapshot<Message>(
            'messages',
            'conversationId', conversation?.id,
            {fieldPath: 'createdAt', directionStr: 'desc'},
            fetchConversationMessagesSuccessful
        );
    }, [conversation]);

    return [messages];
};
