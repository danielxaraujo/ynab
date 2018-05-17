import { ACCOUNT_SEARCH, ACCOUNT_UPDATE, ACCOUNT_CREATE, ACCOUNT_HANDLER, ACCOUNT_SELECT, ACCOUNT_NEW } from './accountActions'

const initialState = { accounts: [], account: { budget: false} }

export default function (state = initialState, action) {
	switch (action.type) {
		case ACCOUNT_SEARCH:
			return {
				...state,
				accounts: action.payload.data
			};
		case ACCOUNT_UPDATE:
			return {
				...state,
				account: action.payload.data
			};
		case ACCOUNT_CREATE:
			return {
				...state,
				account: action.payload.data
			};
		case ACCOUNT_SELECT:
			return {
				...state,
				account: action.payload
			};
		case ACCOUNT_NEW:
			return {
				...state,
				account: action.payload
			};
		case ACCOUNT_HANDLER:
			state.account.nome = action.payload.data
			return {
				...state,
				account: state.account
			};
		default:
			return state;
	}
}