import { FC, ReactNode } from 'react';
import { CommonComponentProps } from '../common-component';
import { RouteComponentConfig } from '../router';
export interface FrameProps extends CommonComponentProps {
    routes: RouteComponentConfig[];
    headerColor?: 'inherit' | 'primary' | 'secondary' | 'default' | 'transparent';
    headerActions?: ReactNode;
}
export declare const Frame: FC<FrameProps>;
//# sourceMappingURL=frame.d.ts.map