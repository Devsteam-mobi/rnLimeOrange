import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { width, height } from 'constants/config'

export default class Sep extends Component {
  render() {
    const { bgColor, customWidth } = this.props
    return ( 
      <View style={[
        styles.sepLine, 
        bgColor && {backgroundColor: bgColor},
        customWidth && { width: customWidth}
      ]}/>
    )
  }
}

const styles = StyleSheet.create({
  sepLine: {
    width: '100%',
    height: 1,
    backgroundColor: 'white'
  }
})