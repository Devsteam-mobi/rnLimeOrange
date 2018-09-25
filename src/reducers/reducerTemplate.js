import types from 'constants/ActionTypes';

const _defaultState = { response: '', isFetching: false };

export default (key) => {
	const type = key.toUpperCase()
	return (state = _defaultState, action) => {
		switch (action.type) {
			case types['FETCH_' + type + '_FETCHING']:
				return { ...state, isFetching: true };
			case types['FETCH_' + type + '_ERROR']:
				return { ...state, isFetching: false, response: '' };
			case types['FETCH_' + type + '_SUCCESS']:
				return { ...state, response: action.response, isFetching: false };
			default:
				return state;
		}
	}
}