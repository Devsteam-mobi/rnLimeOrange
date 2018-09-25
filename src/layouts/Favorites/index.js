import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { connect } from 'react-redux'

import { width, height } from 'constants/config'
import { checkNextProps } from 'utils'

import NavBar from 'components/NavBar'

@connect(
	state => ({

	}),
  dispatch => ({

  })
)
export default class Favourites extends Component {
  onPressGoBack = () => {
    const { navigation, screenProps } = this.props
    screenProps.navigation.goBack()
  }

  render() {
    const navBarProps = {
      leftPart: {
        text: 'Back',
        onPress: this.onPressGoBack
      },
    }
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <NavBar {...navBarProps} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
  },
})