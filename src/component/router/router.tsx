import React, {createContext, FC, useContext, useState} from 'react';
import {Redirect, Route as ReactRoute, Switch, useHistory} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {Route, RouteConfig} from './route';

export interface RouterContextProps {
  routes: RouteConfig[];
  selection: RouteConfig;
  onRouteChanged: (route: RouteConfig) => void;
  navigate: (route: Pick<RouteConfig, 'path'> | string, options?: {resolver?: (path: string) => string; state?: any}) => void;
  goBack: () => void;
}

export const RouterContext = createContext<RouterContextProps>({} as never);

const RouterProvider: FC<RouterProps> = props => {

  const {routes, onRouteChanged: onRouteChangedCallBack} = props;
  const history = useHistory();
  const [selection, setSelection] = useState<RouteConfig>(routes[0]);

  const onRouteChanged = (route: RouteConfig) => {
    setSelection(route);
    onRouteChangedCallBack && onRouteChangedCallBack(route);
  };

  const navigate = (route: Pick<RouteConfig, 'path'> | string, options?: {resolver?: (path: string) => string; state?: any}) => {
    if (typeof route === 'string') {
      history.push(options?.resolver ? options.resolver(route) : route, options?.state);
    } else {
      history.push(options?.resolver ? options.resolver(route.path) : route.path, options?.state);
    }
  };

  const goBack = () => {
    if (history.length === 0) {
      history.push('/');
    } else {
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

  return (
    <RouterContext.Provider value={routerContext}>{props.children}</RouterContext.Provider>
  );
};

export const useRouter = () => useContext<RouterContextProps>(RouterContext);

export interface RouterProps {
  routes: RouteConfig[];
  onRouteChanged?: (route: RouteConfig) => void;
}

export const Router: FC<RouterProps> = props => {

  const {routes} = props;

  if (routes.length === 0) {
    return <h1>No routes defined</h1>;
  }

  return (
    <BrowserRouter>
      <RouterProvider routes={routes}>
        <Switch>
          <ReactRoute exact path={'/'}>
            <Redirect to={'/secure'}/>
          </ReactRoute>
          <Routes routes={routes}/>
        </Switch>
      </RouterProvider>
    </BrowserRouter>
  );
};

export const Routes: FC<{routes: RouteConfig[]}> = ({routes}) => {

  const router = useRouter();

  return (
    <>
      {routes.map(r => (
        <Route key={r.key} route={r} onRouteChanged={router.onRouteChanged}/>
      ))}
    </>
  );
};