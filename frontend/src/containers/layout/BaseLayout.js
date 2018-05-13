import React, { Component } from 'react'
import { AppHeader, AppFooter } from '@coreui/react'

import { Router, routes } from '../../Router'

import BaseHeader from './BaseHeader'
import BaseSidebar from './BaseSidebar'
import BaseFooter from './BaseFooter'
import Breadcrumb from './Breadcrumb'

class BaseLayout extends Component {
	process
	render() {
		return (
			<div className='app'>
				<AppHeader fixed>
					<BaseHeader />
				</AppHeader>
				<div className='app-body'>
					<BaseSidebar {...this.props} />
					<main className='main'>
						<Breadcrumb appRoutes={routes} />
						<Router />
					</main>
				</div>
				<AppFooter>
					<BaseFooter />
				</AppFooter>
			</div>
		)
	}
}

export default BaseLayout