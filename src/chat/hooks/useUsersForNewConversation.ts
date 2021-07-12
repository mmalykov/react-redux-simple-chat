import {useEffect, useState} from "react";
import {fetchUsersForNewConversation} from "../store/actions";
import {useSelector} from "react-redux";
import {selectConversations} from "../store/selectors";
import {User} from "../../users/types/user";
import {useCurrentUser} from "../../users/store/hooks/useCurrentUser";

export const useUsersForNewConversation = (shouldLoad: boolean) => {
    const currentUser = useCurrentUser();
    const {conversations} = useSelector(selectConversations);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        if (!shouldLoad || conversations.length === 0 || !currentUser) {
            return;
        }

        async function fetchAndSetUsers() {
            const users = await fetchUsersForNewConversation(conversations, currentUser?.id);
            setUsers(users);
        }

        fetchAndSetUsers();
    }, [conversations, currentUser, shouldLoad]);

    return users;
};
