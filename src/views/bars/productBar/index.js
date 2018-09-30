// @flow
import * as React from 'react'
import {Component} from 'react'
import {Owner, ActBar, Tags, Price, Badges, Gallery, GalleryModal} from './rowComponents'
import {badgeData, ownerData, tagsData, galleryData, mainImage} from './data'
import ScrollLessWrapper from '../../common/wrappers/scrollLesWrapper'
import {bindActionCreators} from "redux"
import {connect} from "react-redux";
import makeProductSelectorById from "../../../redux/selectors/common/product/getProductById";
import {getProductPicturesByProductId} from "src/redux/actions/commonActions/productActions/productPicturesAction"
import {getFile} from "src/redux/actions/commonActions/fileActions"
import makePictureSelectorByProductId from '../../../redux/selectors/common/product/selectProducPicturesByProductId'
import makeFileSelectorByIDList from '../../../redux/selectors/common/fileSlectorByIdList'


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
  picture_media: string
}
type ProductPicturesType = {
  [string]: ProductPictureType
}

type SideBarProps = {
  className?: string,
  visible: boolean,
  visibilityHandler: Function,
  product: ProductType,
  getProductPicturesByProductId: Function,
  productId: string,
  getFile: Function,
  productPictures: ProductPicturesType,
  galleryFiles: FileListObjectType
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
    const {productId, getProductPicturesByProductId} = this.props
    getProductPicturesByProductId(productId)
    this._fileDispatchHandler()
  }

  componentDidUpdate(prevProps) {

  }

  _fileDispatchHandler = () => {
    const {productPictures = {}, getFile} = this.props
    Object.values(productPictures).forEach((picture: any) => {
      getFile(picture.picture_media)
    })
  }

  _setGalleryData = () => {
    const {galleryFiles, productPictures} = this.props
    return Object.values(productPictures).reduce((data, picture: any) => {
      const {images = [], mainImage} = data
      if (picture.picture_original) {
        if (!mainImage) {
          return {
            ...data,
            mainImage: galleryFiles[picture.picture_media] ? galleryFiles[picture.picture_media].file : ''
          }
        }
      }
      const newImages = galleryFiles[picture.picture_media] ? [
        ...images,
        galleryFiles[picture.picture_media] ? galleryFiles[picture.picture_media].file : ''
      ] : images
      return {
        ...data,
        images: newImages
      }
    }, {})
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
    const {className, visible, visibilityHandler} = this.props
    const {mainImage, images} = this._setGalleryData()
    const {galleryModalIsOpen} = this.state
    const modalGalleryImages = images? [...images].map(image => ({original: image, thumbnail: image})) : []
    mainImage && modalGalleryImages.push({original: mainImage, thumbnail: mainImage})
    return (
        <div id="product-side-bar" className={`${visible ? 'visible' : ''} ${className || ''} product-side-bar`}>
          <ScrollLessWrapper points="left">
            <Gallery
                mainImage={mainImage}
                images={images && images.slice(0, 3)}
                galleryModalDisplayHandler={this._galleryModalVisibilityHandler}
            />
            <div className="info">
              <Owner ownerName={ownerData.name} ownerImg={ownerData.file}/>
              <Badges badges={badgeData}/>
              <Price/>
              <Tags tags={tagsData}/>
              <ActBar acts={this.acts}/>
              <button onClick={visibilityHandler}>l</button>
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
  const productPictureSelectorById = makePictureSelectorByProductId()
  const productPictures = productPictureSelectorById(state, productId)
  console.log('product pictures from mapStateToProps is : ', productPictures)
  const galleryFilesIdList = Object.values(productPictures).map((picture: any) => picture.picture_media)
  const fileSelectorByIDList = makeFileSelectorByIDList()
  return {
    product: productSelectorById(state, productId),
    productPictures,
    galleryFiles: fileSelectorByIDList(state, galleryFilesIdList)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getProductPicturesByProductId,
  getFile
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(SideBar)