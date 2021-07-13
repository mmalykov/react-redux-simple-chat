import React, {useEffect, useState} from "react";
import {Fab, Grid, makeStyles, TextField} from "@material-ui/core";
import {Send} from '@material-ui/icons';

type Props = {
   initialContent: string;
   contentChange?: (content: string) => void;
   buttonClick: (content: string) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1)
    }
}));

export const Message: React.FC<Props> = ({initialContent= '', contentChange, buttonClick}) => {
    const classes = useStyles();
    const [content, setContent] = useState(initialContent);

    useEffect(() => {
        setContent(initialContent);
    }, [initialContent]);

    const handleChange = (content: string) => {
        setContent(content);
        contentChange && contentChange(content);
    };

    const handleClick = () => {
        buttonClick(content)
    };

    return (
        <Grid className={classes.root} container>
            <Grid item xs={11}>
                <TextField
                    label="Write a message ..."
                    fullWidth
                    multiline
                    maxRows={5}
                    value={content}
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
