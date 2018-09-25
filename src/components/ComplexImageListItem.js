import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';

import { width, height, font } from 'constants/config'
import images from 'resources/images'

export default class ComplexImageListItem extends Component {
  render() {
    const { data, idx, onPressMapButton, onPress, onHeartPress } = this.props
    const { image, status, distance, price, title } = data
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity style={{height: '100%',width: '100%'}} onPress={() => onPress(data, idx)}>  
          <View style={styles.inner}>  
            <ImageBackground  
              source={image && { uri: image }}
              style={styles.imageBackground}>
              <View style={styles.imageInner}>
                <View style={styles.leftPart}>
                  {
                    status
                      ? <View style={styles.statusWrapper}>
                          <View style={[styles.statusInner, status == 'open' ? styles.statusBgGreen : styles.statusBgRed]}>
                            <Text style={styles.statusText}>
                              {
                                status == 'open'
                                  ? 'OPEN NOW'
                                  : 'CLOSED NOW'
                              }
                            </Text>  
                          </View>
                        </View>
                      : null
                  } 
                  <Text style={styles.titleText}>
                    {title}
                  </Text>  
                  <View style={styles.distanceWrapper}>
                    <View style={styles.distanceIconWrapper}>
                      <Image style={styles.distanceIconImage} source={images.geoIconWhite}/>  
                    </View>  
                    <Text style={styles.distanceText}>
                      {distance + 'km away'}
                    </Text>  
                  </View>  
                </View>
                <View style={styles.rightPart}>
                  {
                    onPressMapButton
                      ? <TouchableOpacity onPress={() => onPressMapButton(data, idx)}>
                          <View style={styles.mapButton}>
                            <View style={styles.mapImageWrapper}>
                              <Image style={styles.mapImage} source={images.bookIconGrey}/>
                            </View>  
                          </View>  
                        </TouchableOpacity> 
                      : null
                  }  
                  <View style={styles.priceWrapper}>
                    <View style={styles.priceIconWrapper}>
                      <Image style={styles.priceIconImage} source={images.ticketsIconRed} />
                    </View>  
                    <Text style={styles.priceText}>
                      {'£' + price}
                    </Text>  
                  </View>  
                </View>
                <View style={styles.heartBtnWrapper}>
                  <TouchableOpacity onPress={() => onHeartPress(data, idx)}>
                    <View style={styles.heartBtnInner}>
                      <Image style={styles.heartBtnImage} source={images.heartIconTransparent} />
                    </View>  
                  </TouchableOpacity>  
                </View>  
              </View>   
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: width(3),
    paddingHorizontal: width(2),
    overflow: 'hidden'
  },
  inner: {
    flex: 1,
    borderRadius: width(4),
    overflow: 'hidden'
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange'
  },
  imageInner: {
    flex: 1,
    paddingVertical: width(2),
    paddingHorizontal: width(3),
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    width: '100%',
    height: '100%'
  },
  statusWrapper: {
    width: width(26)
  },
  statusInner: {
    paddingHorizontal: width(1),
    paddingVertical: width(0.3),
    borderRadius: width(4),
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusText: {
    fontSize: font.tiny,
    color: 'white',
  },
  statusBgRed: {
    backgroundColor: '#983933'
  },
  statusBgGreen: {
    backgroundColor: '#548140'
  },
  titleText: {
    fontSize: font.big,
    fontWeight: '600',
    color: 'white',
    marginVertical: width(1)
  },
  distanceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  distanceIconWrapper: {
    height: width(5),
    width: width(5),
  },
  distanceIconImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  distanceText: {
    color: 'white',
    fontSize: font.small,
    marginLeft: width(1)
  },
  rightPart: {
    alignItems: 'flex-end'
  },
  mapButton: {
    height: width(12),
    width: width(12),
    backgroundColor: '#983933',
    borderRadius: width(12),
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapImageWrapper: {
    height: width(6),
    width: width(6),
  },
  mapImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  priceWrapper: {
    paddingHorizontal: width(2),
    paddingVertical: width(1),
    borderRadius: width(2),
    backgroundColor: '#548140',
    marginTop: width(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  priceIconWrapper: {
    height: width(5),
    width: width(6),
  },
  priceIconImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  priceText: {
    fontSize: font.small,
    fontWeight: '500',
    marginLeft: width(1),
    color: 'white'
  },
  heartBtnWrapper: {
    position: 'absolute',
    right: width(3),
    top: width(4),
  },
  heartBtnInner: {
    height: width(10),
    width: width(10),
  },
  heartBtnImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  }
});