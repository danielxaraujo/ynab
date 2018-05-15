import React from 'react'
import Loadable from 'react-loadable'

import FullLayout from './layout/fullLayout';

function Loading() {
	return <div>Loading...</div>;
}

const Dashboard = Loadable({
	loader: () => import('./views/dashboard/dashboard'),
	loading: Loading,
});

const Account = Loadable({
	loader: () => import('./views/account/account'),
	loading: Loading,
});

const Transaction = Loadable({
	loader: () => import('./views/transaction/transaction'),
	loading: Loading,
});

const routes = [
	{ path: '/', exact: true, name: 'Home', component: FullLayout },
	{ path: '/dashboard', name: 'Dashboard', component: Dashboard },
	{ path: '/account', name: 'Account', component: Account },
	{ path: '/transaction/:accountId', name: 'Transactions', component: Transaction }
];

export default routes