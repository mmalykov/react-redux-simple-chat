import React from 'react';
import {Chat} from "./chat/components/Chat/Chat";
import {AppBar} from "./components/AppBar/AppBar";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    app: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    chat: {
        display: 'flex',
        flex: `1 0 100%`,
        maxHeight: `calc(100% - 64px)`,
    }
}));

function App() {
    const classes = useStyles();

    return (
        <div className={classes.app}>
            <AppBar/>
            <div className={classes.chat}>
                <Chat/>
            </div>
        </div>
    );
}

export default App;
