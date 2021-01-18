import React, { FC } from 'react';
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
export declare const PrincipalContext: React.Context<PrincipalContextProps>;
export declare const PrincipalProvider: FC;
export declare const usePrincipal: () => PrincipalContextProps;
//# sourceMappingURL=principal.d.ts.map