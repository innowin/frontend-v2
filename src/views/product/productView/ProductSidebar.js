import React, {PureComponent} from 'react'
import Moment from 'react-moment'
import Material from '../../common/components/Material'
import {Date, Location} from 'src/images/icons'
import {ClipLoader} from 'react-spinners'
import {bindActionCreators} from 'redux'
import productActions from 'src/redux/actions/commonActions/productActions'
import {connect} from 'react-redux'
import types from 'src/redux/actions/types'
import {createFileFunc} from '../../common/Functions'
import constants from 'src/consts/constants'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import {Link} from 'react-router-dom'
import {getCountries, getProvinces, getCities} from '../../../redux/actions/commonActions/location'

class SideBar extends PureComponent {
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

      error: false,
      deleteArr: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.edit) {
      const {temp} = nextProps
      let error = false

      if (temp[this.state['image1']] && !temp[this.state['image1']].uploadedFileId) {
        error = true
      }
      else if (temp[this.state['image2']] && !temp[this.state['image2']].uploadedFileId) {
        error = true
      }
      else if (temp[this.state['image3']] && !temp[this.state['image3']].uploadedFileId) {
        error = true
      }
      else if (temp[this.state['image4']] && !temp[this.state['image4']].uploadedFileId) {
        error = true
      }
      else if (temp[this.state['image5']] && !temp[this.state['image5']].uploadedFileId) {
        error = true
      }
      else if (temp[this.state['image6']] && !temp[this.state['image6']].uploadedFileId) {
        error = true
      }
      this.setState({...this.state, error})
    }
  }

  _showGallery = () => {
    const {product} = this.props
    const pictures_array = product.product_media ? product.product_media.filter(p => p.type === 'image') : []
    this.setState({...this.state, galleryModal: true, image: pictures_array[0].file})
  }

  _hideGallery = () => {
    this.setState({...this.state, galleryModal: false})
  }

  _setImage(img) {
    this.setState({...this.state, image: img.file})
  }

  showEdit = () => {
    const {product, actions} = this.props
    const {getCountries, getProvinces, getCities} = actions
    this.setState({
      ...this.state,
      edit: true,
      price: product.product_price_type,
      newName: product.name.trim(),
      selectedCountry: product.product_related_country,
      selectedProvince: product.product_related_province,
      selectedCity: product.product_related_town,
      deleteArr: [],
    }, () => {
      getCountries()
      product.product_related_country && getProvinces(product.product_related_country)
      product.product_related_province && getCities(product.product_related_province)
    })
  }

  delete = () => {
    const {product_owner, product, actions} = this.props
    actions.deleteProduct({productId: product.id, productOwnerId: product_owner.id})
  }

  hideEdit = () => {
    this.setState({...this.state, edit: false})
  }

  _handleCountry = (e) => {
    const value = parseInt(e.target.value, 10)
    this.setState({...this.state, selectedCountry: value === 0 ? null : value}, () => {
      if (value !== 0) {
        const {actions} = this.props
        actions.getProvinces(value)
      }
      else this.setState({...this.state, selectedProvince: null, selectedCity: null})
    })
  }

  _handleProvince = (e) => {
    const value = parseInt(e.target.value, 10)
    this.setState({...this.state, selectedProvince: value === 0 ? null : value}, () => {
      if (value !== 0) {
        const {actions} = this.props
        actions.getCities(value)
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
      if (value === 0) this.setState({...this.state, secondCategory: null, thirdCategory: null})
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

  _uploadHandler(fileString, tempName, name, deleteItem) {
    const reader = new FileReader()
    let deleteArr = [...this.state.deleteArr]
    if (deleteItem && deleteItem.id) deleteArr.push(deleteItem.id)
    if (fileString) {
      reader.onload = () => this.setState({...this.state, [tempName]: reader.result, deleteArr}, () => this._createFile(tempName, name, fileString))
      reader.readAsDataURL(fileString)
    }
  }

  _createFile(tempName, name, fileString) {
    const {createFile} = this.props.actions
    const nextActionType = types.COMMON.FILE.SET_FILE_IDS_IN_TEMP_FILE
    const createArguments = {fileIdKey: 'fileId', nextActionType, nextActionData: {tempFileKeyName: tempName}}
    const fileId = name
    this.setState({...this.state, [name]: fileId}, () => {
      createFileFunc(createFile, this.state[tempName], createArguments, constants.CREATE_FILE_TYPES.IMAGE, constants.CREATE_FILE_CATEGORIES.PRODUCT.IMAGE, {fileId, formFile: fileString})
    })
  }

  addCamma(input) {
    if (input) {
      let output = input.toFixed(0).toString().split('').reverse().join('')
      let index = 3
      while (output[index] !== undefined) {
        output = output.slice(0, index) + ',' + output.slice(index)
        index += 4
      }
      return output.split('').reverse().join('')
    }
  }

  submitUpdate = () => {
    if (!this.state.error) {
      this.setState({...this.state, edit: false}, () => {

        const {product, actions, temp} = this.props
        const {newName, selectedCountry, selectedProvince, selectedCity, firstCategory, secondCategory, thirdCategory, deleteArr, newPrice, price} = this.state
        const product_category = thirdCategory || secondCategory || firstCategory || product.product_category
        const {updateProduct, updateFile, addPrice} = actions

        deleteArr.forEach(id => {
          updateFile({
            id,
            formData: {file_related_parent: null},
            fileParentType: constants.FILE_PARENT.PRODUCT,
          })
        })

        if (temp[this.state['image1']] && temp[this.state['image1']].uploadedFileId) {
          updateFile({
            id: this.props.temp[this.state['image1']].uploadedFileId,
            formData: {file_related_parent: product.id},
            fileParentType: constants.FILE_PARENT.PRODUCT,
          })
        }
        if (temp[this.state['image2']] && temp[this.state['image2']].uploadedFileId) {
          updateFile({
            id: this.props.temp[this.state['image2']].uploadedFileId,
            formData: {file_related_parent: product.id},
            fileParentType: constants.FILE_PARENT.PRODUCT,
          })
        }
        if (temp[this.state['image3']] && temp[this.state['image3']].uploadedFileId) {
          updateFile({
            id: this.props.temp[this.state['image3']].uploadedFileId,
            formData: {file_related_parent: product.id},
            fileParentType: constants.FILE_PARENT.PRODUCT,
          })
        }
        if (temp[this.state['image4']] && temp[this.state['image4']].uploadedFileId) {
          updateFile({
            id: this.props.temp[this.state['image4']].uploadedFileId,
            formData: {file_related_parent: product.id},
            fileParentType: constants.FILE_PARENT.PRODUCT,
          })
        }
        if (temp[this.state['image5']] && temp[this.state['image5']].uploadedFileId) {
          updateFile({
            id: this.props.temp[this.state['image5']].uploadedFileId,
            formData: {file_related_parent: product.id},
            fileParentType: constants.FILE_PARENT.PRODUCT,
          })
        }
        if (temp[this.state['image6']] && temp[this.state['image6']].uploadedFileId) {
          updateFile({
            id: this.props.temp[this.state['image6']].uploadedFileId,
            formData: {file_related_parent: product.id},
            fileParentType: constants.FILE_PARENT.PRODUCT,
          })
        }
        updateProduct({
          formValues:
              {
                name: newName.trim(),
                product_related_country: selectedCountry,
                product_related_province: selectedCountry ? selectedProvince : null,
                product_related_town: selectedProvince ? selectedCity : null,
                product_category,
                product_price_type: price,
              }
          , productId: product.id,
        })

        price === 'specified' && newPrice && newPrice.length > 0 && addPrice(product.id, newPrice)
      })
    }
  }

  render() {
    const {galleryModal, image, edit, selectedCountry, selectedProvince, price, firstCategory, secondCategory, error} = this.state
    const {product, country, province, city, product_owner, product_category, current_user_identity, countries, provinces, cities, categories, product_price} = this.props
    const {name, created_time, updated_time} = product
    const pictures_array = product.product_media ? product.product_media.filter(p => p.type === 'image') : []

    return (
        <section className='product-view-sidebar'>
          {
            edit ?
                <div>
                  <div className='product-view-sidebar-name'><input type='text' className='product-view-sidebar-name-edit' defaultValue={name} onChange={this.updateName}/></div>

                  <div className='product-view-sidebar-main-img-edit'>
                    <div className='product-view-sidebar-main-img-title'>تصاویر محصول</div>
                    <div className='product-view-sidebar-upload'>
                      <img src={this.state.tempImage1 ? this.state.tempImage1 : pictures_array && pictures_array[0] ? pictures_array[0].file : ''}
                           alt=''
                           className='product-view-sidebar-upload-pre'
                           style={{opacity: this.state.tempImage1 ? this.props.temp[this.state['image1']] && parseFloat(this.props.temp[this.state['image1']].progress / 100) : 1}}
                      />
                      <input className='product-view-sidebar-upload-input'
                             type='file'
                             onChange={e => this._uploadHandler(e.currentTarget.files[0], 'tempImage1', 'image1', pictures_array[0])}
                      />
                    </div>
                    <div className='product-view-sidebar-upload'>
                      <img src={this.state.tempImage2 ? this.state.tempImage2 : pictures_array && pictures_array[1] ? pictures_array[1].file : ''}
                           alt=''
                           className='product-view-sidebar-upload-pre'
                           style={{opacity: this.state.tempImage2 ? this.props.temp[this.state['image2']] && parseFloat(this.props.temp[this.state['image2']].progress / 100) : 1}}
                      />
                      <input className='product-view-sidebar-upload-input'
                             type='file'
                             onChange={e => this._uploadHandler(e.currentTarget.files[0], 'tempImage2', 'image2', pictures_array[1])}
                      />
                    </div>
                    <div className='product-view-sidebar-upload'>
                      <img src={this.state.tempImage3 ? this.state.tempImage3 : pictures_array && pictures_array[2] ? pictures_array[2].file : ''}
                           alt=''
                           className='product-view-sidebar-upload-pre'
                           style={{opacity: this.state.tempImage3 ? this.props.temp[this.state['image3']] && parseFloat(this.props.temp[this.state['image3']].progress / 100) : 1}}
                      />
                      <input className='product-view-sidebar-upload-input'
                             type='file'
                             onChange={e => this._uploadHandler(e.currentTarget.files[0], 'tempImage3', 'image3', pictures_array[2])}
                      />
                    </div>
                    <div className='product-view-sidebar-upload'>
                      <img src={this.state.tempImage4 ? this.state.tempImage4 : pictures_array && pictures_array[3] ? pictures_array[3].file : ''}
                           alt=''
                           className='product-view-sidebar-upload-pre'
                           style={{opacity: this.state.tempImage4 ? this.props.temp[this.state['image4']] && parseFloat(this.props.temp[this.state['image4']].progress / 100) : 1}}
                      />
                      <input className='product-view-sidebar-upload-input'
                             type='file'
                             onChange={e => this._uploadHandler(e.currentTarget.files[0], 'tempImage4', 'image4', pictures_array[3])}
                      />
                    </div>
                    <div className='product-view-sidebar-upload'>
                      <img src={this.state.tempImage5 ? this.state.tempImage5 : pictures_array && pictures_array[4] ? pictures_array[4].file : ''}
                           alt=''
                           className='product-view-sidebar-upload-pre'
                           style={{opacity: this.state.tempImage5 ? this.props.temp[this.state['image5']] && parseFloat(this.props.temp[this.state['image5']].progress / 100) : 1}}
                      />
                      <input className='product-view-sidebar-upload-input'
                             type='file'
                             onChange={e => this._uploadHandler(e.currentTarget.files[0], 'tempImage5', 'image5', pictures_array[4])}
                      />
                    </div>
                    <div className='product-view-sidebar-upload'>
                      <img src={this.state.tempImage6 ? this.state.tempImage6 : pictures_array && pictures_array[5] ? pictures_array[5].file : ''}
                           alt=''
                           className='product-view-sidebar-upload-pre'
                           style={{opacity: this.state.tempImage6 ? this.props.temp[this.state['image6']] && parseFloat(this.props.temp[this.state['image6']].progress / 100) : 1}}
                      />
                      <input className='product-view-sidebar-upload-input'
                             type='file'
                             onChange={e => this._uploadHandler(e.currentTarget.files[0], 'tempImage6', 'image6', pictures_array[5])}
                      />
                    </div>
                  </div>

                  <div className='product-view-sidebar-date-editing'><Date className='product-view-sidebar-svg'/>تاریخ ثبت: <Moment element="span" fromNow ago>{created_time || updated_time}</Moment> پیش</div>

                  <div className='product-view-sidebar-location-edit'>
                    <div className='product-view-sidebar-main-img-title'>محدوده جغرافیایی</div>
                    <select className='product-view-sidebar-locations' onChange={this._handleCountry}>
                      <option className='product-option' value={0}>کشور</option>
                      {
                        Object.values(countries.list).map((country, index) => {
                              if (product.product_related_country === country.id)
                                return <option className='product-option' key={index} value={country.id} selected>{country.name}</option>
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
                            if (product.product_related_province === province.id)
                              return <option className='product-option' key={index} value={province.id} selected>{province.name}</option>
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
                            if (product.product_related_town === city.id)
                              return <option className='product-option' key={index} value={city.id} selected>{city.name}</option>
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
                          if (cat.id && cat.category_parent === null) return <option className='product-option' key={index} value={cat.id}>{cat.name}</option>
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
                    <Material className={error ? 'product-view-sidebar-buy-disable' : 'product-view-sidebar-buy'} content='ثبت ویرایش' onClick={this.submitUpdate}/>
                    <Material className='product-view-sidebar-share' content='لغو ویرایش' onClick={this.hideEdit}/>
                  </div>

                </div>

                :

                <div>
                  <div className='product-view-sidebar-name'>
                    {name}
                    {/*<div className='fa fa-ellipsis-v product-sidebar-option'/>*/}
                  </div>
                  <div className='product-view-sidebar-main-img-cont' style={pictures_array && pictures_array.length > 0 ? {} : {display: 'none'}}>
                    <img className='product-view-sidebar-main-img' src={pictures_array && pictures_array[0] ? pictures_array[0].file : ''} alt='' onClick={this._showGallery}/>
                  </div>
                  <div style={pictures_array && pictures_array.length > 1 ? {} : {display: 'none'}} className='product-view-sidebar-images'>
                    {
                      pictures_array && pictures_array.slice(1, 4).map((img, index) => {
                        return <div key={index} className='product-view-sidebar-img-cont' onClick={this._showGallery}><img className='product-view-sidebar-img' src={img.file} alt=''/></div>
                      })
                    }
                    <div style={{display: pictures_array && pictures_array.length > 4 ? 'inline-flex' : 'none'}} className='product-view-sidebar-more' onClick={this._showGallery}>بیشتر</div>
                  </div>

                  <div className='product-view-sidebar-date'><Date className='product-view-sidebar-svg'/>تاریخ ثبت: <Moment element="span" fromNow ago>{created_time || updated_time}</Moment> پیش</div>
                  {
                    country && country.name &&
                    <div className='product-view-sidebar-location'>
                      <Location className='product-view-sidebar-svg'/>
                      {country.name}
                      {province && province.name && <span>، {province.name}</span>}
                      {city && city.name && <span>، {city.name}</span>}
                    </div>
                  }
                  <div className='product-view-sidebar-details'>
                    <span className='product-view-sidebar-details-grey'>قیمت: </span>
                    <span className='product-view-sidebar-details-red'>{product.product_price_type === 'call' ? 'تماس بگیرید' : product_price && product_price.length > 0 ? this.addCamma(product_price[product_price.length - 1].value) : 'تماس بگیرید'}
                    </span>
                    <br/>
                    <span className='product-view-sidebar-details-grey'>فروشنده: </span>
                    <Link to={product_owner ? `/${product_owner.identity_type}/${product_owner.id}` : ''}>
                      <span className='product-view-sidebar-details-blue'>
                        {
                          product_owner ? product_owner.official_name || product_owner.nike_name ? product_owner.official_name || product_owner.nike_name : product_owner.first_name || product_owner.last_name ? product_owner.first_name + ' ' + product_owner.last_name
                              : <span style={{color: 'red'}}>فاقد نام</span> : <div style={{verticalAlign: 'top', display: 'inline-block', marginTop: '3px'}}><ClipLoader size={15}/></div>
                        }
                      </span>
                    </Link>
                    <br/>
                    {
                      product_category && <span className='product-view-sidebar-details-grey'>دسته بندی: {product_category.name ? product_category.name : ''}</span>
                    }
                  </div>
                  {
                    current_user_identity ?
                        product_owner && current_user_identity !== product_owner.id ?
                            <div className='product-view-sidebar-buttons'>
                              <Material className='product-view-sidebar-buy' content='خرید'/>
                              <Material className='product-view-sidebar-share' content='اشتراک گذاری'/>
                            </div>
                            :
                            <div className='product-view-sidebar-buttons'>
                              {/*<Material className='product-view-sidebar-buy' content='عرضه'/>*/}
                              <Material className='product-view-sidebar-delete' content='حذف' onClick={this.delete}/>
                              <Material className='product-view-sidebar-share' content='ویرایش' onClick={this.showEdit}/>
                            </div>
                        : null
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

        </section>
    )
  }
}

const mapStateToProps = (state) => ({
  temp: state.temp.file,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getCountries,
    getProvinces,
    getCities,
    updateProduct: productActions.updateProduct,
    addPrice: productActions.addProductPrice,
    createFile: FileActions.createFile,
    updateFile: FileActions.updateFile,
    deleteProduct: productActions.deleteProduct,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
