import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { width, height } from 'constants/config'
import images from 'images'

export default class BrandBtn extends Component {
  render() {
    const { item, idx, onPressItem, isActive } = this.props
    const { image, key } = item
    return (
      <View style={styles.btnWrapper}>
        <TouchableOpacity onPress={() => onPressItem(item, idx)}>
          <View style={[styles.btnInner, isActive && styles.btnInnerActive]}>
            <View style={styles.btnImageWrapper}>
              <Image style={styles.btnImage} source={images[(isActive ? image + 'Active': image)]} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnWrapper: {
    paddingHorizontal: width(2),
    paddingVertical: width(1)
  },
  btnInner: {
    height: width(6),
    width: width(6)
  },
  btnInnerActive: {

  },
  btnTextWrapper: {

  },
  btnImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  }
});
