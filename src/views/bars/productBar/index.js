// @flow
import * as React from 'react'
import {Component} from 'react'
import {Owner, ActBar, Tags, Price, Badges, Gallery, GalleryModal} from './rowComponents'
import type {BadgeType} from './rowComponents'
import {ownerData} from './data'
import ScrollLessWrapper from '../../common/wrappers/scrollLesWrapper'
import {bindActionCreators} from "redux"
import {connect} from "react-redux";
import makeProductSelectorById from "../../../redux/selectors/common/product/getProductById";
import {getProductPicturesByProductId} from "src/redux/actions/commonActions/productActions/productPicturesAction"
import {getFile} from "src/redux/actions/commonActions/fileActions"
import makePictureSelectorByProductId from '../../../redux/selectors/common/product/selectProducPicturesByProductId'
import {getBadges} from "../../../redux/actions/commonActions/badgeActions"
import makeBadgeSelectorByParentId from "../../../redux/selectors/common/badge/badgeSelectorByParentId"
import {getPriceByProductId} from "../../../redux/actions/commonActions/productActions/priceActions"
import makeProductLastPriceSelectorByProductId from "../../../redux/selectors/common/product/getProductLastPrice"
import {getObjHashTags} from "../../../redux/actions/commonActions/hashTagActions"
import makeHashTagSelectorByParentId from "../../../redux/selectors/common/hashTags/getObjHashTags"
import type {TagType} from '../../common/tags/tag'
import FontAwesome from "react-fontawesome"


export type FileListObjectType = {
  [string]: FileType
}

type FileType = {
  file: string
}

type ProductType = {
  pictures: Array<string>
}

type ProductPictureType = {
  fileUrl: string,
  id: string
}

type SideBarProps = {
  className?: string,
  visible: boolean,
  visibilityHandler: Function,
  product: ProductType,
  getProductPicturesByProductId: Function,
  productId: string,
  getFile: Function,
  productPictures: Array<ProductPictureType>,
  getBadges: Function,
  badges: Array<BadgeType>,
  getPriceByProductId: Function,
  lastPrice: string,
  getObjHashTags: Function,
  hashTags: Array<TagType>
}
type SideBarState = {
  galleryModalIsOpen: boolean
}

class SideBar extends Component<SideBarProps, SideBarState> {
  constructor() {
    super()
    this.state = {
      galleryModalIsOpen: false
    }
  }

  componentDidMount() {
      const {productId, getProductPicturesByProductId, getBadges, getPriceByProductId, getObjHashTags} = this.props
    getProductPicturesByProductId(productId)
    // this._fileDispatchHandler()
    getBadges(productId, productId)
    getPriceByProductId(productId)
    getObjHashTags(productId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productPictures.length === 0 && this.props.productPictures.length > 0) this._fileDispatchHandler()
  }

  _fileDispatchHandler = () => {
    const {productPictures = {}, getFile} = this.props
    Object.values(productPictures).forEach((picture: any) => {
      getFile(picture.picture_media)
    })
  }

  _setGalleryData = () => {
    const {productPictures} = this.props
    const images = []
    let mainImage = ''
    productPictures.forEach(picture => {
      if (picture.picture_original) mainImage = picture.fileUrl
      else images.push({fileUrl: picture.fileUrl, id: picture.id})
    })
    return {mainImage, images}
  }
  _callHandler = () => {
  }

  _requestToAgencyHandler = () => {
  }

  _galleryModalVisibilityHandler = () => {
    this.setState({...this.state, galleryModalIsOpen: !this.state.galleryModalIsOpen})
  }

  acts = [
    {title: 'تماس', handler: this._callHandler},
    {title: 'درخواست کارگزاری', handler: this._requestToAgencyHandler}
  ]

  render() {
    const {className, visible, visibilityHandler, badges, lastPrice, hashTags} = this.props
    const {mainImage, images} = this._setGalleryData()
    const {galleryModalIsOpen} = this.state
    const modalGalleryImages = images.map(image => ({original: image.fileUrl, thumbnail: image.fileUrl}))
    mainImage && modalGalleryImages.push({original: mainImage, thumbnail: mainImage})
    return (
        <div id="product-side-bar" className={`${visible ? 'visible' : ''} ${className || ''} product-side-bar`}>
          <ScrollLessWrapper points="left">
            <FontAwesome name="times" className="close-btn"
                         onClick={visibilityHandler}/>
            <Gallery
                mainImage={mainImage}
                images={images && images.slice(0, 3)}
                galleryModalDisplayHandler={this._galleryModalVisibilityHandler}
            />
            <div className="info">
              <Owner ownerName={ownerData.name} ownerImg={ownerData.file}/>
              <Badges badges={badges}/>
              <Price price={lastPrice}/>
              <Tags tags={hashTags.slice(0, 3)}/>
              <ActBar acts={this.acts}/>
            </div>
          </ScrollLessWrapper>
          <GalleryModal
              images={modalGalleryImages}
              isOpen={galleryModalIsOpen}
              visibilityHandler={this._galleryModalVisibilityHandler}
          />
        </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const {productId = 0} = props
  const productSelectorById = makeProductSelectorById()
  const badgeSelectorByParentId = makeBadgeSelectorByParentId()
  const productPictureSelectorById = makePictureSelectorByProductId()
  const productLastPriceSelectorByProductId = makeProductLastPriceSelectorByProductId()
  const hashTagSelectorByParentId = makeHashTagSelectorByParentId()
  const productPictures = productPictureSelectorById(state, productId)
  const product = productSelectorById(state, productId)

  return {
    product,
    productPictures,
    hashTags: hashTagSelectorByParentId(state, productId),
    badges: badgeSelectorByParentId(state, productId),
    lastPrice: productLastPriceSelectorByProductId(state, productId, product.product_price_type)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getProductPicturesByProductId,
  getFile,
  getBadges,
  getPriceByProductId,
  getObjHashTags
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(SideBar)