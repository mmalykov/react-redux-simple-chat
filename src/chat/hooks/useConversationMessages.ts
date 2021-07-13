import {useEffect} from "react";
import {useSelector} from "react-redux";
import {Conversation} from "../types/conversation";
import {useMessagesActions} from "../store/hooks";
import {selectMessages} from "../store/selectors";
import {subscribeOnConversationMessagesChanges} from "../api";

export const useConversationMessages = (conversation: Conversation | null) => {
    const {fetchConversationMessagesSuccessful} = useMessagesActions();
    const {messages} = useSelector(selectMessages);

    useEffect(() => {
        if (!conversation) {
            return;
        }

        return subscribeOnConversationMessagesChanges(conversation.id, fetchConversationMessagesSuccessful);
    }, [conversation]);

    return [messages];
};
