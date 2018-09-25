import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { width, height } from 'constants/config'

import StdBtn from 'components/StdBtn'

export default class SquareBtn extends Component {
  render() {
    const { onPress, image, customWrapperStyle = {}, bgImageProps = {}, comp } = this.props
    return ( 
      <StdBtn
        onPress={onPress}  
        bgImage={image}
        comp={comp}
        bgImageProps={{
          resizeMode: 'cover',
          resizeMNethod: 'scale',
          ...bgImageProps
        }}
        customWrapperStyle={{
          borderRadius: width(2),
          ...customWrapperStyle
        }}/>
    )
  }
}

const styles = StyleSheet.create({

})