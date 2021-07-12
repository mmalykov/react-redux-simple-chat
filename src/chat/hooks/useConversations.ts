import {useContext, useEffect} from "react";
import {useConversationsActions} from "../store/hooks";
import {onCollectionSnapshot} from "../../integrations";
import {Conversation} from "../types/conversation";
import {useSelector} from "react-redux";
import {selectConversations} from "../store/selectors";
import {FirebaseContext} from "../../contexts/firebaseContext";
import {useAuthState} from "react-firebase-hooks/auth";

export const useConversations = () => {
    const {auth} = useContext(FirebaseContext);
    const [user] = useAuthState(auth);
    const {fetchConversations} = useConversationsActions();
    const {conversations, filteredConversations} = useSelector(selectConversations);

    useEffect(() => {
        if (!user) {
            return;
        }

        return onCollectionSnapshot('conversations', (conversations: Conversation[]) => {
            fetchConversations(conversations, user.uid);
        });
    }, [user]);

    return [conversations, filteredConversations];
};
