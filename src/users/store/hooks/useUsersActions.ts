import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as UsersActions from '../actions';

export const useUsersActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(UsersActions, dispatch);
};
