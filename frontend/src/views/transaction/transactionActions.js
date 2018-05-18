const URL = 'http://127.0.0.1:3001/api/transaction'

const authFetch = (url, options) => {
	const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
	const token = localStorage.getItem('jwt_token')
	if (token) {
		headers['Authorization'] = 'Bearer ' + token
	}
	return fetch(url, { headers, ...options }).then(response => response.json())
}

export const TRANSACTION_SEARCH = 'TRANSACTION_SEARCH';

export const search = accountId => {
	const response = authFetch(`${URL}?accountId=${accountId}`)
	return { type: TRANSACTION_SEARCH, payload: response }
}