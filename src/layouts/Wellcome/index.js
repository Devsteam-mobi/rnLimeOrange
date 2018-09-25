import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { connect } from 'react-redux'

import { width, height } from 'constants/config'
import { checkNextProps } from 'utils'
import images from 'images'

@connect(
	state => ({

	}),
  dispatch => ({

  })
)
export default class Wellcome extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.bigLogoImageWrapper}>
            <Image style={styles.bigLogoimage} spurce={images.bigLogo} />
          </View>
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  bigLogoImageWrapper: {
    width: width(80),
    height: width(60)
  },
  bigLogoimage: {
    height: '100%',
    width: '100%'
  }
})