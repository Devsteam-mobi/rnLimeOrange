import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, FlatList, Image,  Alert } from 'react-native';
import Swiper from 'react-native-swiper'
import { connect } from 'react-redux'

import { width, height, productGeneralCategories, productBrands, urlsAndReducersKeys, font } from 'constants/config'
import { checkNextProps, groupArrauElementsByNumb } from 'utils'
import images from 'images'

import Loading from 'components/Loading'
import NavBar from 'components/NavBar'
import TabBar from 'components/TabBar'

import TopBtnItem from './TopBtnItem'
import BrandBtn from './BrandBtn'
import ProductItem from './ProductItem'
import SearchModal from './SearchModal'

import fetchServ from 'actions/fetchServ'

@connect(
	state => ({
    userData: state.userData,
    producs: state.producsData
	}),
  dispatch => ({
    actionGetProducts: (data) => {
      dispatch(fetchServ(urlsAndReducersKeys.getProducts, data))
    },
  })
)
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeProductGeneralCategory: productGeneralCategories[0].key,
      activeProductBrand: productBrands[0].key,
      products: groupArrauElementsByNumb([1,2,3,4,5,6,7,8,9], 2),
      isLoading: false,
      showSearchModal: false,
      slidesData: [1, 2, 3]
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

  async componentDidMount() {
    const { userData, actionGetProducts } = this.props
    // await this.setState({ isLoading: true })
    // actionGetProducts()
  }

  componentWillReceiveProps(nextProps) {
    const { navigation } = this.props
    const propsCheckerGetProducts = checkNextProps(nextProps, this.props, 'producs')
    if (propsCheckerGetProducts == 'error') {
      const error = nextProps.producs.response.status == 'failed' && nextProps.producs.response.desc
      this.setState({ isLoading: false });
      error && Alert.alert(error)
    } else if (propsCheckerGetProducts && propsCheckerGetProducts != 'empty') {
      const data = nextProps.producs.response.data
      console.log('nextProps.getUsersNewsItems.response.data')
      console.log(data)
      this.setState({
        isLoading: false,
        products: data && data.items && groupArrauElementsByNumb(data.items, 2)
      })
    } else if (propsCheckerGetProducts == 'empty') {
      this.setState({ isLoading: false });
    }
  }

  keyExtractorTopBtns = (item, idx) => 'topbtn_' + item.key + '_' + idx

  renderTopBtnItem = ({ item, idx }) => {
    const { activeProductGeneralCategory } = this.state
    const isActive = activeProductGeneralCategory == item.key
    return <TopBtnItem isActive={isActive} item={item} idx={idx} onPressItem={this.onPressTopBtn} />
  }

  renderBrandBtnItem = ({ item, idx }) => {
    const { activeProductBrand } = this.state
    const isActive = activeProductBrand == item.key
    return <BrandBtn isActive={isActive} item={item} idx={idx} onPressItem={this.onPressBrandBtn} />
  }

  onPressTopBtn = (item, idx) => {
    this.setState({activeProductGeneralCategory: item.key})
  }

  onPressBrandBtn = (item, idx) => {
    this.setState({activeProductBrand: item.key})
  }

  renderSlide = ({item, index}) => {
    return (
      <View style={styles.slideImageWrapper}>
        <Image source={images.sliderExample} style={styles.slideImage} />
      </View>
    )
  }

  keyExtractorSlides = (item, idx) => 'slide_' + item.key + '_' + idx

  keyExtractorProducts = (item, idx) => 'product_' + item.id + '_' + idx

  keyExtractorBrandBtn = (item, idx) => 'brandBtn_' + item.key + '_' + idx

  onPressDrawerTrigger = () => {
    const { navigation } = this.props
    console.log(navigation)
    navigation.toggleDrawer()
  }

  renderProductItem = ({ item, index }) => {
    return (
      <View style={styles.flatListRowWrapper}>
        {
          item && item.map((subItem, idx) => (
            <View key={'item_' + index + '_subItem_' + idx } style={styles.flatListItemWrapper}>
              <ProductItem item={subItem} idx={index + idx} onPressItem={this.onPressProductItem} />
            </View>
          ))
        }
      </View>
    )
  }

  onPressProductItem = (item, idx) => {
    const { navigaton } = this.props
    // navigaton.navigate('Product')
  }

  renderMiddleContent = (activeContentKey) => {
    switch(activeContentKey) {
      case 'new':
        return this.renderSwiperView()
      case 'sale':
        return this.renderSaleView()
      default: 
        return null
    }
  }

  renderSwiperView = () => {
    const { slidesData } = this.state
    return (
      <View style={styles.swiperWrapper}>
        <Swiper
          horizontal={true}
          loop={true}
          showsPagination={true}
          style={styles.swiper}
          activeDotColor="#63C542"
          dotColor="#F6F2EE"
          paginationStyle={{ marginTop: width(2) }}
          showsButtons={false}>
          {
            slidesData && slidesData.map((slideData, idx) => <View key={this.keyExtractorSlides(slideData, idx)} style={styles.slideWrapper}>{this.renderSlide({item: slideData, index: idx})}</View>)
          }
        </Swiper>
      </View>
    )
  }

  renderSaleView = () => {
    return (
      <View style={styles.saleImageBlockWrapper}>
        <View style={styles.saleImageBlockTitleWrapper}>
          <Text style={styles.saleImageBlockTitleText}>
            Here it is title
          </Text>
        </View>
        <View style={styles.saleImageWrapper}>
          <Image style={styles.saleImage} source={images.sliderExample} />
        </View>
        <View style={styles.saleTextWrapper}>
          <Text style={styles.saleText}>  
            Some thext will be here
          </Text>
        </View>
      </View>
    )
  }

  triggerSearchModal = () => {
    const { showSearchModal } = this.state
    this.setState({showSearchModal: !showSearchModal})
  }
  
  onPressSearchOpen = () => {
    this.triggerSearchModal()
  }

  doSearch = (text) => {
    this.triggerSearchModal(
      // make search
    )
  }

  render() {
    const { navigation } = this.props
    const { isLoading, products, activeProductGeneralCategory, showSearchModal } = this.state
    const navBarProps = {
      leftPart: {
        image: 'drawerSmallBlack',
        onPress: this.onPressDrawerTrigger
      },
      centerPart: {
        image: 'logoSmall'
      },
      rightPart: {
        image: 'searchSmallBlack',
        onPress: this.onPressSearchOpen
      }
    }
    return (
      <View style={styles.wrapper}>
        <NavBar {...navBarProps} />
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.topBtnsWrapper}>
            {
              productGeneralCategories ?
                productGeneralCategories.map((productGeneralCategory, idx) => <View key={this.keyExtractorTopBtns(productGeneralCategory, idx)}>{this.renderTopBtnItem({ item: productGeneralCategory, index: idx })}</View>)
                : null
            }
          </View>
          <View style={styles.renderMiddleContent}>
            {this.renderMiddleContent(activeProductGeneralCategory)}
          </View>
          <View style={styles.productBrandsBtns}>
            {
              productBrands ?
                productBrands.map((productBrand, idx) => <View key={this.keyExtractorBrandBtn(productBrand, idx)}>{this.renderBrandBtnItem({ item: productBrand, index: idx })}</View>)
                : null
            }
          </View>
          <View style={styles.flatListWrapper}>
            <FlatList
              ref={comp => this.flatList = comp}
              showsVerticalScrollIndicator={false}
              extraData={this.state}
              data={products}
              keyExtractor={this.keyExtractorProducts}
              renderItem={this.renderProductItem}
              style={styles.flatList}/>
          </View>
        </ScrollView>
        <View style={styles.tabBarWrapper}>
          <TabBar navigation={navigation}/>
        </View>
        <Loading show={isLoading} />
        <SearchModal
          onPressSearch={this.doSearch}
          show={showSearchModal}
          onClosePress={this.triggerSearchModal} />
      </View>
    )
  }
}

