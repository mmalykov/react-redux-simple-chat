import React from 'react';
import {AppBar} from "./components/AppBar/AppBar";
import {makeStyles} from "@material-ui/core";
import {BrowserRouter} from "react-router-dom";
import {AppRouter} from "./components/AppRouter/AppRouter";
import {useCurrentUser} from "./users/store/hooks/useCurrentUser";

const useStyles = makeStyles(() => ({
    app: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    }
}));

function App() {
    const classes = useStyles();
    const currentUser = useCurrentUser();

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
