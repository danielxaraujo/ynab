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
		icon: 'fas fa-chart-line',
	}, {
		name: 'All Accounts',
		url: '/account',
		icon: 'fas fa-university',
	}, {
		title: true,
		name: 'Accounts',
	}, {
		name: 'Budgets',
		icon: 'fas fa-tag',
		children: [{
			name: 'Conta Corrente BB',
			url: '/account/1',
			icon: 'fas fa-money-check-alt',
		}, {
			name: 'Cartão de Crédito BB',
			url: '/account/2',
			icon: 'fas fa-credit-card',
		}]
	}, {
		name: 'Off Budgets',
		icon: 'fas fa-tag',
		children: [{
			name: 'Poupança BB',
			url: '/account/2',
			icon: 'fas fa-piggy-bank',
		}]
	}]
}

export default Navigations