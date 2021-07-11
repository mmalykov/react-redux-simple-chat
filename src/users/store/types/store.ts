import {User} from "../../types/user";

export interface UsersState {
    currentUser: User | null;
    registerError: string;
    loginError: string;
}

export enum UsersActionType {
    REGISTER_USER = 'REGISTER_USER',
    REGISTER_USER_SUCCESSFUL = 'REGISTER_USER_SUCCESSFUL',
    REGISTER_USER_ERROR = 'REGISTER_USER_ERROR',
    LOGIN_USER = 'LOGIN_USER',
    LOGIN_USER_SUCCESSFUL = 'LOGIN_USER_SUCCESSFUL',
    LOGIN_USER_ERROR = 'LOGIN_USER_ERROR',
}

export interface RegisterUserAction {
    type: UsersActionType.REGISTER_USER;
}

export interface RegisterUserSuccessfulAction {
    type: UsersActionType.REGISTER_USER_SUCCESSFUL;
    payload: User;
}

export interface RegisterUserErrorAction {
    type: UsersActionType.REGISTER_USER_ERROR;
    payload: string;
}

export interface LoginUserAction {
    type: UsersActionType.LOGIN_USER;
}

export interface LoginUserSuccessfulAction {
    type: UsersActionType.LOGIN_USER_SUCCESSFUL;
    payload: User;
}

export interface LoginUserErrorAction {
    type: UsersActionType.LOGIN_USER_ERROR;
    payload: string;
}

export type UsersAction =
    RegisterUserAction |
    RegisterUserSuccessfulAction |
    RegisterUserErrorAction |
    LoginUserAction |
    LoginUserSuccessfulAction |
    LoginUserErrorAction;
