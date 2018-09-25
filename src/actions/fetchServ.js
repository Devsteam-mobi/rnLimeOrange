import DAO from 'utils/DAO'
import types from 'constants/ActionTypes';
import { adapterKeyParams, adapterValueParams, whiteListParams } from 'constants/config'

import { filterBlackList, filterWhiteList, applyAdapter } from 'utils/index'

export const setErrors = (error = {desc: 'Unknown error'}, type) => {
  return {
    type: types.SET_ERRORS,
    error: {...error, type}
  }
}

const fetchFetching = (type) => {
  return {
    type: types['FETCH_' + type + '_FETCHING'],
  }
}
const fetchError = (error = 'Unknown error', type) => {
  return {
    type: types['FETCH_' + type + '_ERROR'],
    error
  }
}
const fetchSuccess = (response, type) => {
  return {
    type: types['FETCH_' + type + '_SUCCESS'],
    response,
  };
}

export default fetchServ = ({url, method, type}, params) => {
  return dispatch => {
    console.log('req type: ' + type, 'url: ' + url, params)
    dispatch(fetchFetching(type))
    DAO.request({url, method}, applyAdapter(params, type, { adapterKeyParams, adapterValueParams }, whiteListParams))
      .then((response) => {
        console.log('resp type: ' + type, response)
        dispatch(fetchSuccess(response, type))
      })
      .catch((error) => {
        console.log(error);
        dispatch(setErrors(error, type))
        dispatch(fetchError(error, type))
      })
  }
}
