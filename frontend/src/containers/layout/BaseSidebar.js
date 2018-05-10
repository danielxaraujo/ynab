import React, { Component } from 'react'
import { AppSidebar, AppSidebarNav, AppSidebarMinimizer } from '@coreui/react'

import navigations from '../../Navigations';

class BaseSidebar extends Component {
	render() {
		return (
			<React.Fragment>
				<AppSidebar fixed display='lg'>
					<AppSidebarNav navConfig={navigations} {...this.props} />
					<AppSidebarMinimizer />
				</AppSidebar>
			</React.Fragment>
		)
	}
}

export default BaseSidebar