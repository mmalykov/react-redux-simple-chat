import {useAuthorizedUser} from "../../../integrations";
import {useUsersActions} from "./useUsersActions";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {selectUser} from "../selectors";

export const useCurrentUser = () => {
    const firebaseUser = useAuthorizedUser();
    const {fetchCurrentUser} = useUsersActions();
    const currentUser = useSelector(selectUser);

    useEffect(() => {
        if (!firebaseUser) {
            return;
        }

        fetchCurrentUser(firebaseUser.uid);
    }, [firebaseUser]);

    return currentUser;
};
