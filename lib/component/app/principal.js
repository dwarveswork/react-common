import React, { createContext, useContext, useState } from 'react';
export const PrincipalContext = createContext({});
export const PrincipalProvider = props => {
    const [principal, setPrincipal] = useState();
    const signIn = (p) => {
        setPrincipal(p);
    };
    const signOut = () => {
        setPrincipal(undefined);
    };
    return (React.createElement(PrincipalContext.Provider, { value: { value: principal, signIn, signOut } }, props.children));
};
export const usePrincipal = () => useContext(PrincipalContext);
//# sourceMappingURL=principal.js.map