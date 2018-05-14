import decode from 'jwt-decode';

export default class AuthService {

	constructor(domain) {
		this.domain = domain
		this.fetch = this.fetch.bind(this)
		this.login = this.login.bind(this)
		this.loggedIn = this.loggedIn.bind(this)
		this.getAuthenticatedUser = this.getAuthenticatedUser.bind(this)
	}

	login(username, password) {
		return this.fetch('login', {
			method: 'POST',
			body: JSON.stringify({ username, password })
		}).then(res => {
			this.setToken(res.token)
			return Promise.resolve(res);
		})
	}

	loggedIn() {
		const token = this.getToken()
		return !!token && !this.isTokenExpired(token)
	}

	isTokenExpired(token) {
		try {
			const decoded = decode(token);
			return (decoded.exp < Date.now() / 1000) ? true : false
		} catch (err) {
			return false;
		}
	}

	setToken(idToken) {
		localStorage.setItem('jwt_token', idToken)
	}

	getToken() {
		return localStorage.getItem('jwt_token')
	}

	logout() {
		localStorage.removeItem('id_token');
	}

	getAuthenticatedUser() {
		return decode(this.getToken());
	}

	fetch(url, options) {

		console.log(url)
		const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
		if (this.loggedIn()) {
			headers['Authorization'] = 'Bearer ' + this.getToken()
		}

		return fetch(`${this.domain}/${url}`, { headers, ...options })
			.then(this.checkStatus)
			.then(response => response.json())
	}

	checkStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return response
		}
	}
}