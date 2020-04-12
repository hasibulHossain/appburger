import React, { Component } from 'react'

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        error: null
    }

    static getDerivedStateFromError() {
        return {
            hasError: true
        }
    }

    componentDidCatch(err, errObj) {
        console.log(err.message, errObj)
        this.setState({error: err})
    }

    render() {
        if(this.state.hasError) {
            return <div style={{color: 'red', textAlign: 'center', padding: '100px'}} >something went wrong!!!</div>
        }

        return this.props.children
    }
}

export default ErrorBoundary
