import {applyMiddleware, createStore, combineReducers} from "redux";
import thunk from "redux-thunk";
import {chatReducer} from "../chat/store";

export const rootReducer = combineReducers({
    chat: chatReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>

