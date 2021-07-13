import React from "react";
import {useConversationsActions} from "../../../store/hooks";
import debounce from "@material-ui/core/utils/debounce";
import {SearchTextField} from "../../SearchTextField/SearchTextField";

type Props = {
    disabled: boolean;
};

export const ConversationListSearch: React.FC<Props> = ({disabled}) => {
    const {filterConversations} = useConversationsActions();
    const filterConversationsDebounced = debounce(filterConversations, 500);

    return (
        <SearchTextField disabled={disabled} queryChanged={filterConversationsDebounced}/>
    );
};
