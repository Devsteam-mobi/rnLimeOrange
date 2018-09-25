import types from 'constants/ActionTypes';

export const setSettings = (data) => {
  return {
    type: types.SET_SETTINGS,
    data,
  }
};

export const resetSettings = () => {
  return { type: types.RESET_SETTINGS };
};

export const setUserData = (data) => {
  return {
    type: types.SET_USERDATA,
    data,
  }
};

export const unsetUserData = () => {
  return {
    type: types.UNSET_USERDATA,
  }
};

export const setPushIdsLocal = (data) => {
  return {
    type: types.SET_PUSH_IDS_LOCAL,
    data: data
  };
};
