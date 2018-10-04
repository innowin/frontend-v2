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
import {getBadges} from "../../../redux/actions/commonActions/badgeActions"
import {normalizer, objNormalizer, testNormalizer, normalizerByWhile} from "../../../consts/helperFunctions/normalizer"

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
  galleryFiles: FileListObjectType,
  getBadges: Function
}
type SideBarState = {
  galleryModalIsOpen: boolean
}

// ---------------------------

const arr = [
  {
    id: 1,
    name: 'ali',
    profile: {
      id: 'p1',
      family: 'some family'
    },
    org: {
      id: 'org1',
      title: 'some org',
      office: {
        id: 'office1',
        address: 'some address',
        door: {
          id: 'door1',
          type: 'wood'
        }
      }
    }
  },
  {
    id: 2,
    name: 'mohsen',
    profile: {
      id: 'p2',
      family: 'some family2'
    },
    org: {
      id: 'org2',
      title: 'some org2',
      office: {
        id: 'office2',
        address: 'some address2',
        door: {
          id: 'door2',
          type: 'wood2'
        }
      }
    }
  }
]
const obj = {
  id: 1,
  name: 'ali',
  // profile: {
  //   id: 'p1',
  //   family: 'some family'
  // },
  // org: {
  //   id: 'org1',
  //   title: 'some org',
  //   office: {
  //     id: 'office1',
  //     address: 'some address',
  //     door: {
  //       id: 'door1',
  //       type: 'wood'
  //     }
  //   }
  // }
}



// const objNormalizer2 = (obj) => {
//   const nestKeys = Object.keys(obj).filter(key => typeof obj[key] === "object")
//   const flatKeys = Object.keys(obj).filter(key => typeof obj[key] !== "object")
//   const data = flatKeys.reduce((res, key) => {
//     return {...res, [key]: obj[key]}
//   }, {})
//   const otherData = nestKeys.reduce((res, key) => {
//     const subObj = obj[key]
//     data[key] = subObj.id
//     const withNestValueKeys = Object.keys(subObj).filter(theKey => typeof subObj[theKey] === "object")
//     if (withNestValueKeys.length > 0) {
//       return {...res, [key]: objNormalizer(obj[key])}
//     }
//     else return {...res, [key]: obj[key]}
//   }, {})
//   return {data, otherData}
// }



// ---------------------------


class SideBar extends Component<SideBarProps, SideBarState> {
  constructor() {
    super()
    this.state = {
      galleryModalIsOpen: false
    }
  }

  componentDidMount() {
    const {productId, getProductPicturesByProductId, getBadges} = this.props
    getProductPicturesByProductId(productId)
    this._fileDispatchHandler()
    getBadges(productId, productId)
    // console.log('---------------------------------- views normalizerByWhile', normalizerByWhile(obj))
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
  getFile,
  getBadges
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(SideBar)