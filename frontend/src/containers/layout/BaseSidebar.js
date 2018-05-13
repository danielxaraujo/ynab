import React, { Component } from 'react'
import { AppSidebar, AppSidebarHeader, AppSidebarForm, AppSidebarNav, AppSidebarFooter, AppSidebarMinimizer } from '@coreui/react'

import navigations from '../../Navigations';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWY0ZjczMmE2NTUxMTI5NTY2NmFhMmYiLCJuYW1lIjoiRGFuaWVsIFhhdmllciBBcmHDumpvIiwiZW1haWwiOiJkYW5pZWx4YXJhdWpvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJGNPVWE5ekxJZEZuSk56UU14NWEuSWUwUlI0ZUg5L1FHWVdPMkJkSUM5cWMvREpteW5lR1BHIiwiX192IjowLCJpYXQiOjE1MjYyMjY0OTgsImV4cCI6MTUyNjMxMjg5OH0.M6nKK0NTOx0Q94Eh9V2XtCVfz545Ywg00iTZQrYt4kA'
const URL = 'http://127.0.0.1:3000/api/account'

class BaseSidebar extends Component {
	constructor(props) {
		super(props)
		this.state = { accounts: [] };
	}
	componentDidMount() {
		fetch(URL, {
			headers: new Headers({ 'Authorization': `Bearer ${TOKEN}` })
		}).then(response => (
			response.json()
		)).then(json => (
			this.setState({ accounts: json.data })
		))
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

export default BaseSidebar