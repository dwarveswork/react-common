import React, {ErrorInfo, PropsWithChildren} from 'react';

interface ErrorBoundaryProps {}

interface ErrorBoundaryState {
  error: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends React.Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {error: false, errorMessage: ''};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: true,
      errorMessage: error.message
    });
  }

  render() {
    if (this.state.error) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{whiteSpace: 'pre-wrap'}}>
            {this.state.errorMessage}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}