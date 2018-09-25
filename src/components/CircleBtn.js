import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { width, height, overlay } from 'constants/config'
import { images } from 'images'

import StdBtn from 'components/StdBtn'

export default class CircleBtn extends Component {
  render() {
    const { onPress, image, wrapperWidth, customWrapperStyle = {}, bgImageProps = {}, innerSmallerParam = 0 } = this.props
    return ( 
      <StdBtn
        onPress={onPress}  
        image={image}
        customInnerStyle={{
          width: wrapperWidth-(innerSmallerParam),
          height: wrapperWidth-(innerSmallerParam),
          borderRadius: wrapperWidth-(innerSmallerParam),
          overflow: 'hidden',
        }}
        customWrapperStyle={{
          width: wrapperWidth,
          height: wrapperWidth,
          borderRadius: wrapperWidth,
          justifyContent: 'center',
          alignItems: 'center',
          ...customWrapperStyle
        }}/>
    )
  }
}

const styles = StyleSheet.create({

})