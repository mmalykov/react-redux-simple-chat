import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as ConversationsActions from '../actions/conversationsActions';

export const useConversationsActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(ConversationsActions, dispatch);
};
