import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as MessagesActions from '../actions/messagesActions';

export const useMessagesActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(MessagesActions, dispatch);
};
