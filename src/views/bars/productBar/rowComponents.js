// @flow
import * as React from 'react'
import Avatar from '../../common/image/avatar'
import type {TagType} from '../../common/tags/tag'
import VisibleOnLoadImage from '../../common/image/visibleOnLoadImage'
import {ChartIcon} from 'src/images/icons'
import {ClipLoader} from 'react-spinners'
// import {Modal, ModalBody} from 'reactstrap'
import {Tag} from '../../common/tags/tag'


type BorderedPaddedWrapperProps = {
  children: React.Node,
  className?: string
}

export const BorderedPaddedWrapper = (props: BorderedPaddedWrapperProps) => {
  const {children, className} = props
  return (
      <div className={`bordered-padded-wrapper ${className || ''}`}>{children}</div>
  )
}

// type OwnerType = {
//   ownerName: string,
//   ownerImg: string
// }


export class Owner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageLoaded: null
    }
  }

  componentDidMount(): void {
    const {ownerImg} = this.props
    let img = new Image()
    img.src = ownerImg
    img.onload = () => {
      this.setState({...this.state, imageLoaded: true})
    }
    img.onerror = () => {
      this.setState({...this.state, imageLoaded: false})
    }
  }

  render() {
    const {ownerName, ownerImg} = this.props
    return (
        <BorderedPaddedWrapper className='owner'>
          {
            this.state.imageLoaded === null ?
                <div style={{padding: '10px 8px 0 8px'}}><ClipLoader color={'#cbcbcb'} size={30}/></div>
                :
                this.state.imageLoaded ?
                    <Avatar raised className="owner-avatar" size="medium" img={ownerImg} name={ownerName}/>
                    :
                    null
          }
          ‍<span>{ownerName}</span>
        </BorderedPaddedWrapper>
    )
  }
}

export type BadgeType = {
  fileUrl: string,
  id: string
}
export type BadgesProps = {
  badges?: Array<BadgeType>
}

export const Badges = (props: BadgesProps) => {
  const {badges = []} = props
  return (
      <BorderedPaddedWrapper className='badges'>
        {badges.map(badge => {
          return (
              <VisibleOnLoadImage
                  className="badge"
                  img={badge.fileUrl}
                  key={`side-bar-badge${badge.id}`}
              />
          )
        })}
      </BorderedPaddedWrapper>
  )
}

type TagsProps = {
  tags?: Array<TagType>
}

export const Tags = (props: TagsProps) => {
  const {tags = []} = props
  return (
      <BorderedPaddedWrapper className="tags">
        {tags.map(tag => <Tag key={`tag${tag.title}`} title={tag.title}/>)}
      </BorderedPaddedWrapper>
  )
}

type PriceProps = {
  price?: string
}

export const Price = (props: PriceProps) => {
  const {price = 'تماس'} = props
  return (
      <BorderedPaddedWrapper className="price">
        <span>قیمت: <span>{` ${price} `}</span></span>
        <ChartIcon className="price-icon"/>
      </BorderedPaddedWrapper>
  )
}

type ActType = {
  title: string,
  handler: Function
}

type ActBarProps = {
  acts: Array<ActType>
}

export const ActBar = (props: ActBarProps) => {
  const {acts = []} = props
  return (
      <BorderedPaddedWrapper className="act-bar">
        {acts.map(act =>
            <span className="act-btn" key={`act-${act.title}`} onClick={act.handler}>{act.title}</span>
        )}
      </BorderedPaddedWrapper>
  )
}

// type GalleryImgType = {
//   id: string,
//   fileUrl: string
// }

// type GalleryProps = {
//   images?: Array<GalleryImgType>,
//   mainImage: string,
//   galleryModalDisplayHandler: Function
// }

export class Gallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mainLoaded: null
    }
  }

  componentDidMount(): void {
    const {mainImage} = this.props
    let main = new Image()
    main.src = mainImage
    main.onload = () => {
      this.setState({...this.state, mainLoaded: true})
    }
    main.onerror = () => {
      this.setState({...this.state, mainLoaded: false})
    }
  }

  render() {
    const {images, mainImage, galleryModalDisplayHandler} = this.props
    const {mainLoaded} = this.state
    if (mainImage && mainLoaded)
      return (
          <div className="gallery-wrapper" style={{paddingBottom: '12px'}}>
            {
              mainImage && mainLoaded && <VisibleOnLoadImage img={mainImage} className="main-image"/>
            }
            <div className="items-wrapper">
              {images.map((img, index) =>
                  <div id={index} key={index} className="gallery-item" onClick={galleryModalDisplayHandler}>
                    <VisibleOnLoadImage className="gallery-image" img={img.fileUrl}/>
                  </div>
              )}
              {!(images.length === 0 && !mainImage) && <div onClick={galleryModalDisplayHandler} className="gallery-item more-btn">بیشتر</div>}
            </div>
          </div>
      )
    if (mainImage && mainLoaded === null)
      return <div className="gallery-wrapper" style={{paddingBottom: '12px'}}><ClipLoader color={'#cbcbcb'} size={60}/></div>
    if (!mainImage || mainLoaded === false)
      return null
  }
}

type GalleryImageType = {
  original: string,
  thumbnail: string
}
type GalleryModalProps = {
  isOpen: boolean,
  images: Array<GalleryImageType>,
  visibilityHandler: Function
}

/*<Modal size="lg" isOpen={isOpen} backdrop={false} className="gallery-modal">*/
/*<ModalBody>*/
/*<FontAwesome name="times" className="close-btn"*/
/*onClick={visibilityHandler}/>*/
/*<ImageGallery items={images}/>*/
/*</ModalBody>*/
/*</Modal>*/

export const GalleryModal = (props: GalleryModalProps) => {
  // const {isOpen, images, visibilityHandler} = props
  return (
      ""
  )
}