// ErrorBoundary.jsx
import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error("Error caught by boundary:", error, info)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong in the app.</h1>
    }
console.log({Error});

    return this.props.children
  }
}

export default ErrorBoundary
