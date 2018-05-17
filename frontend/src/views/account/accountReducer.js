import { ACCOUNT_SEARCH, ACCOUNT_UPDATE, ACCOUNT_CREATE, ACCOUNT_HANDLER } from './accountActions'

const initialState = { accounts: [], accountSelected: null }

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
				accountSelected: action.payload.data
			};
		case ACCOUNT_CREATE:
			return {
				...state,
				accountSelected: action.payload.data
			};
		case ACCOUNT_HANDLER:
			state.accountSelected.nome = action.payload.data
			return {
				...state,
				accountSelected: state.accountSelected
			};
		default:
			return state;
	}
}