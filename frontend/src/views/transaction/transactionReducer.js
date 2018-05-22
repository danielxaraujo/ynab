import { TRANSACTION_SEARCH, TRANSACTION_CREATE, TRANSACTION_RESET } from './transactionActions'

const initialState = { transactions: [], transaction: null }

export default function (state = initialState, action) {
	switch (action.type) {
		case TRANSACTION_SEARCH:
			return {
				...state,
				transactions: action.payload.data
			};
		case TRANSACTION_CREATE:
		case TRANSACTION_RESET:
			return {
				...state,
				transaction: action.payload.data
			};
		default:
			return state;
	}
}