import {applyMiddleware, createStore, combineReducers, compose} from "redux";
import thunk from "redux-thunk";
import {usersReducer} from "../users/store";
import {conversationsReducer, messagesReducer} from "../chat/store";

export const rootReducer = combineReducers({
    conversations: conversationsReducer,
    messages: messagesReducer,
    users: usersReducer,
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
