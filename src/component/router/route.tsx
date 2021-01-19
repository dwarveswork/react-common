import React, {ComponentType, FC, ReactNode, useEffect} from 'react';
import {Redirect, Route as ReactRoute} from 'react-router';

export interface RouteCommonConfig {
  key: string;
  path: string;
  strict?: boolean;
}

export interface RouteRedirectConfig extends RouteCommonConfig {
  redirect: string;
}

export interface RouteComponentConfig extends RouteCommonConfig {
  title: string | ReactNode;
  icon?: ReactNode;
  menu?: boolean;
  component: ComponentType<any>;
  children?: RouteConfig[];
}

export type RouteConfig = RouteRedirectConfig | RouteComponentConfig;

export interface RouteProps {
  route: RouteConfig;
  onRouteChanged: (route: RouteComponentConfig) => void;
}

export const Route: FC<RouteProps> = props => {

  const {route, onRouteChanged} = props;

  return ('redirect' in route) ? (
    <ReactRoute path={route.path} exact={route.strict}>
      <Redirect to={route.redirect}/>
    </ReactRoute>
  ) : (
    <ReactRoute path={route.path} exact={route.strict}>
      <RouteRenderer route={route} onRouteChanged={onRouteChanged}/>
    </ReactRoute>
  );
};

interface RouteRendererProps {
  route: RouteComponentConfig;
  onRouteChanged: (route: RouteComponentConfig) => void;
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