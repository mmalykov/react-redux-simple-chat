import {UsersState} from "../types/store";
import {User} from "../../types/user";

export const selectUser = (state: UsersState): User | null => state.currentUser;

export const selectRegisterError = (state: UsersState): string => state.registerError;

export const selectLoginError =  (state: UsersState): string => state.loginError;
