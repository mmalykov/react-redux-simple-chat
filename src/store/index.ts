import {applyMiddleware, createStore, combineReducers} from "redux";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>

