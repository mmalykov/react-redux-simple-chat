import React from 'react';
import {AppBar} from "./components/AppBar/AppBar";
import {makeStyles} from "@material-ui/core";
import {BrowserRouter} from "react-router-dom";
import {AppRouter} from "./components/AppRouter/AppRouter";

const useStyles = makeStyles(() => ({
    app: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    }
}));

function App() {
    const classes = useStyles();

    return (
        <div className={classes.app}>
            <BrowserRouter>
                <AppBar/>
                <AppRouter/>
            </BrowserRouter>
        </div>
    );
}

export default App;
