import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectConversations} from "../store/selectors";
import {User} from "../../users/types/user";
import {useCurrentUser} from "../../users/store/hooks/useCurrentUser";
import {fetchUsersForNewConversation} from "../api";

export const useUsersForNewConversation = (shouldLoad: boolean) => {
    const currentUser = useCurrentUser();
    const {conversations} = useSelector(selectConversations);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        if (!shouldLoad || !currentUser) {
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
