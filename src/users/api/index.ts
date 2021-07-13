import {
    fetchDocumentsByIds,
    fetchDocumentsNotInIds,
    fetchOneDocumentByFieldValue,
    updateDocumentInCollection
} from "../../integrations";
import {User} from "../types/user";

export {createUserWithEmailAndPassword, signInUserWithEmailAndPassword} from "../../integrations";

export const fetchUsersByIds = async (usersIds: string[]) => {
    return await fetchDocumentsByIds<User>('users', usersIds);
};

export const fetchUsersNotInIds = async (usersIds: string[]) => {
    return await fetchDocumentsNotInIds<User>('users', usersIds)
};

export const fetchUserById = async <T>(authId?: string) => {
    return await fetchOneDocumentByFieldValue<T>('users', 'authId', authId);
};

export const putUser = async <T>(userId: string, user: Partial<T>) => {
    await updateDocumentInCollection<User>('users', userId, user);
};
