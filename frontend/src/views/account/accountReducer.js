import { ACCOUNT_SEARCH, ACCOUNT_CREATE, ACCOUNT_UPDATE, ACCOUNT_DELETE, ACCOUNT_HANDLER, ACCOUNT_SELECT, ACCOUNT_RESET } from './accountActions'

const initialState = { accounts: [], account: { budget: false } }

export default function (state = initialState, action) {
	switch (action.type) {
		case ACCOUNT_SEARCH:
			return {
				...state,
				accounts: action.payload.data
			};
		case ACCOUNT_CREATE:
		case ACCOUNT_UPDATE:
		case ACCOUNT_DELETE:
		case ACCOUNT_SELECT:
			return {
				...state,
				account: action.payload.data
			};
		case ACCOUNT_HANDLER:
			return {
				...state,
				account: {
					...state.account,
					[action.payload.name]: action.payload.value
				}
			};
		case ACCOUNT_RESET:
			return {
				...state,
				account: initialState.account
			}
		default:
			return state;
	}
}