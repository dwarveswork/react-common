import React, {createContext, FC, useContext, useState} from 'react';

export interface Principal {
  id: number;
  name: string;
  roles: string[];
}

export interface PrincipalContextProps {
  value?: Principal;
  signIn: (principal: Principal) => void;
  signOut: () => void;
}

export const PrincipalContext = createContext<PrincipalContextProps>({} as never);

export const PrincipalProvider: FC = props => {

  const [principal, setPrincipal] = useState<Principal>();

  const signIn = (p: Principal) => {
    setPrincipal(p);
  };

  const signOut = () => {
    setPrincipal(undefined);
  };

  return (
    <PrincipalContext.Provider value={{value: principal, signIn, signOut}}>
      {props.children}
    </PrincipalContext.Provider>
  );
};

export const usePrincipal = () => useContext(PrincipalContext);