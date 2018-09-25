import React, { Component, PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ImageBackground, Image } from 'react-native'

import { width, height } from 'constants/config'

export default class StdBtn extends PureComponent {
  render() {
    const { title, heightlighted, onPress, wrapperWidth, disabled, error, bgImage, bgImageProps = {}, icon, image,
      customNotHeightlightedInnerStyle, customHeightlightedInnerStyle, customHeightlightedTitleStyle, customNotHeightlightedTitleStyle,
      customTitleStyle = {}, customWrapperStyle = {}, customInnerStyle = {}, customIconStyle = {}, comp, customImageStyle = {}, 
      bgOverlayColor, iconComp, borderRadius, textWrapperCustomStyle } = this.props
    const InnerComponent = bgImage
      ? ImageBackground
      : View
    return (
      <TouchableOpacity disabled={disabled} style={[
        styles.btnWrapper,
        customWrapperStyle,
          wrapperWidth && {
            width: wrapperWidth
          },
      ]} onPress={onPress}>
        {
          bgOverlayColor ?
            <View style={[
              styles.coloredOverlay, 
              bgOverlayColor && { backgroundColor: bgOverlayColor }, 
              borderRadius && {borderRadius: borderRadius},

            ]} />
            : null
        }
        <InnerComponent {...bgImageProps} source={bgImage} style={[
          styles.btnInner,
          customInnerStyle,
          heightlighted
            ? customHeightlightedInnerStyle
                ? customHeightlightedInnerStyle
                : styles.heightlightedInner
            : customNotHeightlightedInnerStyle
                ? customNotHeightlightedInnerStyle
                : styles.notHeightlightedInner,
          disabled && styles.disabledInner,
          error && styles.errorInner,
          (icon || iconComp) && styles.iconInner,
          borderRadius && {borderRadius: borderRadius},
        ]}>
          {
            image ?
              <Image source={image} style={[styles.image, customImageStyle]} />
              : null
          }
          {
            icon ?
              <View style={[styles.iconWrapper, customIconStyle]}>
                <Image source={icon} style={styles.iconImage} />
              </View>  
              : iconComp
                ? iconComp
                : null
          }  
          {
            title ?
              <View style={[styles.textWrapper, textWrapperCustomStyle]}>
                <Text style={[
                  styles.btnText,
                  (icon || iconComp) && { marginLeft: width(2)},
                  customTitleStyle,
                  heightlighted
                    ? customHeightlightedTitleStyle 
                        ? customHeightlightedTitleStyle
                        : styles.heightlightedText
                    : customNotHeightlightedTitleStyle
                        ? customNotHeightlightedTitleStyle
                        : styles.notHeightlightedText
                  ]} >
                  {title}
                </Text>  
              </View>
            : null
          }
          {
            comp ?
              comp
              : null
          }
        </InnerComponent>
      </TouchableOpacity>  
    );
  }
}

const styles = StyleSheet.create({
  btnWrapper: {
    width: '100%',
    height: '100%'
  },
  btnInner: {
    width: '100%',
    height: '100%',
    borderRadius: width(1.4),
    justifyContent: 'center',
    alignItems: 'center'
  },
  heightlightedInner: {
    backgroundColor: '#3265F6',
  },
  notHeightlightedInner: {

  },
  disabledInner: {
    opacity: 0.4
  },
  errorInner: {
    backgroundColor: '#282C34'
  },
  iconInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heightlightedText: {
    color: 'grey'
  },
  notHeightlightedText: {
    color: 'black'
  },
  btnText: {
    fontSize: width(4.1),
    alignSelf: 'flex-start'
  },
  iconWrapper: {
    height: width(5),
    width: width(5)
  },
  iconImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover'
  },
  coloredOverlay: {
    borderRadius: width(1.4),
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})