import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { AppHeader, AppFooter } from '@coreui/react'
import { ToastContainer } from "react-toastify";

import routes from '../router'

import Header from './header'
import Sidebar from './sidebar'
import Footer from './footer'
import Breadcrumb from './breadcrumb'
import withAuth from '../components/withAuth'

class FullLayout extends Component {
	render() {
		return (
			<div className='app'>
				<ToastContainer />
				<AppHeader fixed>
					<Header {...this.props} />
				</AppHeader>
				<div className='app-body'>
					<Sidebar {...this.props} />
					<main className='main'>
						<Breadcrumb appRoutes={routes} />
						<Switch>
							{routes.map((route, idx) => {
								return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
									<route.component {...this.props} />
								)} />) : (null);
							})}
							<Redirect from="/" to="/dashboard" />
						</Switch>
					</main>
				</div>
				<AppFooter>
					<Footer />
				</AppFooter>
			</div>
		)
	}
}

export default withAuth(FullLayout, 'http://127.0.0.1:3001')