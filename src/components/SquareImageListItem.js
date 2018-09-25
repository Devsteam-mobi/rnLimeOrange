import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

import { height, width, font } from 'constants/config'

export default class SquareImageListItem extends Component {
  render() {
    const { data, idx, onPress } = this.props
    const { image, title, key } = data
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => onPress(data, idx)}>
          <ImageBackground resizeMode="cover" style={styles.inner}>
            <Text style={styles.titleText}>
              {title}
            </Text>  
          </ImageBackground>  
        </TouchableOpacity>  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: width(1),
    marginHorizontal: width(1)
  },
  inner: {
    width: width(44),
    height: width(44),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'purple',
    borderRadius: width(4),
    overflow: 'hidden'
  },
  titleText: {
    fontSize: font.huge,
    color: 'white',
    textAlign: 'center'
  }
});