import React, { Component } from 'react'
import { AppHeader, AppFooter } from '@coreui/react'

import { Router, routes } from '../router'

import Header from './header'
import Sidebar from './sidebar'
import Footer from './footer'
import Breadcrumb from './breadcrumb'
import withAuth from '../components/withAuth'

class FullLayout extends Component {
	render() {
		return (
			<div className='app'>
				<AppHeader fixed>
					<Header />
				</AppHeader>
				<div className='app-body'>
					<Sidebar {...this.props} />
					<main className='main'>
						<Breadcrumb appRoutes={routes} />
						<Router {...this.props} />
					</main>
				</div>
				<AppFooter>
					<Footer />
				</AppFooter>
			</div>
		)
	}
}

export default withAuth(FullLayout, 'http://127.0.0.1:3000')