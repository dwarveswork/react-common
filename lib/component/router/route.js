import React, { useEffect } from 'react';
import { Redirect, Route as ReactRoute } from 'react-router';
export const Route = props => {
    const { route, onRouteChanged } = props;
    return ('redirect' in route) ? (React.createElement(ReactRoute, { path: route.path, exact: route.strict },
        React.createElement(Redirect, { to: route.redirect }))) : (React.createElement(ReactRoute, { path: route.path, exact: route.strict },
        React.createElement(RouteRenderer, { route: route, onRouteChanged: onRouteChanged })));
};
const RouteRenderer = props => {
    const { route, onRouteChanged } = props;
    useEffect(() => {
        if (route.children === undefined) {
            onRouteChanged(route);
        }
    }, []);
    return React.createElement(route.component, Object.assign({ routes: route.children }, props));
};
//# sourceMappingURL=route.js.map