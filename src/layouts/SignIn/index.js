import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ALert } from 'react-native';
import { connect } from 'react-redux'

import { width, height, font, urlsAndReducersKeys } from 'constants/config'
import { checkNextProps } from 'utils'
import images from 'images'

import StdInput from 'components/StdInput'
import StdBtn from 'components/StdBtn'

import fetchServ from 'actions/fetchServ'
import { setUserData } from 'actions/utils'

@connect(
	state => ({
    userData: state.userData,
    signUp: state.signUp,
    signIn: state.signIn
	}),
  dispatch => ({
    actionSignUp: (data) => {
      dispatch(fetchServ(urlsAndReducersKeys.signUp, data))
    },
    actionSignIn: (data) => {
      dispatch(fetchServ(urlsAndReducersKeys.signIn, data))
    },
    setUserData: (data) => {
      dispatch(setUserData(data))
    }
  })
)
export default class Wellcome extends Component {
  constructor(props) {
    super(props)
    const fields = {
      email: '',
      pswd: ''
    }
    this.state = {
      fields,
      isLoading: false
    }
  }

  setState(state, callback = () => {}){
    return new Promise((resolve, reject) => {
      super.setState(state, () => {
        if (typeof callback != "function") { reject(`${callback} is not a function`)}
        else {resolve(callback())}
      })
    })
  }

  onFieldChange = (fieldName, value) => {
    const newStateFields = this.state.fields
    newStateFields[fieldName] = value
    this.setState({fields: newStateFields})
  }

  componentWillReceiveProps(nextProps) {
    const { navigation, setUserData } = this.props
    const propsCheckerSignUp = checkNextProps(nextProps, this.props, 'signUp')
    if (propsCheckerSignUp == 'error') {
      const error = nextProps.signUp.response.status == 'failed' && nextProps.signUp.response.desc
      this.setState({ isLoading: false });
      error && Alert.alert(error)
    } else if (propsCheckerSignUp && propsCheckerSignUp != 'empty') {
      const data = nextProps.signUp.response.data
      console.log('nextProps.signUp.response.data')
      console.log(data)
      this.setState({
        isLoading: false,
      })
    } else if (propsCheckerSignUp == 'empty') {
      this.setState({ isLoading: false });
    }

    const propsCheckerSignIn = checkNextProps(nextProps, this.props, 'signIn')
    if (propsCheckerSignIn == 'error') {
      const error = nextProps.signIn.response.status == 'failed' && nextProps.signIn.response.desc
      this.setState({ isLoading: false });
      error && Alert.alert(error)
    } else if (propsCheckerSignIn && propsCheckerSignIn != 'empty') {
      const data = nextProps.signIn.response.data
      console.log('nextProps.signIn.response.data')
      console.log(data)
      this.setState({
        isLoading: false,
      })
    } else if (propsCheckerSignIn == 'empty') {
      this.setState({ isLoading: false });
    }

    const propsCheckerUserData = checkNextProps(nextProps, this.props, 'userData', null, true)
    if (propsCheckerUserData) {
      if (nextProps.userData && nextProps.userData.data && nextProps.userData.data.token) {
        const getUserData = nextProps.getUser.response.data
        if (getUserData && getUserData.user && nextProps.userData.data.userModel && Object.keys(nextProps.userData.data.userModel).length) {
          // move next
        } else {
          actionGetUser({ token: nextProps.userData.data.token })
        }
      }
    }
  }

  socialSignIn = (socialKey) => {
    switch(socialKey) {
      case 'facebook':
        return this.doFacebookSignIn()
      case 'google':
        return this.doGoogleSignIn()
    }
  }

  doFacebookSignIn = () => {

  }

  doGoogleSignIn = () => {

  }

  doSignIn = () => {
    const { navigation } = this.props
    const { fields } = this.state
    if (Object.values(fields).every(item => item)) {
      navigation.navigate('DrawerNav')
    } else {
      ALert.alert('Please check form')
    }
  }

  onPressForgotPswd = () => {
    const { navigation } = this.props
    navigation.navigate('ForgotPassword')
  }

  onPressSignUp = () => {
    const { navigation } = this.props
    navigation.navigate('SignUp')
  }

  onPressSignIn = () => {
    const { navigation } = this.props
    navigation.navigate('DrawerNav')
  }

  render() {
    const { navigation } = this.props
    const { fields } = this.state
    const { email, pswd } = fields
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.socialBtnsWrapper}>
            <View style={styles.signInBtnWrapper}>
              <TouchableOpacity onPress={() => this.socialSignIn('facebook')}>
                <View style={styles.signInBtnImageWrapper}>
                  <Image style={styles.signInImage} source={images.facebookBig} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.signInBtnWrapper}>
              <TouchableOpacity onPress={() => this.socialSignIn('google')}>
                <View style={styles.signInBtnImageWrapper}>
                  <Image style={styles.signInImage} source={images.googleBig} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.signInFormWrapper}>
            <View style={styles.formInputWrapper}>
              <StdInput
                value={email}
                placeholder="Email"
                placeholderTextColor="#C0CAD3"
                onTextChange={value => this.onFieldChange('email', value)} />
            </View>
            <View style={styles.formInputWrapper}>
              <StdInput
                value={pswd}
                placeholder="Password"
                placeholderTextColor="#C0CAD3"
                onTextChange={value => this.onFieldChange('pswd', value)} />
            </View>
          </View>
          <View style={styles.btnsWrapper}>
            <View style={styles.forgotPswdWrapper}>
              <TouchableOpacity onPress={this.onPressForgotPswd}>
                <View style={styles.forgotPswdTextWrapper}>
                  <Text style={styles.forgotPswdText}>
                    Forgot passsword
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.submitBtnWrapper}>
              <StdBtn
                onPress={this.onPressSignIn}
                customInnerStyle={styles.btnCustomInnerStyle}
                title="SignIn" />
            </View>
            <View style={styles.signUpWrapper}>
              <TouchableOpacity onPress={this.onPressSignUp}>
                <View style={styles.signUpTextWrapper}>
                  <Text style={styles.signUpPswdText}>
                    SIGN UP
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  socialBtnsWrapper: {
    marginTop: width(20),
    width: width(70),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  signInBtnImageWrapper: {
    height: width(30),
    width: width(30),
    borderRadius: width(30),
    overflow: 'hidden',
    backgroundColor: 'red'
  },
  signInImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    backgroundColor: 'red'
  },
  signInFormWrapper: {
    width: width(70),
    marginTop: width(20)
  },
  formInputWrapper: {
    height: width(13),
    width: '100%',
    borderColor: '#C0CAD3',
    borderWidth: 1,
    paddingHorizontal: width(2),
    paddingVertical: width(0.4)
  },
  btnsWrapper: {

  },
  submitBtnWrapper: {
    marginTop: width(8),
    height: width(12),
    width: width(60)
  },
  forgotPswdWrapper: {
    marginTop: width(2)
  },
  forgotPswdTextWrapper: {
    
  },
  forgotPswdText: {
    fontSize: font.regular,
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
    textDecorationColor: 'blue',
    textAlign: 'center'
  },
  signUpWrapper: {
    marginTop: width(20)
  },
  signUpTextWrapper: {

  },
  signUpPswdText: {
    fontSize: font.big,
    textAlign: 'center'
  },
  btnCustomInnerStyle: {
    borderColor: '#C0CAD3',
    borderWidth: 1,
  }
})