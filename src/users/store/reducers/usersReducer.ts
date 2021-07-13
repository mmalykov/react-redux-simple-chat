import {UsersAction, UsersActionType, UsersState} from "../types/store";

const initialState: UsersState = {
    currentUser: null,
    registerError: '',
    loginError: '',
};

export const usersReducer = (state = initialState, action: UsersAction): UsersState => {
    switch (action.type) {
        case UsersActionType.REGISTER_USER_SUCCESSFUL:
        case UsersActionType.SET_CURRENT_USER:
            return {...state, currentUser: action.payload};
        case UsersActionType.REGISTER_USER_ERROR:
            return {...state, registerError: action.payload};
        case UsersActionType.LOGIN_USER_ERROR:
            return {...state, loginError: action.payload};
        default:
            return state;
    }
};
