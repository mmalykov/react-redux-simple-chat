import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {CssBaseline} from "@material-ui/core";
import {FirebaseContext, firebaseContextValue} from './integrations';
import {Provider} from "react-redux";
import {store} from "./store";
import App from './App';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <FirebaseContext.Provider value={firebaseContextValue}>
            <Provider store={store}>
                <CssBaseline/>
                <App/>
            </Provider>
        </FirebaseContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
