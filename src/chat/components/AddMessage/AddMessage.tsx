import React, {useEffect, useState} from "react";
import {Fab, Grid, makeStyles, TextField} from "@material-ui/core";
import {Send} from '@material-ui/icons';
import {Message} from "../../types/message";

type Props = {
    conversationId: string;
    draftMessage: string;
    editingMessage: Message | null;
    sendMessage: (content: string) => void;
    editMessage: (message: Message) => void;
    storeDraftMessage: (conversationId: string, content: string) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1)
    }
}));

export const AddMessage: React.FC<Props> = (props) => {
    const {
        conversationId,
        editingMessage,
        draftMessage,
        sendMessage,
        editMessage,
        storeDraftMessage
    } = props;
    const classes = useStyles();
    const [message, setMessage] = useState(editingMessage ? editingMessage.content : draftMessage);

    useEffect(() => {
        setMessage(draftMessage);
    }, [conversationId, draftMessage]);

    useEffect(() => {
        if (editingMessage) {
            setMessage(editingMessage?.content);
        }
    }, [editingMessage]);

    const handleNewMessageChange = (content: string) => {
        setMessage(content);
        storeDraftMessage(conversationId, content);
    };

    const handleEditingMessageChange = (content: string) => {
        setMessage(content);
    };

    const handleChange = editingMessage ? handleEditingMessageChange : handleNewMessageChange;

    const handleAddNewMessageClick = () => {
        sendMessage(message);
        storeDraftMessage(conversationId, '');
        setMessage('');
    };

    const handleEditingMessageSaveClick = () => {
        editMessage({...editingMessage, content: message} as Message);
        setMessage('');
    };

    const handleClick = editingMessage ? handleEditingMessageSaveClick : handleAddNewMessageClick;

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
