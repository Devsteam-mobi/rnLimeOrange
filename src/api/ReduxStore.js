import {createStore, applyMiddleware} from 'redux'
import {connect} from 'react-redux'
import {persistStore, autoRehydrate} from 'redux-persist'
import thunk from 'redux-thunk'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import rootReducer from 'reducers/index'
import * as types from 'constants/ActionTypes'
import navigation from 'navigation'

export const navMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.routes,
);

export const App = reduxifyNavigator(navigation, "root");

const middlewares = [thunk]

export default store = composeWithDevTools(
    applyMiddleware(...middlewares),
)(createStore)(rootReducer)

export const persistor = persistStore(store)