import React, {useContext, useEffect} from 'react';
import {AppBar} from "./components/AppBar/AppBar";
import {makeStyles} from "@material-ui/core";
import {BrowserRouter} from "react-router-dom";
import {AppRouter} from "./components/AppRouter/AppRouter";
import {FirebaseContext} from "./contexts/firebaseContext";
import {useAuthState} from "react-firebase-hooks/auth";
import {useUsersActions} from "./users/store";

const useStyles = makeStyles(() => ({
    app: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    }
}));

function App() {
    const classes = useStyles();
    const {auth} = useContext(FirebaseContext);
    const [user] = useAuthState(auth);
    const {fetchCurrentUser} = useUsersActions();

    useEffect(() => {
        if (!user) {
            return;
        }

        fetchCurrentUser(user.uid);
    }, [user]);

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
