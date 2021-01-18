import { ComponentType, FC, ReactNode } from 'react';
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
export declare const Route: FC<RouteProps>;
//# sourceMappingURL=route.d.ts.map