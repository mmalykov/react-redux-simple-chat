import {useEffect} from "react";
import {useConversationsActions} from "../store/hooks";
import {onCollectionSnapshot} from "../../integrations";
import {Conversation} from "../types/conversation";

export const useConversations = (user?: { uid: string; } | null) => {
    const {fetchConversations} = useConversationsActions();

    useEffect(() => {
        if (!user) {
            return;
        }

        return onCollectionSnapshot('conversations', (conversations: Conversation[]) => {
            fetchConversations(conversations, user.uid);
        });
    }, [user]);
};
