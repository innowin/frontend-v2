// @flow
import * as React from 'react'
import {Component} from 'react'
import {Owner, ActBar, Tags, Price, Badges, Gallery} from './rowComponents'
import {badgeData, ownerData, tagsData, galleryData, mainImage} from './data'
import ScrollLessWrapper from '../../common/wrappers/scrollLesWrapper'
import {bindActionCreators} from "redux"
import {connect} from "react-redux";
import makeProductSelectorById from "../../../redux/selectors/common/product/getProductById";
import {getProductPicturesByProductId} from "src/redux/actions/commonActions/productActions/productPicturesAction"
import {getFile} from "src/redux/actions/commonActions/fileActions"
import makePictureSelectorByProductId from '../../../redux/selectors/common/product/selectProducPicturesByProductId'


type ProductType = {
  pictures: Array<string>
}

type ProductPictureType = {

}

type SideBarProps = {
  className?: string,
  visible: boolean,
  visibilityHandler: Function,
  product: ProductType,
  getProductPicturesByProductId: Function,
  productId: string,
  getFile: Function,
  productPictures: ProductPictureType
}
type SideBarState = {}

class SideBar extends Component<SideBarProps, SideBarState> {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    const {productId, getProductPicturesByProductId} = this.props
    getProductPicturesByProductId(productId)
  }

  componentDidUpdate(prevProps) {
    const {productPictures = {}, getFile} = this.props
    console.log(`\n`, productPictures, '\n')
    if (productPictures && !prevProps.productPictures) {
      Object.values(productPictures).forEach(picture => {
        console.log('\n picture is: ', picture)
        // getFile(picture.picture_media)
      })
    }
  }

  _callHandler = () => {
  }

  _requestToAgencyHandler = () => {
  }

  acts = [
    {title: 'تماس', handler: this._callHandler},
    {title: 'درخواست کارگزاری', handler: this._requestToAgencyHandler}
  ]

  render() {
    const {className, visible, visibilityHandler} = this.props
    return (
        <div id="product-side-bar" className={`${visible ? 'visible' : ''} ${className || ''} product-side-bar`}>
          <ScrollLessWrapper points="left">
            <Gallery images={galleryData} mainImage={mainImage} galleryModalDisplayHandler={() => {
              console.log('seeing more')
            }}/>
            <div className="info">
              <Owner ownerName={ownerData.name} ownerImg={ownerData.file}/>
              <Badges badges={badgeData}/>
              <Price/>
              <Tags tags={tagsData}/>
              <ActBar acts={this.acts}/>
              <button onClick={visibilityHandler}>l</button>
            </div>
          </ScrollLessWrapper>
        </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const productSelectorById = makeProductSelectorById()
  const productPictureSelectorById = makePictureSelectorByProductId()
  const {productId = 0} = props
  return {
    product: productSelectorById(state, productId),
    productPictures: productPictureSelectorById(state, productId)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getProductPicturesByProductId,
  getFile
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(SideBar)