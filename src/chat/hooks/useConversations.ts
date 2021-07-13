import {useEffect} from "react";
import {useConversationsActions} from "../store/hooks";
import {Conversation} from "../types/conversation";
import {useSelector} from "react-redux";
import {selectConversations} from "../store/selectors";
import {useCurrentUser} from "../../users/store/hooks/useCurrentUser";
import {subscribeOnConversationsChanges} from "../api";

export const useConversations = () => {
    const user = useCurrentUser();
    const {fetchConversations} = useConversationsActions();
    const {conversations, filteredConversations} = useSelector(selectConversations);

    useEffect(() => {
        if (!user) {
            return;
        }

        return subscribeOnConversationsChanges((conversations: Conversation[]) => {
            fetchConversations(conversations, user.id);
        });
    }, [user]);

    return [conversations, filteredConversations];
};
