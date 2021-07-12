import {useContext, useEffect, useState} from "react";
import {fetchUsersForNewConversation} from "../store/actions";
import {FirebaseContext} from "../../contexts/firebaseContext";
import {useAuthState} from "react-firebase-hooks/auth";
import {useSelector} from "react-redux";
import {selectConversations} from "../store/selectors";
import {User} from "../../users/types/user";

export const useUsersForNewConversation = (shouldLoad: boolean) => {
    const {auth} = useContext(FirebaseContext);
    const [currentUser] = useAuthState(auth);
    const {conversations} = useSelector(selectConversations);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        if (!shouldLoad || conversations.length === 0 || !currentUser) {
            return;
        }

        async function fetchAndSetUsers() {
            const users = await fetchUsersForNewConversation(conversations, currentUser?.uid);
            setUsers(users);
        }

        fetchAndSetUsers();
    }, [conversations, currentUser, shouldLoad]);

    return users;
};
