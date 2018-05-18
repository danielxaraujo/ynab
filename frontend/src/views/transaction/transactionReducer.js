import { TRANSACTION_SEARCH } from './transactionActions'

const initialState = { transactions: [] }

export default function (state = initialState, action) {
	switch (action.type) {
		case TRANSACTION_SEARCH:
			return {
				...state,
				transactions: action.payload.data
			};
		default:
			return state;
	}
}