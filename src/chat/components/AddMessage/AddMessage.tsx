import React, {useState} from "react";
import {Fab, Grid, TextField} from "@material-ui/core";
import {Send} from '@material-ui/icons';

type Props = {
    addMessage: (content: string) => void;
}

export const AddMessage: React.FC<Props> = ({addMessage}) => {
    const [message, setMessage] = useState('');

    const handleClick = () => {
        addMessage(message);
        setMessage('');
    };

    return (
        <Grid container>
            <Grid item xs={11}>
                <TextField
                    label="Write a message ..."
                    fullWidth
                    multiline
                    maxRows={5}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
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
