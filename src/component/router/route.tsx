import React, {ComponentType, FC, ReactNode, useEffect} from 'react';
import {Route as ReactRoute} from 'react-router';

export interface RouteConfig {
  key: string;
  path: string;
  strict?: boolean;
  title: string | ReactNode;
  icon?: ReactNode;
  menu?: boolean;
  component: ComponentType<any>;
  children?: RouteConfig[];
}

export interface RouteProps {
  route: RouteConfig;
  onRouteChanged: (route: RouteConfig) => void;
}

export const Route: FC<RouteProps> = props => {

  const {route, onRouteChanged} = props;

  return (
    <ReactRoute path={route.path} exact={route.strict}>
      <RouteRenderer route={route} onRouteChanged={onRouteChanged}/>
    </ReactRoute>
  );
};

interface RouteRendererProps {
  route: RouteConfig;
  onRouteChanged: (route: RouteConfig) => void;
}

const RouteRenderer: FC<RouteRendererProps> = props => {

  const {route, onRouteChanged} = props;

  useEffect(() => {
    if (route.children === undefined) {
      onRouteChanged(route);
    }
  }, []);

  // @ts-ignore
  return <route.component routes={route.children} {...props} />;
};