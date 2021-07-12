import React from "react";
import {useChatActions} from "../../../store/hooks/useChatActions";
import debounce from "@material-ui/core/utils/debounce";
import {SearchTextField} from "../../SearchTextField/SearchTextField";

export const ConversationListSearch: React.FC = () => {
    const {filterConversations} = useChatActions();
    const filterConversationsDebounced = debounce(filterConversations, 500);

    return (
        <SearchTextField queryChanged={filterConversationsDebounced}/>
    );
};
