import React, { Component } from 'react'
import { AppSidebar, AppSidebarHeader, AppSidebarForm, AppSidebarNav, AppSidebarFooter, AppSidebarMinimizer } from '@coreui/react'

import navigations from '../navigation';

class Sidebar extends Component {
	constructor(props) {
		super(props)
		this.state = { accounts: [] }
	}
	componentDidMount() {
		this.props.fetch('api/account').then(json => this.setState({ accounts: json.data }))
	}
	injectAccounts() {
		let badget = navigations.items[4]
		badget.children = []
		let offBudget = navigations.items[5]
		offBudget.children = []
		this.state.accounts.forEach(account => {
			if (account.budget) {
				badget.children.push({
					name: account.name,
					url: `/account/${account._id}`,
					icon: account.icon,
				})
			} else {
				offBudget.children.push({
					name: account.name,
					url: `/account/${account._id}`,
					icon: account.icon,
				})
			}
		})
	}
	render() {
		this.injectAccounts()
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

export default Sidebar