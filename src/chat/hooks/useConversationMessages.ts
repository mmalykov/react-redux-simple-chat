import {Conversation} from "../types/conversation";
import {useEffect} from "react";
import {useChatActions} from "../store/hooks/useChatActions";
import {useSelector} from "react-redux";
import {selectMessages} from "../store/selectors";
import {onCollectionByFieldValueSnapshot} from "../../integrations";
import {Message} from "../types/message";

export const useConversationMessages = (conversation: Conversation | null) => {
    const {fetchConversationMessagesSuccessful} = useChatActions();
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
