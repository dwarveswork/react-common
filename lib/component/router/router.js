import React, { createContext, useContext, useState } from 'react';
import { Redirect, Route as ReactRoute, Switch, useHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Route } from './route';
export const RouterContext = createContext({});
const RouterProvider = props => {
    const { routes, onRouteChanged: onRouteChangedCallBack } = props;
    const history = useHistory();
    const [selection, setSelection] = useState(routes[0]);
    const onRouteChanged = (route) => {
        setSelection(route);
        onRouteChangedCallBack && onRouteChangedCallBack(route);
    };
    const navigate = (route, options) => {
        if (typeof route === 'string') {
            history.push(options?.resolver ? options.resolver(route) : route, options?.state);
        }
        else {
            history.push(options?.resolver ? options.resolver(route.path) : route.path, options?.state);
        }
    };
    const goBack = () => {
        if (history.length === 0) {
            history.push('/');
        }
        else {
            history.goBack();
        }
    };
    const routerContext = {
        routes: routes,
        selection: selection,
        onRouteChanged: onRouteChanged,
        navigate: navigate,
        goBack: goBack
    };
    return (React.createElement(RouterContext.Provider, { value: routerContext }, props.children));
};
export const useRouter = () => useContext(RouterContext);
export const Router = props => {
    const { routes } = props;
    if (routes.length === 0) {
        return React.createElement("h1", null, "No routes defined");
    }
    return (React.createElement(BrowserRouter, null,
        React.createElement(RouterProvider, { routes: routes },
            React.createElement(Switch, null,
                React.createElement(ReactRoute, { exact: true, path: '/' },
                    React.createElement(Redirect, { to: '/secure' })),
                React.createElement(Routes, { routes: routes })))));
};
export const Routes = ({ routes }) => {
    const router = useRouter();
    return (React.createElement(React.Fragment, null, routes.map(r => (React.createElement(Route, { key: r.key, route: r, onRouteChanged: router.onRouteChanged })))));
};
//# sourceMappingURL=router.js.map