import React, {useContext} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import {authorizedRoutes, paths, publicRoutes} from "../../routes";
import {FirebaseContext} from "../../contexts/firebase-context";

export const AppRouter = () => {
    const {auth} = useContext(FirebaseContext);

    return auth.currentUser ?
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
