import shallowequal from 'shallowequal'

import NavigationIsFocused from './NavigationIsFocused'
export const connectWithNavigationIsFocused = NavigationIsFocused
// var btoa = require('Base64').btoa

export const checkNextProps = (nextProps, props, property, type, withoutProperty) => {
  const nextNavigation = nextProps.navigation || nextProps.screenProps.navigation
  const thisNavigation = props.navigation || props.screenProps.navigation
  if (!nextNavigation.isFocused()) {
    switch (type) {
      case 'once':
        if (thisNavigation.isFocused() && !nextNavigation.isFocused()) return false
      case 'noway':
        if (!thisNavigation.isFocused() && !nextNavigation.isFocused()) return false
      case 'anyway':
        break  
      default:
        return false  
    }
  }
  if (withoutProperty) {
    if (!shallowequal(props[property], nextProps[property])) {
    // if (props[property] != nextProps[property]) {
      if (nextProps[property] && Object.keys(nextProps[property]).length) {
        return true
      } else {
        return 'empty'
      }
    }
  } else {
    if (nextProps[property] && !nextProps[property].isFetching && props[property].isFetching != nextProps[property].isFetching) {
      if (nextProps[property].response && nextProps[property].response.status == 'success') {
        return true  
      } else if (nextProps[property].error || nextProps[property].response.status == 'failed') { 
        return 'error'
      } else {
        return 'empty'
      }
    }
  }
  return false
}

export const queryString = (json) => {
  return Object.keys(json).reduce(function (str, key, i) {
    var delimiter, val;
    delimiter = (i === 0) ? '?' : '&';
    key = encodeURIComponent(key);
    val = json[key];
    return [str, delimiter, key, '=', val].join('');
  }, '');
}

export const filterBlackList = (blackList, params, addParamsList) => {
  let fullList = blackList
  if (addParamsList && addParamsList.length) fullList = [...fullList, ...addParamsList]
  if (!(blackList && blackList.length)) return params
  return params
    ? Object.entries(params)
      .filter(([key]) => !fullList.includes(key))
      .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {})
    : null; 
}

export const filterWhiteList = (whiteList, params, addParamsList) => {
  let fullList = whiteList
  if (addParamsList && addParamsList.length) fullList = [...fullList, ...addParamsList]
  if (!(whiteList && whiteList.length)) return params
  return params
    ? Object.entries(params)
      .filter(([key]) => fullList.includes(key))
      .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {})
    : {}; 
}

export const applyAdapter = (params, type, { adapterKeyParams, adapterValueParams }, whiteListParams, incomming) => {
  if (!params || typeof params != 'object' || !(adapterKeyParams && adapterKeyParams[type])) return params || null
  const data = incomming
    ? Object.assign({}, ...Object.keys(params).map(key => params[key] == 0 || params[key] != '' ? ({[Object.keys(adapterKeyParams[type]).find(adapterParamKey => adapterKeyParams[type][adapterParamKey] == key) || key]: adapterValueParams[type] && adapterValueParams[type][key] && adapterValueParams[type][key](params[key]) || params[key]}) : null))
    : Object.assign({}, ...Object.keys(params).map(key => params[key] == 0 || params[key] != '' ? ({[adapterKeyParams[type][key] || key]: adapterValueParams[type] && adapterValueParams[type][key] && adapterValueParams[type][key](params[key]) || params[key] }) : null))
  if (whiteListParams[type]) return filterWhiteList(whiteListParams[type], data)
  return data
}

export const checkRequiredFieldsNotEmpty = (fieldsObj, requiredList, exceptList = [], addCheckFunctions) => {
  return Object.keys(fieldsObj).every(fieldsObjKey => {
    if (exceptList && exceptList.includes(fieldsObjKey)) return false
    if (addCheckFunctions && !addCheckFunctions.map((addCheckFunction) => addCheckFunction()).every(addCheckFunctionResult => addCheckFunctionResult)) return false
    if (requiredList) return requiredList.includes(fieldsObjKey)
      ? !!fieldsObj[fieldsObjKey]
      : true
    return true
  })
}

export const uniqueID = () => {
  const chr4 = () => {
    return Math.random().toString(16).slice(-4);
  }
  return chr4() + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() + chr4() + chr4();
}

export const getAuthHeader = (token, toBase64=false, type='Bearer') => ({
  Authorization: type + ' ' + (toBase64 ? btoa(token) : token)
})

export const getTextError = (error, textErrors) => {
  if (typeof error == 'string') {
    return error || 'Internal server error'
  } else {
    const errorFound = Object.keys(error).find(errorKey => error[errorKey])
    console.log(errorFound)
    if (errorFound) {
      return textErrors[errorFound]
    }
    return
  }
}

export const initModels = (models, token) => {
  Object.keys(models).forEach(modelKey => {
    models[modelKey]['init'] && models[modelKey]['init'](token)
  })
}

export const fullCleanPhone = (phoneNumber) => {
  if (!phoneNumber) return ''
  return phoneNumber
      .replace(/\s/g, "")
      .replace(/\(/g, "")
      .replace(/\)/g, "")
      .replace(/-/g, "")
      .replace(/\+/g, "")
}

export const cleanPhoneNumb = (phoneNumber) => {
  if (phoneNumber.indexOf('(') != -1 && phoneNumber.indexOf(')') != -1) {
    const phoneNumberArray = phoneNumber.split(' ')
    const countryArr = phoneNumberArray[0].split('(')
    const countryCode = countryArr[1].substring(0, countryArr[1].length - 1)
    return (countryCode + phoneNumberArray[1] + (phoneNumberArray[2] || ''))
      .replace(/ /g, "")
      .replace(/\(/g, "")
      .replace(/\)/g, "")
      .replace(/-/g, "")
  } else {
    return phoneNumber
  }
}

export const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const groupArrauElementsByNumb = (array, numb) => {
  return array.reduce((acc, cur) => {
    const lastElem = acc.length == 0 ? 0 : acc.length - 1
    acc[lastElem] 
      ? acc[lastElem].length < numb
        ? acc[lastElem].push(cur)
        : acc[lastElem + 1] = [cur]
      : acc[lastElem] = [cur]
    return acc
    }, [])
}
