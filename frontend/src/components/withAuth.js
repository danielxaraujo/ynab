import React, { Component } from 'react';
import AuthService from './authService'
import If from './if'

const withAuth = (Comp, url) => {
    const authService = new AuthService(url);
    return class Auth extends Component {
        constructor(props) {
            super(props)
            this.authService = authService
            this.state = { user: null }
        }
        componentDidMount() {
            if (!this.authService.loggedIn()) {
                this.props.history.replace('/login')
            } else {
                try {
                    const profile = this.authService.getAuthenticatedUser()
                    this.setState({ user: profile })
                }
                catch (err) {
                    console.log(`err: ${err}`)
                    this.authService.logout()
                    this.props.history.replace('/login')
                }
            }
        }
        render() {
            return (
                <Comp history={this.props.history} location={this.props.location} {...this.authService} />
            )
        }
    }
}

export default withAuth