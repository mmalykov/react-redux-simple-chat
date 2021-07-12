import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import {authorizedRoutes, paths, publicRoutes} from "../../routes";
import {useAuthorizedUser} from "../../integrations";

export const AppRouter = () => {
    const user = useAuthorizedUser();

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
