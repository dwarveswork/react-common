import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import React, { createContext, useContext, useState } from 'react';
import { HttpClientProvider } from '../http';
import { Prompt, PromptSeverity } from '../prompt';
import { Router } from '../router';
import { PrincipalProvider } from './principal';
export const AppContext = createContext({});
export const useApp = () => useContext(AppContext);
export const App = props => {
    const { name, version, routes, onRouteChanged, theme, authenticationUri } = props;
    const [promptState, setPromptState] = useState({ open: false, severity: PromptSeverity.INFO, message: '' });
    const showPrompt = (severity, message) => {
        setPromptState({
            open: true,
            severity: severity,
            message: message
        });
    };
    const showInfo = (message) => {
        showPrompt(PromptSeverity.INFO, message);
    };
    const showSuccess = (message) => {
        showPrompt(PromptSeverity.SUCCESS, message);
    };
    const showWarning = (message) => {
        showPrompt(PromptSeverity.WARNING, message);
    };
    const showError = (message) => {
        showPrompt(PromptSeverity.ERROR, message);
    };
    return (React.createElement(React.Suspense, { fallback: 'Loading...' },
        React.createElement(MuiThemeProvider, { theme: theme },
            React.createElement(CssBaseline, null),
            React.createElement(AppContext.Provider, { value: {
                    name,
                    version,
                    showPrompt,
                    showInfo,
                    showSuccess,
                    showWarning,
                    showError
                } },
                React.createElement(HttpClientProvider, { authenticationUri: authenticationUri },
                    React.createElement(PrincipalProvider, null,
                        React.createElement(Router, { routes: routes, onRouteChanged: onRouteChanged }),
                        React.createElement(Prompt, { vertical: 'bottom', horizontal: 'right', onClose: () => setPromptState({ ...promptState, open: false }), state: promptState })))))));
};
//# sourceMappingURL=app.js.map