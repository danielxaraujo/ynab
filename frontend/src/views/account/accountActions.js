const URL = 'http://127.0.0.1:3001/api/account'

const authFetch = (url, options) => {
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    const token = localStorage.getItem('jwt_token')
    if (token) {
        headers['Authorization'] = 'Bearer ' + token
    }
    return fetch(url, { headers, ...options }).then(response => response.json())
}

export const ACCOUNT_SEARCH = 'ACCOUNT_SEARCH';
export const ACCOUNT_UPDATE = 'ACCOUNT_UPDATE';
export const ACCOUNT_CREATE = 'ACCOUNT_CREATE';
export const ACCOUNT_HANDLER = 'ACCOUNT_CREATE';
export const ACCOUNT_SELECT = 'ACCOUNT_SELECT';
export const ACCOUNT_NEW = 'ACCOUNT_NEW';

export const search = () => {
    const response = authFetch(URL)
    return {
        type: ACCOUNT_SEARCH,
        payload: response
    }
}

export const update = account => {
    const id = account._id
    delete account._id
    const response = authFetch(`${URL}/${id}`, { method: 'PUT', body: JSON.stringify(account) })
    return [{
        type: ACCOUNT_UPDATE,
        payload: response
    }, search()]
}

export const create = account => {
    const response = authFetch(URL, { method: 'POST', body: JSON.stringify(account) })
    return {
        type: ACCOUNT_CREATE,
        payload: response
    }
}

export const handleChange = event => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    return {
        type: ACCOUNT_HANDLER,
        payload: value
    }
}

export const select = account => {
    return {
        type: ACCOUNT_SELECT,
        payload: account
    }
}

export const newAccount = () => {
    return {
        type: ACCOUNT_NEW,
        payload: { budget: false }
    }
}