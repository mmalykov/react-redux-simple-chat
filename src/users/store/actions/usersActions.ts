import {Dispatch} from "redux";
import * as h from 'history';
import {UsersAction, UsersActionType} from "../types/store";
import {User} from "../../types/user";
import {paths} from "../../../routes";
import {
    createUserWithEmailAndPassword,
    signInUserWithEmailAndPassword,
    fetchOneDocumentByFieldValue,
    updateDocumentInCollection
} from "../../../integrations";

export const registerUser = (email: string, password: string, history: h.History) => {
    return async (dispatch: Dispatch<UsersAction>) => {
        try {
            dispatch({type: UsersActionType.REGISTER_USER});

            const user = await createUserWithEmailAndPassword(email, password);
            const userPayload: User = {
                id: user?.uid as string,
                fullName: user?.displayName as string,
                email: user?.email as string,
                avatarUrl: user?.photoURL as string
            }

            await dispatch({type: UsersActionType.REGISTER_USER_SUCCESSFUL, payload: userPayload});
            history.push(paths.chat);
        } catch (e) {
            dispatch({type: UsersActionType.REGISTER_USER_ERROR, payload: e.message,});
        }
    }
};

export const loginUser = (email: string, password: string, history: h.History) => {
    return async (dispatch: Dispatch<UsersAction>) => {
        try {
            dispatch({type: UsersActionType.LOGIN_USER});
            const user = await signInUserWithEmailAndPassword(email, password);
            const userPayload: User = {
                id: user?.uid as string,
                fullName: user?.displayName as string,
                email: user?.email as string,
                avatarUrl: user?.photoURL as string
            }

            await dispatch({type: UsersActionType.SET_CURRENT_USER, payload: userPayload});
            history.push(paths.chat);
        } catch (e) {
            dispatch({type: UsersActionType.LOGIN_USER_ERROR, payload: e.message,});
        }
    }
};

export const updateUser = (user: User) => {
    return async (dispatch: Dispatch<UsersAction>) => {
        await updateDocumentInCollection<User>('users', user.id, user);

        dispatch({type: UsersActionType.SET_CURRENT_USER, payload: user});
    };
};

export const fetchCurrentUser = (authId?: string) => {
    return async (dispatch: Dispatch<UsersAction>) => {
        const user = await fetchOneDocumentByFieldValue<User>('users', 'authId', authId);

        dispatch({type: UsersActionType.SET_CURRENT_USER, payload: {authId, ...user}});
    };
};
