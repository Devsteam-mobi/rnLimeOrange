import types from 'constants/ActionTypes';

const _defaultState = { data: {}};

export default function (state = _defaultState, action) {
	switch (action.type) {
		case types.SET_USERDATA:
			return {
				...state,
				data: {
					...state.data, ...action.data,
					userModel: { ...state.data.userModel, ...action.data.userModel },
					// myItemsList: action.data.myItemsList,
					// claimedItemsList: action.data.claimedItemsList,
					// notifications: action.data.notifications
				}
			};
		case types.UNSET_USERDATA:
			return { ...state, data: {} };
		default:
			return state;
	}
}