// {
//   products ?
//     products.map((product, idx) => <View key={this.keyExtractorProducts(product, idx)}>{this.renderProductItem({ item: product, index: idx })}</View>)
//     : null
// }


// define your styles
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white'
  },
  contentContainerStyle: {
    alignItems: 'center'
  },
  content: {
  },
  topBtnsWrapper: {
    marginTop: width(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  topBtnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  renderMiddleContent: {
    width: '100%'
  },
  productBrandsBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: width(4)
  },
  swiperWrapper: {
    width: width(100),
    height: width(70)
  },
  slideWrapper: {
    width: width(100),
    height: '100%'
  },
  swiper: {
  },
  slideImageWrapper: {
    width: '100%',
    height: '100%'
  },
  slideImage: {
    height: '100%',
    width: '100%'
  },
  flatListWrapper: {
    flex: 1,
    width: '100%',
    paddingHorizontal: width(2)
  },
  flatList: {
    flex: 1,
    paddingBottom: width(2)
  },
  flatListRowWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flatListItemWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  saleImageBlockWrapper: {
    width: '100%'
  },
  saleImageBlockTitleWrapper: {

  },
  saleImageBlockTitleText: {
    fontSize: font.big,
    color: 'black',
    textAlign: 'center'
  },
  saleImageWrapper: {
    width: '100%',
    height: width(60),
    marginTop: width(2)
  },
  saleImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover'
  },
  saleTextWrapper: {
    marginTop: width(2),
    paddingHorizontal: width(2)
  },
  saleText: {
    fontSize: font.regular
  },
  tabBarWrapper: {
    position: 'absolute',
    top: height(95.8),
    left: 0,
    width: width(100),
    height: width(14)
  }
});
