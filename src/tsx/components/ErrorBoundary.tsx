import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h2 className="font-lato font-bold text-2xl mb-4">Etwas ist schief gelaufen</h2>
            <p className="mb-6 text-center">Ein unerwarteter Fehler ist aufgetreten.</p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
              className="bg-green-dark-900 text-white px-5 py-2 rounded-2xl font-semibold hover:bg-green-light-900 transition-colors"
            >
              Erneut versuchen
            </button>
          </div>
        )
      )
    }
    return this.props.children
  }
}
