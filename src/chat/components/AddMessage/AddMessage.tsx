import React from "react";
import {Fab, Grid, TextField} from "@material-ui/core";
import {Send} from '@material-ui/icons';

export const AddMessage: React.FC = () => {
    return (
        <Grid container>
            <Grid item xs={11}>
                <TextField label="Type Something" fullWidth/>
            </Grid>
            <Grid item xs={1}>
                <Fab color="primary" aria-label="add">
                    <Send/>
                </Fab>
            </Grid>
        </Grid>
    );
};
