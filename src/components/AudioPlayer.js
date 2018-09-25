import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Slider from "react-native-slider";
import Sound from 'react-native-sound'
import RNFetchBlob from 'rn-fetch-blob'

import { width, height, font } from 'constants/config'
import images from 'images'

const dirs = RNFetchBlob.fs.dirs

Sound.setCategory('Playback');

const linesAmount = 40

const limitDevideNumb = 2

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

var sound = require('resources/output.mp3')

const parseTime = (s) => {
  s = String(s)
  const c = String(s).indexOf(':') != -1
    ? s.split(':')
    : s.split('.')
  return parseInt(c[0]) * 60 + parseInt(c[1]);
}

const secondsToTime = (s) => {
  let minutes = Math.floor(s/60)
  if (minutes < 10) minutes = '0' + minutes
  let seconds = s - (minutes * 60)
  if (seconds < 10) seconds = '0' + seconds
  return minutes + ':' + seconds
}

const limit = parseTime("59:59");

const getDiff = (start_time, end_time) => {
  var a = parseTime(start_time), 
    b = parseTime(end_time);
  if(b < a) // means its the next day.
     return Math.round((limit - a + b)/60);
  else if(b > a) {
    return secondsToTime(b - a)
  }
  else if(b - a == 0)
     return secondsToTime(0);
  else
     alert("Invalid data");
}

const getPersentageOfTime = (curTime, endTime) => {
  const curTimeSec = parseTime(curTime),
    endTimeSec = parseTime(endTime);
  const getOnePersent = endTimeSec/100
  const getCurPercent = Math.round(curTimeSec / getOnePersent)
  return getCurPercent
}

const linesHeightArray = Array(linesAmount).fill().map((n, idx) => {
  const getRandNumberDifferentFromPrev = () => {
    const getRandomNumber = randomIntFromInterval(1, 3)
    if (this.prevNumb == getRandomNumber) {
      return getRandNumberDifferentFromPrev()
    } else {
      this.prevNumb = getRandomNumber
      return getRandomNumber
    }
  }
  const getRandomNumberForHeight = getRandNumberDifferentFromPrev()
  let lineHeight;
  if (idx < 3) {
    switch(idx + 1) {
      case 1:
        this.prevNumb = 1
        return width(2)
      case 2:
        this.prevNumb = 2
        return width(4)
      case 3:
        this.prevNumb = 3
        return width(6)
    }
  } else if (idx > Array(linesAmount).fill().length - 4) {
    switch(Array(linesAmount).fill().length - idx) {
      case 1:
        this.prevNumb = 1
        return width(2)
      case 2:
        this.prevNumb = 2
        return width(4)
      case 3:
        this.prevNumb = 3
        return width(6)
    }
  } else {
    switch(getRandomNumberForHeight) {
      case 1:
        return width(3)
      case 2:
        return width(4)
        break
      case 3:
        return width(6)
        break
    }
  }
})

