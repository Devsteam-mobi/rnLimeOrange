import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlurView, VibrancyView } from 'react-native-blur';

import { width, height, overlay } from 'constants/config'

export default class Section extends Component {
  render() {
    const { blur, containerCustomStyle, children, coloredOverlayCustomStyle, wrapperCustomStyle, middleLayerCustomStyle, bgColor, borderRadius } = this.props
    return (
      <View style={[styles.wrapper, wrapperCustomStyle && wrapperCustomStyle]}>
        <View style={[styles.middleLayer, blur && styles.middleLayerWithBlur, middleLayerCustomStyle && middleLayerCustomStyle]}>
          {
            blur ?
              <BlurView
                style={[styles.blurView, borderRadius && { borderRadius: borderRadius}]}
                viewRef={blur.ref}
                blurType={blur.type || 'light'}
                blurAmount={blur.amount || 10} />
              : null
          }
          <View style={[styles.coloredOverlay, bgColor && {backgroundColor: bgColor}, coloredOverlayCustomStyle && coloredOverlayCustomStyle, borderRadius && { borderRadius: borderRadius}]}/>
          <View style={[styles.container, containerCustomStyle && containerCustomStyle, borderRadius && { borderRadius: borderRadius}]}>
            {children} 
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {

  },
  middleLayer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleLayerWithBlur: {
    // ...overlay,
    // top: 0,
    // left: 0,
  },
  container: {
    borderRadius: width(2),
    overflow: 'hidden',
    maxHeight: height(90)
  },
  blurView: {
    ...overlay,
    top: 0,
    left: 0
  },
  coloredOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }
});

