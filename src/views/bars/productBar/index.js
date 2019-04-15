import React, {Component} from 'react'
import Moment from 'react-moment'
import Material from '../../common/components/Material'
import {Date, Location} from 'src/images/icons'
import {ClipLoader} from 'react-spinners'

class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      galleryModal: false,
      image: '',
      edit: false,
      selectedCountry: 0,
      selectedProvince: 0,
      selectedCity: 0,
      price: '',
    }
  }

  _showGallery = () => {
    const {product} = this.props
    const {pictures_array} = product
    this.setState({...this.state, galleryModal: true, image: pictures_array[0].file})
  }

  _hideGallery = () => {
    this.setState({...this.state, galleryModal: false})
  }

  _setImage(img) {
    this.setState({...this.state, image: img.file})
  }

  _handleEdit = () => {
    this.setState({...this.state, edit: !this.state.edit, price: 'specified'})
  }

  _handleCountry = (e) => {
    const value = e.target.value
    this.setState({...this.state, selectedCountry: value}, () => {
      if (value !== 0) {
        const {getProvinces} = this.props
        getProvinces(value)
      }
    })
  }

  _handleProvince = (e) => {
    const value = e.target.value
    this.setState({...this.state, selectedProvince: value}, () => {
      if (value !== 0) {
        const {getCities} = this.props
        getCities(value)
      }
    })
  }

  _handleCity = (e) => {
    this.setState({...this.state, selectedCity: e.target.value})
  }

  _setPrice(price) {
    this.setState({...this.state, price})
  }

  _firstCategory = (e) => {
    this.setState({...this.state, firstCategory: e.target.value})
  }

  _secondCategory = (e) => {
    this.setState({...this.state, secondCategory: e.target.value})
  }

  _thirdCategory = (e) => {
    this.setState({...this.state, thirdCategory: e.target.value})
  }

  render() {
    const {galleryModal, image, edit, selectedCountry, selectedProvince, price, firstCategory, secondCategory} = this.state
    const {product, country, province, product_owner, product_category, current_user_identity, countries, provinces, cities, categories} = this.props
    const {name, created_time, pictures_array} = product

    return (
        <div className='product-view-sidebar'>
          {
            edit ?
                <div>
                  <div className='product-view-sidebar-name'><input type='text' className='product-view-sidebar-name-edit' defaultValue={name}/></div>

                  <div className='product-view-sidebar-main-img-edit'>
                    <div className='product-view-sidebar-main-img-title'>تصاویر محصول</div>
                    <div className='product-view-sidebar-upload'><input className='product-view-sidebar-upload-input' type='file'/></div>
                    <div className='product-view-sidebar-upload'><input className='product-view-sidebar-upload-input' type='file'/></div>
                    <div className='product-view-sidebar-upload'><input className='product-view-sidebar-upload-input' type='file'/></div>
                    <div className='product-view-sidebar-upload'><input className='product-view-sidebar-upload-input' type='file'/></div>
                    <div className='product-view-sidebar-upload'><input className='product-view-sidebar-upload-input' type='file'/></div>
                    <div className='product-view-sidebar-upload'><input className='product-view-sidebar-upload-input' type='file'/></div>
                  </div>

                  <div className='product-view-sidebar-date-editing'><Date className='product-view-sidebar-svg'/>تاریخ ثبت: <Moment element="span" fromNow ago>{created_time}</Moment> پیش</div>

                  <div className='product-view-sidebar-location-edit'>
                    <div className='product-view-sidebar-main-img-title'>محدوده جغرافیایی</div>
                    <select className='product-view-sidebar-locations' onChange={this._handleCountry}>
                      <option className='product-option' value='0'>کشور</option>
                      {
                        Object.values(countries.list).map((country, index) =>
                            <option className='product-option' key={index} value={country.id}>{country.name}</option>,
                        )
                      }
                    </select>

                    <select className='product-view-sidebar-locations' onChange={this._handleProvince}>
                      <option className='product-option' value='0'>استان</option>
                      {
                        Object.values(provinces.list).map((province, index) => {
                          if (province.province_related_country === parseInt(selectedCountry, 10)) return <option className='product-option' key={index} value={province.id}>{province.name}</option>
                          else return null
                        })
                      }
                    </select>

                    <select className='product-view-sidebar-locations' onChange={this._handleCity}>
                      <option className='product-option' value='0'>شهر</option>
                      {
                        Object.values(cities.list).map((city, index) => {
                          if (city.town_related_province === parseInt(selectedProvince, 10)) return <option className='product-option' key={index} value={city.id}>{city.name}</option>
                          else return null
                        })
                      }
                    </select>

                  </div>

                  <div className='product-view-sidebar-price'>
                    <div className='product-view-sidebar-main-img-title'>قیمت</div>
                    <div className='product-view-sidebar-checkbox-cont' onClick={() => this._setPrice('specified')}>
                      <div className={price === 'specified' ? 'product-view-sidebar-checkbox-selected' : 'product-view-sidebar-checkbox'}/>
                      <div className='product-view-sidebar-checkbox-title'>معین</div>
                    </div>
                    <div className='product-view-sidebar-checkbox-cont' onClick={() => this._setPrice('call')}>
                      <div className={price !== 'specified' ? 'product-view-sidebar-checkbox-selected' : 'product-view-sidebar-checkbox'}/>
                      <div className='product-view-sidebar-checkbox-title'>تماس</div>
                    </div>
                    <div className='product-view-sidebar-price-edit'>
                      <input type='number' className='product-view-sidebar-price-input' placeholder='28,000,000'/>
                      <div className='product-view-sidebar-price-placeholder'>ریال</div>
                    </div>
                  </div>

                  <div className='product-view-sidebar-category-edit'>
                    <div className='product-view-sidebar-main-img-title'>دسته بندی</div>

                    <select className='product-view-sidebar-locations' onChange={this._firstCategory}>
                      <option className='product-option' value='0'>انتخاب</option>
                      {
                        Object.values(categories.list).map((cat, index) => {
                          if (cat.id && !cat.category_parent) return <option className='product-option' key={index} value={cat.id}>{cat.name}</option>
                          else return null
                        })
                      }
                    </select>

                    <select className='product-view-sidebar-locations' onChange={this._secondCategory}>
                      <option className='product-option' value='0'>انتخاب</option>
                      {
                        Object.values(categories.list).map((cat, index) => {
                          if (cat.category_parent === parseInt(firstCategory, 10)) return <option className='product-option' key={index} value={cat.id}>{cat.name}</option>
                          else return null
                        })
                      }
                    </select>

                    <select className='product-view-sidebar-locations' onChange={this._thirdCategory}>
                      <option className='product-option' value='0'>انتخاب</option>
                      {
                        Object.values(categories.list).map((cat, index) => {
                          if (cat.category_parent === parseInt(secondCategory, 10)) return <option className='product-option' key={index} value={cat.id}>{cat.name}</option>
                          else return null
                        })
                      }
                    </select>

                  </div>

                </div>

                :
                <div>
                  <div className='product-view-sidebar-name'>{name}</div>
                  <img className='product-view-sidebar-main-img' style={pictures_array && pictures_array.length > 0 ? {} : {display: 'none'}} src={pictures_array && pictures_array[0] && pictures_array[0].file} alt='' onClick={this._showGallery}/>
                  <div style={pictures_array && pictures_array.length > 1 ? {} : {display: 'none'}} className='product-view-sidebar-images'>
                    {
                      pictures_array && pictures_array.slice(1, 4).map((img, index) => {
                        return <img key={index} className='product-view-sidebar-img' src={img.file} alt='' onClick={this._showGallery}/>
                      })
                    }
                    <div style={pictures_array && pictures_array.length > 4 ? {} : {display: 'none'}} className='product-view-sidebar-more' onClick={this._showGallery}>بیشتر</div>
                  </div>

                  <div className='product-view-sidebar-date'><Date className='product-view-sidebar-svg'/>تاریخ ثبت: <Moment element="span" fromNow ago>{created_time}</Moment> پیش</div>
                  <div className='product-view-sidebar-location'><Location className='product-view-sidebar-svg'/>{country.name}، {province.name}</div>

                  <div className='product-view-sidebar-details'>
                    <span className='product-view-sidebar-details-grey'>قیمت: </span><span className='product-view-sidebar-details-red'>{'2,000,000 ریال'}</span>
                    <br/>
                    <span className='product-view-sidebar-details-grey'>فروشنده: </span><span className='product-view-sidebar-details-blue'>{product_owner && product_owner.first_name ? product_owner.first_name + ' ' + product_owner.last_name : <div style={{verticalAlign: 'top', display: 'inline-block', marginTop: '3px'}}><ClipLoader size={15}/></div>}</span>
                    <br/>
                    <span className='product-view-sidebar-details-grey'>دسته بندی: {product_category && product_category.name ? product_category.name : ''}</span>
                  </div>
                </div>
          }

          {
            current_user_identity === product.product_owner ?
                edit ?
                    <div className='product-view-sidebar-buttons'>
                      <Material className='product-view-sidebar-buy' content='ثبت ویرایش'/>
                      <Material className='product-view-sidebar-share' content='لغو ویرایش' onClick={this._handleEdit}/>
                    </div>
                    :
                    <div className='product-view-sidebar-buttons'>
                      <Material className='product-view-sidebar-buy' content='عرضه'/>
                      <Material className='product-view-sidebar-share' content='ویرایش' onClick={this._handleEdit}/>
                    </div>
                :
                <div className='product-view-sidebar-buttons'>
                  <Material className='product-view-sidebar-buy' content='خرید'/>
                  <Material className='product-view-sidebar-share' content='اشتراک گذاری'/>
                </div>
          }

          <div className={galleryModal ? 'get-data-dark-back' : 'get-data-dark-back-hide'} onClick={this._hideGallery}/>

          <div className={galleryModal ? 'product-view-sidebar-modal' : 'product-view-sidebar-modal-hide'}>
            <img className='product-view-sidebar-modal-main' src={image} alt=''/>
            <div style={pictures_array && pictures_array.length > 1 ? {} : {display: 'none'}} className='product-gallery-cont'>
              {
                pictures_array && pictures_array.map((img, i) =>
                    <img className='product-view-sidebar-modal-imgs' key={i} src={img.file} alt='' onClick={this._setImage.bind(this, img)}/>,
                )
              }
            </div>
          </div>

        </div>
    )
  }
}


export default SideBar