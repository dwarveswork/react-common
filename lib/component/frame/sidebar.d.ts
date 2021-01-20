import { FC } from 'react';
import { CommonComponentProps } from '../common-component';
import { RouteComponentConfig } from '../router';
export interface SidebarProps extends CommonComponentProps {
    routes: RouteComponentConfig[];
    onClosed?: () => void;
}
export declare const Sidebar: FC<SidebarProps>;
//# sourceMappingURL=sidebar.d.ts.map