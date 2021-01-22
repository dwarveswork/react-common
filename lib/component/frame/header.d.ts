import { FC } from 'react';
import { CommonComponentProps } from '../common-component';
export interface HeaderProps extends CommonComponentProps {
    onMenuClicked: () => void;
    color?: 'inherit' | 'primary' | 'secondary' | 'default' | 'transparent';
}
export declare const Header: FC<HeaderProps>;
//# sourceMappingURL=header.d.ts.map