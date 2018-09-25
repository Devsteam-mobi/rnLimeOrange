import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

import { width, height, font } from 'constants/config'

export default class SimpleImageListItem extends Component {
  render() {
    const { data, idx, onPress } = this.props
    const { image, title } = data
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity style={{height: '100%', width: '100%'}} onPress={() => onPress(data, idx)}>
          <View style={styles.inner}>  
            <ImageBackground  
              source={image && { uri: image }}
              style={styles.imageBackground}>
              <Text style={styles.titleText}>
                {title}
              </Text>  
            </ImageBackground>  
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: width(90),
    width: '100%',
    marginBottom: width(3),
  },
  inner: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  },
  titleText: {
    fontSize: font.huge,
    color: 'white'
  }
});