import {useEffect, useRef} from "react";
import {useConversationsActions} from "../store/hooks";
import {Conversation} from "../types/conversation";
import {useSelector} from "react-redux";
import {selectConversations} from "../store/selectors";
import {useCurrentUser} from "../../users/store/hooks/useCurrentUser";
import {subscribeOnConversationsChanges} from "../api";

export const useConversations = () => {
    const firstUpdate = useRef(true);
    const user = useCurrentUser();
    const {fetchConversations} = useConversationsActions();
    const {conversations, filteredConversations} = useSelector(selectConversations);

    useEffect(() => {
        if (!user) {
            return;
        }

        if (!firstUpdate.current) {
            firstUpdate.current = false;
        }

        const loadSilent = !firstUpdate.current;

        return subscribeOnConversationsChanges(user.id, (conversations: Conversation[]) => {
            fetchConversations(conversations, user.id, loadSilent);
        });
    }, [user]);

    return [conversations, filteredConversations];
};
