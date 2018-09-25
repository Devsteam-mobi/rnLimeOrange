import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { width, height, font } from 'constants/config'
import images from 'images'

export default class ProductItem extends Component {
  render() {
    const { item, idx, onPressItem } = this.props
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => onPressItem(item, idx)}>
          <View style={styles.content}>
            <View style={styles.imageWrapper}>
              <Image style={styles.image} source={images.exampleBigImage} />
            </View>
            <View style={styles.detailsWrapper}>
              <View style={styles.codeTextWrapper}>
                <Text style={styles.codeText}>
                  LO-1231
                </Text>
              </View>
              <View style={styles.titleTextWrapper}>
                <Text style={styles.titleText}>
                  Be loved skirt
                </Text>
              </View>
              <View style={styles.priceTextWrapper}>
                <Text style={styles.priceText}>
                  499.000
                </Text>
              </View>
              <View style={styles.currencyTextWrapper}>
                <Text style={styles.currencyText}>
                  VND
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageWrapper: {
    height: width(100),
    width: width(40)
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  detailsWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: width(1)
  },
  codeTextWrapper: {
    marginTop: width(0.4)
  },
  codeText: {
    opacity: 0.7,
    fontSize: font.small
  },
  titleTextWrapper: {
    marginTop: width(0.4)
  },
  titleText: {
    fontSize: font.small
  },
  priceTextWrapper: {
    marginTop: width(0.4)
  },
  priceText: {
    fontSize: font.small
  },
  currencyTextWrapper: {
    marginTop: width(0.4)
  },
  currencyText: {
    fontSize: font.small
  }
});

