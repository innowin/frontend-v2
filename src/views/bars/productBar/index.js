// @flow
import * as React from 'react'
import {Component} from 'react'
import {Owner, ActBar, Tags, Price, Badges, Gallery} from './rowComponents'
import {badgeData, ownerData, tagsData, galleryData, mainImage} from './data'


type SideBarProps = {
  className?: string,
  visible: boolean,
  visibilityHandler: Function
}
type SideBarState = {}

class SideBar extends Component<SideBarProps, SideBarState> {
  constructor() {
    super()
    this.state = {}
  }

  _callHandler = () => {}

  _requestToAgencyHandler = () => {}

  acts = [
    {title: 'تماس', handler: this._callHandler},
    {title: 'درخواست کارگزاری', handler: this._requestToAgencyHandler}
  ]

  render() {
    const {className, visible, visibilityHandler} = this.props
    return (
        <div className={`${visible ? 'visible' : ''} ${className || ''} product-side-bar`}>
          <Gallery images={galleryData} mainImage={mainImage} galleryModalDisplayHandler={() => {console.log('seeing more')}}/>
          <Owner ownerName={ownerData.name} ownerImg={ownerData.file}/>
          <Badges badges={badgeData}/>
          <Price/>
          <Tags tags={tagsData}/>
          <ActBar acts={this.acts}/>
          <button onClick={visibilityHandler}>l</button>
        </div>
    )
  }
}

export default SideBar