import React from "react";
import {Grid, TextField} from "@material-ui/core";
import {ConversationsList} from "../ConversationsList/ConversationsList";
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";

export const ConversationListContainer: React.FC = () => {
    const {filteredConversations} = useTypedSelector(state => state.chat);

    return (
        <Grid item xs={4}>
            <Grid item xs={12} style={{padding: '10px'}}>
                <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
            </Grid>
            <ConversationsList conversations={filteredConversations}/>
        </Grid>
    );
};
