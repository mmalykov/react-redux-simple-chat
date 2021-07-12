import React, {useContext} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import {authorizedRoutes, paths, publicRoutes} from "../../routes";
import {FirebaseContext} from "../../contexts/firebaseContext";
import {useAuthState} from "react-firebase-hooks/auth";

export const AppRouter = () => {
    const {auth} = useContext(FirebaseContext);
    const [user] = useAuthState(auth);

    return user ?
        (
            <Switch>
                {authorizedRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact={true}/>
                )}
                <Redirect to={paths.chat}/>
            </Switch>
        )
        :
        (
            <Switch>
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact={true}/>
                )}
                <Redirect to={paths.login}/>
            </Switch>
        )
};
