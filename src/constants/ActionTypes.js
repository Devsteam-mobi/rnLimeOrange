import { serverUrls } from 'constants/config'

const requestSubTypes = ['FETCHING', 'ERROR', 'SUCCESS']

const utilsActionTypesArray = ['SET_ERRORS', 'SET_SETTINGS', 'RESET_SETTINGS', 'SET_USERDATA', 'UNSET_USERDATA', 'SET_PUSH_IDS_LOCAL']

const utilsActionTypes = utilsActionTypesArray.reduce((sum, cur) => {
  sum[cur] = cur
  return sum
}, {})

const requestActionTypes = Object.keys(serverUrls).reduce((acc, cur) => {
  const type = cur.toUpperCase()
  requestSubTypes.forEach(requestSubType => {
    const actionType = 'FETCH_' + type + '_' + requestSubType
    acc[actionType] = actionType
  })
  return acc
}, {})

export default {...utilsActionTypes, ...requestActionTypes}