export default class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curTime: '00:00',
      allTime: '4:00',
      volume: 1,
      isPlaying: false
    }
  }

  startTimer = async () => {
    const tick = async () => {
      const { playerType, onLimitReach, onEndSound } = this.props
      const { curTime, allTime } = this.state
      const curTimeSec = parseTime(curTime),
        endTimeSec = parseTime(allTime);
      if (curTimeSec < endTimeSec) {
        if (playerType == 'limited' && curTimeSec >= Math.round(endTimeSec / limitDevideNumb)) {
          await this.stopSound()
          onLimitReach && onLimitReach()
        } else {
          await this.setState({curTime: secondsToTime(curTimeSec + 1)})
        }
      } else {
        await this.stopSound()
        onEndSound && onEndSound()
      }
    }
    await tick()
    this.interval = setInterval(async () => {
      console.log('setInterval')
      await tick()
    }, 1000)
  }

  stopSound = async () => {
    clearInterval(this.interval)
    await (new Promise(resolve => {
      this.sound.stop(async () => {
        await this.setState({ isPlaying: false })
        resolve()
      });
    }))
  }

  componentDidMount() {
    const { file } = this.props
    this.loadSound(file)
  }

  loadSound = (file) => {
    this.sound = file && new Sound('output.mp3', Sound.DOCUMENT || dirs && dirs.DocumentDir, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log('duration in seconds: ' + this.sound.getDuration() + 'number of channels: ' + this.sound.getNumberOfChannels());
      this.setState({allTime: secondsToTime(parseTime('0:' + Math.round(this.sound.getDuration())))})
    });
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.file && this.props.file != nextProps.file) {
      this.loadSound(nextProps.file)
    }
  }

  renderAudioLine = () => {
    const { name } = this.props
    const { curTime, allTime } = this.state
    const persentageTime = getPersentageOfTime(curTime, allTime)
    const getIdxForPercentage = Math.round(linesAmount / 100 * persentageTime)
    return linesHeightArray.map((lineHeight, idx) => {
      const heighlighted = idx < getIdxForPercentage
      return <View key={'audioLine_' + (name ? name + '_' : '') + idx} style={[styles.audioLine, {height: lineHeight}, heighlighted ? styles.heighlighted : styles.notHeighlighted]} />
    })
  }


  componentWillUnmount() {
    this.sound.stop(() => {
      // Note: If you want to play a sound after stopping and rewinding it,
      // it is important to call play() in a callback.
      this.sound.play();
      this.sound.release();
    });
  }

  onPressPlay = async () => {
    const { playerType } = this.props
    const { curTime, allTime, isPlaying } = this.state
    const curTimeSec = parseTime(curTime),
      endTimeSec = parseTime(allTime);
    if (!this.blockPlayBtn) {
      if (isPlaying) {
        this.blockPlayBtn = true
        if (curTime == endTimeSec || (playerType == 'limited' && curTimeSec >= Math.round(endTimeSec / limitDevideNumb))) {
          await this.stopSound()
        } else {
          this.interval && clearInterval(this.interval)
          this.sound.pause();
        }
        await this.setState({ isPlaying: false })
        this.blockPlayBtn = false
      } else {
        this.blockPlayBtn = true
        curTimeSec == endTimeSec || (playerType == 'limited' && curTimeSec >= Math.round(endTimeSec / limitDevideNumb)) && this.sound.reset()
        await this.setState({
          isPlaying: true,
          curTime: curTimeSec >= endTimeSec || (playerType == 'limited' && curTimeSec >= Math.round(endTimeSec / limitDevideNumb))
            ? '00:00'
            : curTime
        })
        await this.startTimer()
        this.sound.play();
        this.blockPlayBtn = false
      }
    }
  }

  onPressBack = () => {

  }

  onPressNext = () => {

  }

  setState(state, callback = () => {}){
    return new Promise((resolve, reject) => {
      super.setState(state, () => {
        if (typeof callback != "function") { reject(`${callback} is not a function`)}
        else {resolve(callback())}
      })
    })
  }
  
  render() {
    const { curTime, allTime, volume, isPlaying } = this.state
    const diffTime = getDiff(curTime, allTime)
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.audioLineWrapper}>
            {this.renderAudioLine()}
          </View>
          <View style={styles.countersWrapper}>
            <View style={styles.counterWrapper}>
              <Text style={styles.counterText}>
                {curTime}
              </Text>
            </View>
            <View style={styles.counterWrapper}>
              <Text style={styles.counterText}>
                {diffTime}
              </Text>
            </View>
          </View>
          <View style={styles.controls}>
            <View style={styles.sliderWrapper}>
              <Slider
                value={volume}
                minimumValue={0}
                maximumValue={1}
                step={0.1}
                thumbTintColor={'white'}
                thumbStyle={{borderWidth: 3, borderColor: '#D9D9D9', width: width(5), height: width(5)}}
                minimumTrackTintColor={'#4578EA'}
                onValueChange={value => {
                  this.sound && this.sound.setVolume(value)
                  this.setState({volume: value })
                }}/>
            </View>
            <View style={styles.playControlsWrapper}>
              <TouchableOpacity onPress={this.onPressBack}>
                <View style={styles.smallPlayControlBtnImageWrapper}>
                  <Image style={styles.smallPlayControlBtnImage} source={images.prevMediumWhite}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onPressPlay}>
                <View style={[styles.bigPlayControlBtnImageWrapper, !isPlaying && styles.bigPlayControlBtnImageWrapperInactive]}>
                  <Image style={styles.bigPlayControlBtnImage} source={images.playBigBlue}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onPressNext}>
                <View style={styles.smallPlayControlBtnImageWrapper}>
                  <Image style={styles.smallPlayControlBtnImage} source={images.nextMediumWhite}/>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  wrapper: {
    width: '100%'
  },
  container: {
    width: '100%'
  },
  audioLineWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  audioLine: {
    width: width(1.1),
    borderRadius: width(2)
  },
  heighlighted: {
    backgroundColor: 'rgb(39, 118, 250)',
  },
  notHeighlighted: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  countersWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  counterWrapper: {
    marginTop: width(2)
  },
  counterText: {
    color: 'white',
    fontSize: font.regular
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sliderWrapper: {
    width: width(30)
  },
  playControlsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  smallPlayControlBtnImageWrapper: {
    height: width(6),
    width: width(6)
  },
  smallPlayControlBtnImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  bigPlayControlBtnImageWrapper: {
    height: width(22),
    width: width(22),
    marginTop: width(4)
  },
  bigPlayControlBtnImageWrapperInactive: {
    height: width(21),
    width: width(21),
  },
  bigPlayControlBtnImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  }
});