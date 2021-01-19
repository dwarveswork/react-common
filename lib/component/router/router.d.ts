import React, { FC } from 'react';
import { RouteComponentConfig, RouteConfig } from './route';
export interface RouterContextProps {
    routes: RouteConfig[];
    selection?: RouteComponentConfig;
    onRouteChanged: (route: RouteComponentConfig) => void;
    navigate: (route: Pick<RouteConfig, 'path'> | string, options?: {
        resolver?: (path: string) => string;
        state?: any;
    }) => void;
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