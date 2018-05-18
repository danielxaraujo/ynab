import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { AppSidebar, AppSidebarHeader, AppSidebarForm, AppSidebarNav, AppSidebarFooter, AppSidebarMinimizer } from '@coreui/react'

import { search } from '../views/account/accountActions'
import navigations from '../navigation';

class Sidebar extends Component {
	componentWillMount() {
		this.props.search()
	}
	injectAccounts() {
		let badget = navigations.items[4]
		badget.children = []
		let offBudget = navigations.items[5]
		offBudget.children = []
		this.props.accounts.forEach(account => {
			if (account.budget) {
				badget.children.push({
					name: account.name,
					url: `/transaction/${account._id}`,
					icon: `${account.icon} ${account.color}`
				})
			} else {
				offBudget.children.push({
					name: account.name,
					url: `/transaction/${account._id}`,
					icon: `${account.icon} ${account.color}`
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

const mapStateToProps = state => ({ accounts: state.accountStore.accounts })
const mapDispatchToProps = dispatch => bindActionCreators({ search }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)