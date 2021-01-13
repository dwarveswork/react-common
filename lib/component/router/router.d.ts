import React, { FC } from 'react';
import { RouteConfig } from './route';
export interface RouterContextProps {
    routes: RouteConfig[];
    selection: RouteConfig;
    onRouteChanged: (route: RouteConfig) => void;
    navigate: (route: Pick<RouteConfig, 'path'> | string, resolver?: (path: string) => string) => void;
    goBack: () => void;
}
export declare const RouterContext: React.Context<RouterContextProps>;
export declare const useRouter: () => RouterContextProps;
export interface RouterProps {
    routes: RouteConfig[];
    onRouteChanged?: (route: RouteConfig) => void;
}
export declare const Router: FC<RouterProps>;
export declare const Routes: FC<{
    routes: RouteConfig[];
}>;
//# sourceMappingURL=router.d.ts.map