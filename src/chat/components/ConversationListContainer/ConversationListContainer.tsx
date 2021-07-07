import React from "react";
import {Grid, TextField} from "@material-ui/core";
import {ConversationsList} from "../ConversationsList/ConversationsList";

export const ConversationListContainer: React.FC = () => {
    return (
        <Grid>
            <Grid item xs={12} style={{padding: '10px'}}>
                <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
            </Grid>
            <ConversationsList />
        </Grid>
    );
};
