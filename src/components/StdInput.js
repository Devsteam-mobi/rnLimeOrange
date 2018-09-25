import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Animated, TouchableWithoutFeedback } from 'react-native'

import { width, height, font } from 'constants/config'
import images from 'images'

export default class StdInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toTop: new Animated.Value(0),
      finishAnimation: false
    }
  }

  onPressInput = () => {
    const { finishAnimation } = this.state
    Animated.timing(
      this.state.toTop,
      {
        toValue: 1,
        duration: 300,
      }
    ).start();
    setTimeout(() => {
      this.setState({finishAnimation: !finishAnimation}, () => {
        setTimeout(() => {
          this.input && this.input.focus()
        }, 20)
      })
    }, 300)
  }

  onBlurInput = () => {
    const { finishAnimation } = this.state
    Animated.timing(
      this.state.toTop,
      {
        toValue: 0,
        duration: 300,
      }
    ).start();
    this.setState({finishAnimation: !finishAnimation})
  }

  render() {
    const { placeholderUp, placeholder, value, onChangeText, icon, wrapperCustomStyle, heighlighted, onBlur,
      onFocus, autoCapitalize, secureTextEntry, error, readOnly, isButton, onPress, placeholderTextColor, 
      customInputStyle, underLineColor, underlineCustomStyle, animatedLabel, customLabelWrapperStyle, customLabelStyle, label, refName } = this.props
    const InputComp = isButton
      ? TouchableOpacity
      : View
    const { toTop } = this.state
    const bottom = toTop.interpolate({
      inputRange: [0, 1],
      outputRange: [0, width(6)],
    });
    const fontSize = toTop.interpolate({
      inputRange: [0, 1],
      outputRange: [font.medium, font.regular],
    });
    return (
      <View style={[styles.container, wrapperCustomStyle && wrapperCustomStyle, error && styles.containerError, heighlighted && styles.containerActive, animatedLabel && {justifyContent: 'flex-end', flex: 1}]}>
        {
          placeholderUp
            ? placeholder 
              ? <Text style={styles.upperText}>{placeholder}</Text>
              : null
            : null
        }  
        <InputComp 
          onPress={
            isButton 
              ? onPress 
              : null
          } 
          style={styles.iconAndInputWrapper}>
          {
            readOnly
              ? <Text style={[styles.input, customInputStyle && customInputStyle]}>{placeholder || value}</Text>
              : (animatedLabel && (toTop._value || value)) || (!animatedLabel)
                ? <TextInput
                    ref={comp => {
                      if (refName) {
                        refName(comp)
                      } else {
                        this.input = comp
                      }
                    }}
                    underlineColorAndroid="transparent"  
                    placeholder={!placeholderUp
                      ? placeholder
                      : ''
                    }
                    onChangeText={onChangeText}
                    value={value}
                    onBlur={onBlur || this.onBlurInput}
                    onFocus={onFocus}
                    placeholderTextColor={placeholderTextColor || 'black'}
                    autoCapitalize={autoCapitalize}
                    secureTextEntry={secureTextEntry}
                    style={[styles.input, customInputStyle && customInputStyle]} />
                : null
          }
          {
            icon && images[icon]
              ? <View style={styles.iconImageWrapper}>
                  <Image source={images[icon]} style={styles.image} />
                </View>
              : null
          }
        </InputComp>  
        {
          animatedLabel ?
            <Animated.View style={[styles.inputLabelWrapper, value && styles.inputLabelWrapperTop || {bottom: bottom}, customLabelWrapperStyle && customLabelWrapperStyle]}>  
              <TouchableWithoutFeedback onPress={this.onPressInput}>
                <Animated.Text style={[styles.inputLableText, value && styles.inputLableTextTop || {fontSize: fontSize}, customLabelStyle && customLabelStyle]}>
                  {animatedLabel}
                </Animated.Text>
                </TouchableWithoutFeedback> 
            </Animated.View>
            : null

        }
        {
          underLineColor ?
            <View style={[styles.underLine, underLineColor && {backgroundColor: underLineColor}, underlineCustomStyle && underlineCustomStyle]} />
            : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: width(2),
  },
  containerActive: {
    borderBottomColor: '#83C0E4',
  },
  containerError: {
    borderBottomColor: '#CE5759',
  },
  upperText: {
    color: '#D7D7D7',
    fontSize: width(3.6)
  },
  iconAndInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconImageWrapper: {
    height: width(4),
    width: width(4),
    marginHorizontal: width(2),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  input: {
    flex: 1,
    height: width(10),
    fontSize: width(4)
  },
  underLine: {
    marginTop: width(1),
    width: '100%',
    height: 1,
  },
  inputLabelWrapper: {
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    paddingVertical: width(2.8)
  },
  inputLabelWrapperTop: {
    bottom: width(6),
  },
  inputLableText: {
    fontSize: font.medium,
    color: 'black',
  },
  inputLableTextTop: {
    fontSize: font.regular
  },
  inputWrapper: {
    paddingVertical: width(2.6),
    borderBottomWidth: 1,
    borderColor: '#606E80',
  },
})