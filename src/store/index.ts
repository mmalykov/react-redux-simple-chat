import {applyMiddleware, createStore, combineReducers, compose} from "redux";
import thunk from "redux-thunk";
import {chatReducer} from "../chat/store";
import {usersReducer} from "../users/store";

export const rootReducer = combineReducers({
    chat: chatReducer,
    users: usersReducer,
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
