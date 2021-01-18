import { FC, ReactNode } from 'react';
import { CommonComponentProps } from '../common-component';
import { RouteConfig } from '../router';
export interface FrameProps extends CommonComponentProps {
    routes: RouteConfig[];
    headerActions?: ReactNode;
}
export declare const Frame: FC<FrameProps>;
//# sourceMappingURL=frame.d.ts.map