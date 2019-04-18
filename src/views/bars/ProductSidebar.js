import React, {Component} from 'react'
import Moment from 'react-moment'
import Material from '../common/components/Material'
import {Date, Location} from 'src/images/icons'
import {ClipLoader} from 'react-spinners'
import {bindActionCreators} from 'redux'
import productActions from '../../redux/actions/commonActions/productActions/productActions'
import {connect} from 'react-redux'

class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      galleryModal: false,
      image: '',
      edit: false,
      price: '',

      selectedCountry: null,
      selectedProvince: null,
      selectedCity: null,
      firstCategory: null,
      secondCategory: null,
      thirdCategory: null,
      newName: '',
      newPrice: '',
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

  showEdit = () => {
    const {product} = this.props
    this.setState({
      ...this.state,
      edit: true,
      price: 'specified',
      newName: product.name.trim(),
      selectedCountry: product.product_related_country,
      selectedProvince: product.product_related_province,
      selectedCity: product.product_related_town,
    })
  }

  hideEdit = () => {
    this.setState({...this.state, edit: false})
  }

  _handleCountry = (e) => {
    const value = parseInt(e.target.value, 10)
    this.setState({...this.state, selectedCountry: value === 0 ? null : value}, () => {
      if (value !== 0) {
        const {getProvinces} = this.props
        getProvinces(value)
      }
      else this.setState({...this.state, selectedProvince: null, selectedCity: null})
    })
  }

  _handleProvince = (e) => {
    const value = parseInt(e.target.value, 10)
    this.setState({...this.state, selectedProvince: value === 0 ? null : value}, () => {
      if (value !== 0) {
        const {getCities} = this.props
        getCities(value)
      }
      else this.setState({...this.state, selectedCity: null})
    })
  }

  _handleCity = (e) => {
    const value = parseInt(e.target.value, 10)
    this.setState({...this.state, selectedCity: value === 0 ? null : value})
  }

  _setPrice(price) {
    this.setState({...this.state, price})
  }

  _firstCategory = (e) => {
    const value = parseInt(e.target.value, 10)
    this.setState({...this.state, firstCategory: value === 0 ? null : value}, () => {
      if (value === 0)
        this.setState({...this.state, secondCategory: null, thirdCategory: null})
    })
  }

  _secondCategory = (e) => {
    const value = parseInt(e.target.value, 10)
    this.setState({...this.state, secondCategory: value === 0 ? null : value}, () => {
      if (value === 0)
        this.setState({...this.state, thirdCategory: null})
    })
  }

  _thirdCategory = (e) => {
    const value = parseInt(e.target.value, 10)
    this.setState({...this.state, thirdCategory: value === 0 ? null : value})
  }

  updateName = (e) => {
    this.setState({...this.state, newName: e.target.value})
  }

  updatePrice = (e) => {
    this.setState({...this.state, newPrice: e.target.value})
  }

  submitUpdate = () => {
    const {product, actions} = this.props
    const {newName, newPrice, selectedCountry, selectedProvince, selectedCity, firstCategory, secondCategory, thirdCategory} = this.state
    const product_category = thirdCategory && secondCategory && firstCategory ? thirdCategory : secondCategory && firstCategory ? secondCategory : firstCategory
    const {updateProduct} = actions
    updateProduct({
      formValues:
          {
            name: newName.trim(),
            product_related_country: selectedCountry,
            product_related_province: selectedCountry ? selectedProvince : null,
            product_related_town: selectedProvince ? selectedCity : null,
            product_category,
          }
      , productId: product.id,
    })
    this.hideEdit()
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
                  <div className='product-view-sidebar-name'><input type='text' className='product-view-sidebar-name-edit' defaultValue={name} onChange={this.updateName}/></div>

                  <div className='product-view-sidebar-main-img-edit'>
                    <div className='product-view-sidebar-main-img-title'>تصاویر محصول</div>
                    <div className='product-view-sidebar-upload'>
                      <img src={pictures_array && pictures_array[0] ? pictures_array[0].file : ''} alt='' className='product-view-sidebar-upload-pre' />
                      <input className='product-view-sidebar-upload-input' type='file'/>
                    </div>
                    <div className='product-view-sidebar-upload'>
                      <img src={pictures_array && pictures_array[1] ? pictures_array[1].file : ''} alt='' className='product-view-sidebar-upload-pre' />
                      <input className='product-view-sidebar-upload-input' type='file'/>
                    </div>
                    <div className='product-view-sidebar-upload'>
                      <img src={pictures_array && pictures_array[2] ? pictures_array[2].file : ''} alt='' className='product-view-sidebar-upload-pre' />
                      <input className='product-view-sidebar-upload-input' type='file'/>
                    </div>
                    <div className='product-view-sidebar-upload'>
                      <img src={pictures_array && pictures_array[3] ? pictures_array[3].file : ''} alt='' className='product-view-sidebar-upload-pre' />
                      <input className='product-view-sidebar-upload-input' type='file'/>
                    </div>
                    <div className='product-view-sidebar-upload'>
                      <img src={pictures_array && pictures_array[4] ? pictures_array[4].file : ''} alt='' className='product-view-sidebar-upload-pre' />
                      <input className='product-view-sidebar-upload-input' type='file'/>
                    </div>
                    <div className='product-view-sidebar-upload'>
                      <img src={pictures_array && pictures_array[5] ? pictures_array[5].file : ''} alt='' className='product-view-sidebar-upload-pre' />
                      <input className='product-view-sidebar-upload-input' type='file'/>
                    </div>
                  </div>

                  <div className='product-view-sidebar-date-editing'><Date className='product-view-sidebar-svg'/>تاریخ ثبت: <Moment element="span" fromNow ago>{created_time}</Moment> پیش</div>

                  <div className='product-view-sidebar-location-edit'>
                    <div className='product-view-sidebar-main-img-title'>محدوده جغرافیایی</div>
                    <select className='product-view-sidebar-locations' onChange={this._handleCountry}>
                      <option className='product-option' value={0}>کشور</option>
                      {
                        Object.values(countries.list).map((country, index) => {
                              if (product.product_related_country === country.id) {
                                return <option className='product-option' key={index} value={country.id} selected>{country.name}</option>
                              }
                              else return <option className='product-option' key={index} value={country.id}>{country.name}</option>
                            },
                        )
                      }
                    </select>

                    <select className='product-view-sidebar-locations' onChange={this._handleProvince}>
                      <option className='product-option' value={0}>استان</option>
                      {
                        Object.values(provinces.list).map((province, index) => {
                          if (selectedCountry && province.province_related_country === parseInt(selectedCountry, 10)) {
                            if (product.product_related_province === province.id) {
                              return <option className='product-option' key={index} value={province.id} selected>{province.name}</option>
                            }
                            else return <option className='product-option' key={index} value={province.id}>{province.name}</option>
                          }
                          else return null
                        })
                      }
                    </select>

                    <select className='product-view-sidebar-locations' onChange={this._handleCity}>
                      <option className='product-option' value={0}>شهر</option>
                      {
                        Object.values(cities.list).map((city, index) => {
                          if (selectedProvince && city.town_related_province === parseInt(selectedProvince, 10)) {
                            if (product.product_related_town === city.id) {
                              return <option className='product-option' key={index} value={city.id} selected>{city.name}</option>
                            }
                            else return <option className='product-option' key={index} value={city.id}>{city.name}</option>
                          }
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
                    <div className={price !== 'specified' ? 'product-view-sidebar-price-edit-hide' : 'product-view-sidebar-price-edit'}>
                      <input type='number' className='product-view-sidebar-price-input' placeholder='28,000,000' onChange={this.updatePrice}/>
                      <div className='product-view-sidebar-price-placeholder'>ریال</div>
                    </div>
                  </div>

                  <div className='product-view-sidebar-category-edit'>
                    <div className='product-view-sidebar-main-img-title'>دسته بندی</div>

                    <select className='product-view-sidebar-locations' onChange={this._firstCategory}>
                      <option className='product-option' value={0}>انتخاب</option>
                      {
                        Object.values(categories.list).map((cat, index) => {
                          if (cat.id && !cat.category_parent) return <option className='product-option' key={index} value={cat.id}>{cat.name}</option>
                          else return null
                        })
                      }
                    </select>

                    <select className='product-view-sidebar-locations' onChange={this._secondCategory}>
                      <option className='product-option' value={0}>انتخاب</option>
                      {
                        Object.values(categories.list).map((cat, index) => {
                          if (firstCategory && cat.category_parent === parseInt(firstCategory, 10)) return <option className='product-option' key={index} value={cat.id}>{cat.name}</option>
                          else return null
                        })
                      }
                    </select>

                    <select className='product-view-sidebar-locations' onChange={this._thirdCategory}>
                      <option className='product-option' value={0}>انتخاب</option>
                      {
                        Object.values(categories.list).map((cat, index) => {
                          if (secondCategory && cat.category_parent === parseInt(secondCategory, 10)) return <option className='product-option' key={index} value={cat.id}>{cat.name}</option>
                          else return null
                        })
                      }
                    </select>

                  </div>

                  <div className='product-view-sidebar-buttons'>
                    <Material className='product-view-sidebar-buy' content='ثبت ویرایش' onClick={this.submitUpdate}/>
                    <Material className='product-view-sidebar-share' content='لغو ویرایش' onClick={this.hideEdit}/>
                  </div>

                </div>

                :

                <div>
                  <div className='product-view-sidebar-name'>{name}</div>
                  <div className='product-view-sidebar-main-img-cont'>
                    <img className='product-view-sidebar-main-img' style={pictures_array && pictures_array.length > 0 ? {} : {display: 'none'}} src={pictures_array && pictures_array[0] ? pictures_array[0].file : ''} alt='' onClick={this._showGallery}/>
                  </div>
                  <div style={pictures_array && pictures_array.length > 1 ? {} : {display: 'none'}} className='product-view-sidebar-images'>
                    {
                      pictures_array && pictures_array.slice(1, 4).map((img, index) => {
                        return <div key={index} className='product-view-sidebar-img-cont' onClick={this._showGallery}><img className='product-view-sidebar-img' src={img.file} alt=''/></div>
                      })
                    }
                    <div style={{display: pictures_array && pictures_array.length > 4 ? 'inline-flex' : 'none'}} className='product-view-sidebar-more' onClick={this._showGallery}>بیشتر</div>
                  </div>

                  <div className='product-view-sidebar-date'><Date className='product-view-sidebar-svg'/>تاریخ ثبت: <Moment element="span" fromNow ago>{created_time}</Moment> پیش</div>
                  {
                    country && country.name && province && province.name && <div className='product-view-sidebar-location'><Location className='product-view-sidebar-svg'/>{country.name}، {province.name}</div>
                  }
                  <div className='product-view-sidebar-details'>
                    <span className='product-view-sidebar-details-grey'>قیمت: </span><span className='product-view-sidebar-details-red'>{'2,000,000 ریال'}</span>
                    <br/>
                    <span className='product-view-sidebar-details-grey'>فروشنده: </span>
                    <span className='product-view-sidebar-details-blue'>
                      {
                        product_owner && product_owner.nike_name ? product_owner.nike_name : product_owner && product_owner.first_name ? product_owner.first_name : <div style={{verticalAlign: 'top', display: 'inline-block', marginTop: '3px'}}><ClipLoader size={15}/></div>
                      }
                    </span>
                    <br/>
                    {
                      product_category && <span className='product-view-sidebar-details-grey'>دسته بندی: {product_category.name ? product_category.name : ''}</span>
                    }
                  </div>
                  {
                    current_user_identity !== product_owner.id ?
                        <div className='product-view-sidebar-buttons'>
                          <Material className='product-view-sidebar-buy' content='خرید'/>
                          <Material className='product-view-sidebar-share' content='اشتراک گذاری'/>
                        </div>
                        :
                        <div className='product-view-sidebar-buttons'>
                          <Material className='product-view-sidebar-buy' content='عرضه'/>
                          <Material className='product-view-sidebar-share' content='ویرایش' onClick={this.showEdit}/>
                        </div>
                  }

                </div>
          }

          <div className={galleryModal ? 'get-data-dark-back' : 'get-data-dark-back-hide'} onClick={this._hideGallery}/>

          <div className={galleryModal ? 'product-view-sidebar-modal' : 'product-view-sidebar-modal-hide'}>
            <img className='product-view-sidebar-modal-main' src={image} alt=''/>
            <div style={pictures_array && pictures_array.length > 1 ? {} : {display: 'none'}} className='product-gallery-cont'>
              {
                pictures_array && pictures_array.map((img, i) =>
                    <div key={i} className='product-view-sidebar-modal-imgs-cont' onClick={this._setImage.bind(this, img)}><img className='product-view-sidebar-modal-imgs' src={img.file} alt=''/></div>,
                )
              }
            </div>
          </div>

        </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateProduct: productActions.updateProduct,
  }, dispatch),
})
export default connect(null, mapDispatchToProps)(SideBar)