import { ComponentType, FC, ReactNode } from 'react';
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
export declare type RouteConfig = RouteRedirectConfig | RouteComponentConfig;
export interface RouteProps {
    route: RouteConfig;
    onRouteChanged: (route: RouteComponentConfig) => void;
}
export declare const Route: FC<RouteProps>;
//# sourceMappingURL=route.d.ts.map