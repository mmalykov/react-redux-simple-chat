import {Chat} from "./chat/components/Chat/Chat";
import {ComponentType} from "react";
import {Login} from "./users/components/Login/Login";
import {Account} from "./users/components/Account/Account";

type Route = {
    path: string;
    Component: ComponentType;
};

const LOGIN_PATH = '/login';
const ACCOUNT_PATH = '/account';
const CHAT_PATH = '/chat';
export const paths = {
    login: LOGIN_PATH,
    account: ACCOUNT_PATH,
    chat: CHAT_PATH,
};

export const publicRoutes: Route[] = [
    {
        path: LOGIN_PATH,
        Component: Login
    }
];

export const authorizedRoutes: Route[] = [
    {
        path: ACCOUNT_PATH,
        Component: Account
    },
    {
        path: CHAT_PATH,
        Component: Chat
    },
];
