import React from 'react';
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: false, errorMessage: '' };
    }
    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true,
            errorMessage: error.message
        });
    }
    render() {
        if (this.state.error) {
            return (React.createElement("div", null,
                React.createElement("h2", null, "Something went wrong."),
                React.createElement("details", { style: { whiteSpace: 'pre-wrap' } }, this.state.errorMessage)));
        }
        return this.props.children;
    }
}
//# sourceMappingURL=error-boundary.js.map