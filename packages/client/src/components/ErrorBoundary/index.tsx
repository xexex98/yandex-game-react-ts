import { Component, ErrorInfo, ReactNode } from 'react';

import './ErrorBoundary.css';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: string;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
    console.error('ErrorBoundary', error, errorInfo);
    this.setState({
      hasError: true,
      error: error.message,
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className='error-page'>
          <div className='error-page__wrap'>
            <h1>Oops!</h1>
            <p className='error-page__descr'>
              Sorry, an unexpected error has occurred.
            </p>
            {this.state.error ? (
              <h3 className='error-page__text'>{this.state.error}</h3>
            ) : (
              ''
            )}
          </div>
        </div>
      );
    }

    return children;
  }
}
