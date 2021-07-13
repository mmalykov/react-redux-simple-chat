import {UsersState} from "../types/store";
import {User} from "../../types/user";

type RootUsersState = { users: UsersState };

export const selectUser = ({users: {currentUser}}: RootUsersState): User | null => currentUser;

export const selectRegisterError = ({users: {registerError}}: RootUsersState): string => registerError;

export const selectLoginError = ({users: {loginError}}: RootUsersState): string => loginError;
