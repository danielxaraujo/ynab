import React, { Component } from 'react'
import { AppSidebar, AppSidebarHeader, AppSidebarForm, AppSidebarNav, AppSidebarFooter, AppSidebarMinimizer } from '@coreui/react'

import navigations from '../../Navigations';

class BaseSidebar extends Component {
	render() {
		return (
			<React.Fragment>
				<AppSidebar fixed display='lg'>
					<AppSidebarHeader />
					<AppSidebarForm />
					<AppSidebarNav navConfig={navigations} {...this.props} />
            		<AppSidebarFooter />
					<AppSidebarMinimizer />
				</AppSidebar>
			</React.Fragment>
		)
	}
}

export default BaseSidebar