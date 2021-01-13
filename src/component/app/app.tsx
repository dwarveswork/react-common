import {CssBaseline, MuiThemeProvider, Theme} from '@material-ui/core';
import React, {createContext, FC, useContext, useState} from 'react';
import {HttpClientProvider} from '../http';
import {Prompt, PromptSeverity, PromptState} from '../prompt';
import {RouteConfig, Router} from '../router';
import {PrincipalProvider} from './principal';

export interface AppContextProps {
  name: string;
  version: string;
  showPrompt: (severity: PromptSeverity, message: string) => void;
  showInfo: (message: string) => void;
  showSuccess: (message: string) => void;
  showWarning: (message: string) => void;
  showError: (message: string) => void;
}

export const AppContext = createContext<AppContextProps>({} as never);

export const useApp = () => useContext<AppContextProps>(AppContext);

export interface AppProps {
  name: string;
  version: string;
  routes: RouteConfig[];
  onRouteChanged?: (route: RouteConfig) => void;
  theme: Theme;
  authenticationUri?: string;
}

export const App: FC<AppProps> = props => {

  const {name, version, routes, onRouteChanged, theme, authenticationUri} = props;
  const [promptState, setPromptState] = useState<PromptState>({open: false, severity: PromptSeverity.INFO, message: ''});

  const showPrompt = (severity: PromptSeverity, message: string) => {
    setPromptState({
      open: true,
      severity: severity,
      message: message
    });
  };

  const showInfo = (message: string) => {
    showPrompt(PromptSeverity.INFO, message);
  };

  const showSuccess = (message: string) => {
    showPrompt(PromptSeverity.SUCCESS, message);
  };

  const showWarning = (message: string) => {
    showPrompt(PromptSeverity.WARNING, message);
  };

  const showError = (message: string) => {
    showPrompt(PromptSeverity.ERROR, message);
  };

  return (
    <React.Suspense fallback={'Loading...'}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <AppContext.Provider value={{
          name,
          version,
          showPrompt,
          showInfo,
          showSuccess,
          showWarning,
          showError
        }}>
          <HttpClientProvider authenticationUri={authenticationUri}>
            <PrincipalProvider>
              <Router routes={routes} onRouteChanged={onRouteChanged}/>
              <Prompt vertical={'bottom'} horizontal={'right'} onClose={() => setPromptState({...promptState, open: false})} state={promptState}/>
            </PrincipalProvider>
          </HttpClientProvider>
        </AppContext.Provider>
      </MuiThemeProvider>
    </React.Suspense>
  );
};