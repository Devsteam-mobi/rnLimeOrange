import React, { Component } from 'react'
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'

import { isIphoneX } from 'constants/config'

import store, { persistor, addListener, App } from './ReduxStore'

import { setPushIdsLocal } from 'actions/utils'

@connect(state => ({
    state: state.routes,
  }),
  dispatch => ({
    dispatch: dispatch,
  })
)
export default class AppWithNavigationState extends Component {

  render() {
    const { dispatch, state } = this.props
    const WrapperComp = isIphoneX
      ? View
      : View
    return (
      <WrapperComp style={styles.wrapper}>
        <App dispatch={dispatch} state={state}/> 
      </WrapperComp>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white'
  }
})

