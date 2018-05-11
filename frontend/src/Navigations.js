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
		name: 'Accounts',
		url: '/account/all',
		icon: 'fas fa-university',
		children: [
			{
				name: 'Conta Corrent BB',
				url: '/account/1',
				icon: 'fas fa-money-check',
			}, {
				name: 'Cartão Crédito BB',
				url: '/account/1',
				icon: 'fas fas fa-credit-card',
			}
		]
	}
	]
}

export default Navigations