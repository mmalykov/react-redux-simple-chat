import React, {useState} from "react";
import {Grid, TextField} from "@material-ui/core";
import {ConversationsList} from "../ConversationsList/ConversationsList";
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";
import debounce from "@material-ui/core/utils/debounce";
import {useActions} from "../../store/hooks/useActions";

export const ConversationListContainer: React.FC = () => {
    const {filteredConversations} = useTypedSelector(state => state.chat);
    const [query, setQuery] = useState('');
    const {filterConversations} = useActions();
    const filterConversationsDebounced = debounce(filterConversations, 500);
    const handleInputChange = (e: any) => {
        const content = e.target.value;
        setQuery(content);
        filterConversationsDebounced(content);
    };

    return (
        <Grid item xs={4}>
            <Grid item xs={12} style={{padding: '10px'}}>
                <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                    value={query}
                    onChange={handleInputChange} />
            </Grid>
            <ConversationsList conversations={filteredConversations}/>
        </Grid>
    );
};
