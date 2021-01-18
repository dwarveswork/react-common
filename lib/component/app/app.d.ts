import { Theme } from '@material-ui/core';
import React, { FC } from 'react';
import { PromptSeverity } from '../prompt';
import { RouteConfig } from '../router';
export interface AppContextProps {
    name: string;
    version: string;
    showPrompt: (severity: PromptSeverity, message: string) => void;
    showInfo: (message: string) => void;
    showSuccess: (message: string) => void;
    showWarning: (message: string) => void;
    showError: (message: string) => void;
}
export declare const AppContext: React.Context<AppContextProps>;
export declare const useApp: () => AppContextProps;
export interface AppProps {
    name: string;
    version: string;
    routes: RouteConfig[];
    onRouteChanged?: (route: RouteConfig) => void;
    theme: Theme;
    authenticationUri?: string;
}
export declare const App: FC<AppProps>;
//# sourceMappingURL=app.d.ts.map