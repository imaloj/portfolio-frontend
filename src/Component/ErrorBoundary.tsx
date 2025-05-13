"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
    this.setState({ errorInfo })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Something went wrong</h1>
          <div className="bg-zinc-900 p-4 rounded-lg max-w-2xl w-full overflow-auto">
            <p className="text-red-400 mb-2">{this.state.error?.toString()}</p>
            <details className="text-gray-400 text-sm">
              <summary className="cursor-pointer text-gray-300 mb-2">View error details</summary>
              <pre className="whitespace-pre-wrap">{this.state.errorInfo?.componentStack}</pre>
            </details>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md"
          >
            Reload Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
