import {useEffect} from "react";
import {useChatActions} from "../store/hooks/useChatActions";
import {onCollectionSnapshot} from "../../integrations";
import {Conversation} from "../types/conversation";

export const useConversations = (user?: { uid: string; } | null) => {
    const {fetchConversations} = useChatActions();

    useEffect(() => {
        if (!user) {
            return;
        }

        return onCollectionSnapshot('conversations', (conversations: Conversation[]) => {
            fetchConversations(conversations, user.uid);
        });
    }, [user]);
};
