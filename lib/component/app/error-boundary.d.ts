import React, { ErrorInfo, PropsWithChildren } from 'react';
interface ErrorBoundaryProps {
}
interface ErrorBoundaryState {
    error: boolean;
    errorMessage: string;
}
export declare class ErrorBoundary extends React.Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    render(): {} | null | undefined;
}
export {};
//# sourceMappingURL=error-boundary.d.ts.map