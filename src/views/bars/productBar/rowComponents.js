// @flow
import * as React from 'react'
import Avatar from '../../common/image/avatar'
import VisibleOnLoadImage from '../../common/image/visibleOnLoadImage'
import {Tag} from '../../common/tags/tag'
import type {TagType} from '../../common/tags/tag'
import {ChartIcon} from 'src/images/icons'
import {Modal, ModalBody} from 'reactstrap'
import ImageGallery from 'react-image-gallery'
import FontAwesome from "react-fontawesome"


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

type OwnerType = {
  ownerName: string,
  ownerImg: string
}


export const Owner = (props: OwnerType) => {
  const {ownerName, ownerImg} = props
  return (
      <BorderedPaddedWrapper className='owner'>
        <Avatar raised className="owner-avatar" size="medium" img={ownerImg} name={ownerName}/>
        ‍<span>{ownerName}</span>
      </BorderedPaddedWrapper>
  )
}

type BadgesProps = {
  badges?: Array<string>
}

export const Badges = (props: BadgesProps) => {
  const {badges = []} = props
  return (
      <BorderedPaddedWrapper className='badges'>
        {badges.map(badge => (
            <VisibleOnLoadImage className="badge" img={badge} key={`badge_${badge.slice(badge.length - 16)}`}/>
        ))}
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

type GalleryProps = {
  images?: Array<string>,
  mainImage: string,
  galleryModalDisplayHandler: Function
}

export const Gallery = (props: GalleryProps) => {
  const {images = [], mainImage, galleryModalDisplayHandler} = props
  return (
      <div className="gallery-wrapper">
        <VisibleOnLoadImage img={mainImage} className="main-image"/>
        <div className="items-wrapper">
          {images.map(img =>
              <div key={`gallery-item-${img.slice(img.length - 16)}`} className="gallery-item">
                <VisibleOnLoadImage className="gallery-image" img={img}/>
              </div>
          )}
          {(images.length === 0 && !mainImage)?
              <div className="gallery-item">عکس ندارد</div>
              :
              <div onClick={galleryModalDisplayHandler} className="gallery-item more-btn">بیشتر</div>
          }
        </div>
      </div>
  )
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
export const GalleryModal = (props: GalleryModalProps) => {
  const {isOpen, images, visibilityHandler} = props
  return (
      <Modal size="lg" isOpen={isOpen} backdrop={false} className="gallery-modal">
        <ModalBody>
          <FontAwesome name="times" size="1x" className="close-btn"
                       onClick={visibilityHandler}/>
          <ImageGallery items={images}/>
        </ModalBody>
      </Modal>
  )
}