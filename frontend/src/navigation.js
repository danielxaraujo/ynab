const Navigations = {
	items: [{
		name: 'Dashboard',
		url: '/dashboard',
		icon: 'fas fa-tachometer-alt',
		badge: {
			variant: 'info',
			text: 'NEW'
		}
	}, {
		name: 'Reports',
		url: '/reports',
		icon: 'fas fa-chart-line'
	}, {
		name: 'All Accounts',
		url: '/account',
		icon: 'fas fa-university'
	}, {
		title: true,
		name: 'Accounts'
	}, {
		name: 'Budgets',
		icon: 'fas fa-tag'
	}, {
		name: 'Off Budgets',
		icon: 'fas fa-tag'
	}]
}

export default Navigations