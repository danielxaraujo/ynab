const URL = 'http://127.0.0.1:3001/api/account'

const authFetch = (url, options) => {
	const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
	const token = localStorage.getItem('jwt_token')
	if (token) {
		headers['Authorization'] = 'Bearer ' + token
	}
	return fetch(url, { headers, ...options }).then(response => response.json())
}

const submit = (account, method, action) => {
	const id = account._id ? account._id : ''
	delete account._id
	const response = authFetch(`${URL}/${id}`, { method: method, body: JSON.stringify(account) })
	return [{ type: action, payload: response }, search()]
}

export const ACCOUNT_SEARCH = 'ACCOUNT_SEARCH';
export const ACCOUNT_UPDATE = 'ACCOUNT_UPDATE';
export const ACCOUNT_CREATE = 'ACCOUNT_CREATE';
export const ACCOUNT_DELETE = 'ACCOUNT_DELETE';
export const ACCOUNT_HANDLER = 'ACCOUNT_HANDLER';
export const ACCOUNT_SELECT = 'ACCOUNT_SELECT';
export const ACCOUNT_NEW = 'ACCOUNT_NEW';

export const search = () => {
	const response = authFetch(URL)
	return { type: ACCOUNT_SEARCH, payload: response }
}

export const create = account => {
	return submit(account, 'POST', ACCOUNT_CREATE)
}

export const update = account => {
	return submit(account, 'PUT', ACCOUNT_UPDATE)
}

export const remove = account => {
	return submit(account, 'DELETE', ACCOUNT_DELETE)
}

export const handleChange = event => {
	const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
	return { type: ACCOUNT_HANDLER, payload: { name: event.target.name, value: value } }
}

export const select = account => {
	return { type: ACCOUNT_SELECT, payload: { data: { ...account } } }
}

export const newAccount = () => {
	return { type: ACCOUNT_NEW, payload: { data: { budget: false } } }
}