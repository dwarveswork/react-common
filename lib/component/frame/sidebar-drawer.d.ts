import { FC } from 'react';
import { SidebarProps } from './sidebar';
export interface SidebarDrawerProps extends SidebarProps {
    open: boolean;
    onClosed: () => void;
}
export declare const SidebarDrawer: FC<SidebarDrawerProps>;
//# sourceMappingURL=sidebar-drawer.d.ts.map