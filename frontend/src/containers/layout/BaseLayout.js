import React, { Component } from 'react'
import { AppHeader, AppBreadcrumb, AppFooter } from '@coreui/react'

import { Router, routes } from '../../Router'

import BaseHeader from './BaseHeader'
import BaseSidebar from './BaseSidebar'
import BaseFooter from './BaseFooter'

class BaseLayout extends Component {
	process
	render() {
		return (
			<div className='app'>
				<AppHeader fixed>
					<BaseHeader />
				</AppHeader>
				<div className='app-body'>
					<BaseSidebar />
					<main className='main'>
						<AppBreadcrumb appRoutes={routes} />
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