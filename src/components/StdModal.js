import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { BlurView, VibrancyView } from 'react-native-blur';

import { width, height, font, overlay } from 'constants/config'
import images from 'resources/images'

export default class StdModal extends Component {
  renderContent = () => {
    const { onClosePress, show, title, renderContent, titleWrapperCustomStyle, comp, children } = this.props

    if (children) {
      return children
    } else if (comp) {
      if (typeof comp == 'function') {
        return comp()
      } else {
        return comp
      }
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View style={[styles.titleWrapper, titleWrapperCustomStyle && titleWrapperCustomStyle]}>
            <Text style={styles.titleText}>
              {title}
            </Text>
            <View style={styles.closeBtnWrapper}>
              <TouchableOpacity onPress={onClosePress}>
                <View style={styles.closeBtnInner}>
                  <Image source={images.crossIconWhiteBig} style={styles.crossIconImage}/>
                </View>  
              </TouchableOpacity>
            </View>  
          </View> 
          <View style={styles.contentWrapper}>
            {renderContent && renderContent()}
          </View> 
        </View>
      )
    }
  }

  render() {
    const { onClosePress, show, title, renderContent, titleWrapperCustomStyle, comp, children,
      animationType = "slide", wrapperCustomStyle, innerCustomStyle, blur } = this.props
    return (
      <Modal
        animationType={animationType}
        transparent={true}
        visible={show}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        <TouchableWithoutFeedback onPress={onClosePress}>
          <View style={[styles.modalWrapper, blur && { backgroundColor: 'rgba(0,0,0,0.1)' }, wrapperCustomStyle]}>
            <TouchableWithoutFeedback >
              <View style={[styles.middleLayer, blur && styles.modalInnerWithBlur]}>
                {
                  blur ?
                    <BlurView
                      style={styles.blurView}
                      viewRef={blur.ref}
                      blurType={blur.type || 'light'}
                      blurAmount={blur.amount || 10} />
                    : null
                }
                <View style={[styles.modalInner, innerCustomStyle && innerCustomStyle]}>
                  {this.renderContent()} 
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalInner: {
    backgroundColor: 'white',
    borderRadius: width(2),
    overflow: 'hidden',
    maxHeight: height(90)
  },
  titleWrapper: {
    backgroundColor: '#993932',
    paddingVertical: width(3),
    alignItems: 'center',
    justifyContent:'center'
  },
  titleText: {
    color: 'white',
    fontSize: font.big,
    fontWeight: '600'
  },
  closeBtnWrapper: {
    position: 'absolute',
    top: width(2),
    right: width(2)
  },
  closeBtnInner: {
    height: width(7),
    width: width(7)
  },
  crossIconImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  blurView: {
    ...overlay,
    top: 0,
    left: 0
  },
  modalInnerWithBlur: {
    ...overlay,
    top: 0,
    left: 0,
  },
  middleLayer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
