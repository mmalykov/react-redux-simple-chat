import {Chat} from "./chat/components/Chat/Chat";
import {ComponentType} from "react";
import {Login} from "./components/Login/Login";

type Route = {
    path: string;
    Component: ComponentType;
};

const LOGIN_PATH = '/login';
const CHAT_PATH = '/chat';
export const paths = {
    login: LOGIN_PATH,
    chat: CHAT_PATH
};

export const publicRoutes: Route[] = [
    {
        path: LOGIN_PATH,
        Component: Login
    }
];

export const authorizedRoutes: Route[] = [
    {
        path: CHAT_PATH,
        Component: Chat
    },
];
