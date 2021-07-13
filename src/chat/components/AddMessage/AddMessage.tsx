import React, {useEffect, useState} from "react";
import {Fab, Grid, makeStyles, TextField} from "@material-ui/core";
import {Send} from '@material-ui/icons';

type Props = {
    conversationId: string;
    draftMessage: string;
    addMessage: (content: string) => void;
    storeDraftMessage: (conversationId: string, content: string) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1)
    }
}));

export const AddMessage: React.FC<Props> = ({conversationId, draftMessage, addMessage, storeDraftMessage}) => {
    const classes = useStyles();
    const [message, setMessage] = useState(draftMessage);

    useEffect(() => {
        setMessage(draftMessage);
    }, [conversationId, draftMessage]);

    const handleChange = (content: string) => {
        setMessage(content);
        storeDraftMessage(conversationId, content);
    };

    const handleClick = () => {
        addMessage(message);
        storeDraftMessage(conversationId, '');
        setMessage('');
    };

    return (
        <Grid className={classes.root} container>
            <Grid item xs={11}>
                <TextField
                    label="Write a message ..."
                    fullWidth
                    multiline
                    maxRows={5}
                    value={message}
                    onChange={e => handleChange(e.target.value)}
                />
            </Grid>
            <Grid item xs={1}>
                <Fab color="primary" aria-label="add" onClick={handleClick}>
                    <Send/>
                </Fab>
            </Grid>
        </Grid>
    );
};
