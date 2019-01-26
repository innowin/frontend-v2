import * as React from 'react'
import {Component} from 'react'
import Moment from "react-moment"
import Material from '../../common/components/Material'
import {Date, Location} from '../../../images/icons'

class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      galleryModal: false,
      image: ''
    }
  }

  showGallery = () => {
    const {product} = this.props
    const {pictures_array} = product
    this.setState({...this.state, galleryModal: true, image: pictures_array[0].file})
  }

  hideGallery = () => {
    this.setState({...this.state, galleryModal: false})
  }

  setImage(img) {
    this.setState({...this.state, image: img.file})
  }

  render() {
    const {galleryModal, image} = this.state
    const {product, country, province, product_owner, product_category, current_user_identity} = this.props
    const profile_user = product_owner && product_owner.profile && product_owner.profile.content && product_owner.profile.content.profile_user ? product_owner.profile.content.profile_user : ''
    const owner_name = profile_user ? profile_user.first_name + ' ' + profile_user.last_name : ''
    const {name, created_time, pictures_array} = product

    return (
        <div className='product-view-sidebar'>
          <div className='product-view-sidebar-name'>{name}</div>
          <img className='product-view-sidebar-main-img' style={pictures_array && pictures_array.length > 0 ? {} : {display: 'none'}} src={pictures_array && pictures_array[0] && pictures_array[0].file} alt='' onClick={this.showGallery}/>
          <div style={pictures_array && pictures_array.length > 1 ? {} : {display: 'none'}} className='product-view-sidebar-images'>
            {
              pictures_array && pictures_array.slice(1, 4).map((img, index) => {
                return <img key={index} className='product-view-sidebar-img' src={img.file} alt='' onClick={this.showGallery}/>
              })
            }
            <div style={pictures_array && pictures_array.length > 4 ? {} : {display: 'none'}} className='product-view-sidebar-more' onClick={this.showGallery}>بیشتر</div>
          </div>

          <div className='product-view-sidebar-date'><Date className='product-view-sidebar-svg'/>تاریخ ثبت: <Moment element="span" fromNow ago>{created_time}</Moment> پیش</div>
          <div className='product-view-sidebar-location'><Location className='product-view-sidebar-svg'/>{country.name}، {province.name}</div>

          <div className='product-view-sidebar-details'>
            <span className='product-view-sidebar-details-grey'>قیمت: </span><span className='product-view-sidebar-details-red'>{'2,000,000 ریال'}</span>
            <br/>
            <span className='product-view-sidebar-details-grey'>فروشنده: </span><span className='product-view-sidebar-details-blue'>{owner_name}</span>
            <br/>
            <span className='product-view-sidebar-details-grey'>دسته بندی: {product_category && product_category.name ? product_category.name : ''}</span>
          </div>

          {
            current_user_identity === product.product_owner ?
                <div className='product-view-sidebar-buttons'>
                  <Material className='product-view-sidebar-buy' content='عرضه'/>
                  <Material className='product-view-sidebar-share' content='ویرایش'/>
                </div>
                :
                <div className='product-view-sidebar-buttons'>
                  <Material className='product-view-sidebar-buy' content='خرید'/>
                  <Material className='product-view-sidebar-share' content='اشتراک گذاری'/>
                </div>
          }

          <div className={galleryModal ? 'get-data-dark-back' : 'get-data-dark-back-hide'} onClick={this.hideGallery}/>

          <div className={galleryModal ? 'product-view-sidebar-modal' : 'product-view-sidebar-modal-hide'}>
            <img className='product-view-sidebar-modal-main' src={image} alt=''/>
            <div style={pictures_array && pictures_array.length > 1 ? {} : {display: 'none'}} className='product-gallery-cont'>
              {
                pictures_array && pictures_array.map((img, i) =>
                    <img className='product-view-sidebar-modal-imgs' key={i} src={img.file} alt='' onClick={this.setImage.bind(this, img)}/>
                )
              }
            </div>
          </div>

        </div>
    )
  }
}


export default SideBar