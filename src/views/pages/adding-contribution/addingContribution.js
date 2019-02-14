// @flow
import * as React from 'react'
import countrySelector from 'src/redux/selectors/common/location/getCountry'
import makeCitySelectorByProvinceId from 'src/redux/selectors/common/location/getCityByProvince'
import makeProvinceSelectorByCountryId from 'src/redux/selectors/common/location/getProvinceByCountry'
import nowCreatedProductIdSelector from 'src/redux/selectors/common/product/getNowCreatedProductId'
import nowCreatedSkillIdSelector from 'src/redux/selectors/skill/getNowCreatedSkillId'
import type {
  // NewContributionDataType,
  SkillFormValsType
} from './types'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import {bindActionCreators} from 'redux'
import {change} from 'redux-form'
import {connect} from 'react-redux'
import {createProductAsContribution} from 'src/redux/actions/commonActions/productActions/productActions'
import {createSkillAction} from 'src/redux/actions/skill/createSkillAction'
import {getCategories} from 'src/redux/actions/commonActions/categoryActions'
import {getCountries, getProvinces, getCities} from 'src/redux/actions/commonActions/location'
import {getFormValues} from 'src/redux/selectors/formValuesSelectors'
import {getHashTags} from 'src/redux/actions/commonActions/hashTagActions'
import {getMessages} from '../../../redux/selectors/translateSelector'
import {hashTagsListSelector} from 'src/redux/selectors/common/hashTags/hashTag'
import {makeCategorySelector} from 'src/redux/selectors/common/category/getCategoriesByParentId'
import {PureComponent} from 'react'
import {skillInfoFormName} from './skill/infoForm'
import {
  CircularAddIcon,
  ContributionIcon,
  InformationIcon,
  SkillIcon,
  TipsIcon,
  UploadIcon,
} from 'src/images/icons'
import InteliInput from 'src/views/common/inputs/InteliInput'
import Material from '../../common/components/Material'
import type {ImageType} from '../modal/createExchange/basicInfo'
import {createFile, getFiles} from 'src/redux/actions/commonActions/fileActions'
import makeFileSelectorByKeyValue from 'src/redux/selectors/common/file/selectFilsByKeyValue'
import {ClipLoader} from 'react-spinners'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

type catsMap = {
  category_parent?: ?number,
  province_related_country?: ?number,
  category_parent?: ?number,
  town_related_province: any
}
type list = { list: catsMap }
type AddingContributionProps = {
  _changeFormSingleFieldValue: Function,
  _createProduct: Function,
  _createSkillAction: Function,
  _getCategories: Function,
  _getCities: Function,
  _getCountries: Function,
  _getHashTags: Function,
  _getProvinces: Function,
  createFile: Function,
  categories: list,
  cities: {},
  city: list,
  clientFiles: Object,
  clientId: ?number,
  countries: list,
  handleModalVisibility: Function,
  hashTags: {},
  identity: ?number,
  initialInfoFormState: {},
  modalIsOpen: boolean,
  nowCreatedProductId: number,
  nowCreatedSkillId: number,
  province: list,
  provinces: {},
  skillInfoFormValues: SkillFormValsType,
  translator: TranslatorType,
}
type cats = any
type AddingContributionState = {
  // priceType: string,
  abilityDescription: string,
  abilityTitle: string,
  catLvlOne: Array<Object>,
  catLvlThree: Array<Object>,
  catLvlTwo: Array<Object>,
  cats: [],
  cityList: [],
  cityList: Array<number>,
  countryList: [],
  countryList: Array<number>,
  currentLevel: string,
  processing: boolean,
  productDescription: string,
  productName: string,
  provinceList: Array<any>,
  selectedCatLvlOne: cats,
  selectedCatLvlThree: cats,
  selectedCatLvlTwo: cats,
  selectedCity: ?number,
  selectedCountry: ?number,
  selectedImage: Array<any>,
  selectedImageId: Array<any>,
  selectedImageTemp: ?string,
  selectedProvince: ?number,
  selectedType: string,
}

class AddingContribution extends PureComponent<AddingContributionProps, AddingContributionState> {
  constructor(props) {
    super(props)
    this.state = {
      catLvlOne: [],
      catLvlThree: [],
      catLvlTwo: [],
      cats: [],
      cityList: [],
      countryList: [],
      currentLevel: 'one',
      // priceType: 'معین',
      processing: false,
      productDescription: '',
      productName: '',
      provinceList: [],
      selectedCatLvlOne: null,
      selectedCatLvlThree: null,
      selectedCatLvlTwo: null,
      selectedCity: null,
      selectedCountry: null,
      selectedImage: [],
      selectedImageId: [],
      selectedImageTemp: '',
      selectedProvince: null,
      selectedType: 'Product',
      abilityTitle: '',
      abilityDescription: ''
    }

    const self: any = this
    self.nextLevel = self.nextLevel.bind(self)
    self.previousLevel = self.previousLevel.bind(self)
    self.renderProgressBar = self.renderProgressBar.bind(self)
    self.renderCurrentLevel = self.renderCurrentLevel.bind(self)
    self.renderFooter = self.renderFooter.bind(self)
    self._closeModal = self._closeModal.bind(self)
    self._handleCreateProduct = self._handleCreateProduct.bind(self)
    self._handleCreateAbility = self._handleCreateAbility.bind(self)
  }

  componentWillMount() {
    const {
      _getCategories,
      _getCountries
      // _getHashTags,
    } = this.props
    _getCategories()
    _getCountries()
    // _getHashTags()
  }

  componentDidUpdate(prevProps, prevState, ss) {
    const {modalIsOpen} = this.props
    if (modalIsOpen) {
      let doc: any = document // for flow
      doc.body.style.overflow = 'hidden'
      doc.body.style.paddingRight = '7px'
      const {
        clientFiles,
        categories,
        countries,
        province,
        city
      } = this.props
      const {
        countryList,
        provinceList,
        cityList,
        selectedCountry,
        selectedProvince,
      } = this.state

      if (prevState.catLvlOne.length < 1) {
        let catsArray: any = Object.values(categories.list).filter(p => p.category_parent === null)
        if (catsArray.length >= 1)
          this.setState({...this.state, catLvlOne: catsArray.slice()})
      }

      if (prevState.countryList.length < 1 && !(Object.keys(countries.list) < 1)) {
        let countArray: any = Object.values(countries.list)
        this.setState({...this.state, countryList: countArray.slice()})
      }

      if (prevState.provinceList.length < 1 && countryList.length >= 1) {
        let provArray: any = Object.values(province.list).filter(p => p.province_related_country === selectedCountry)
        if (provArray.length >= 1)
          this.setState({...this.state, provinceList: provArray.slice()})
      }

      if (cityList.length < 1 && provinceList.length >= 1) {
        let citsArray: any = Object.values(city.list).filter(p => p.town_related_province === selectedProvince)
        if (citsArray.length >= 1)
          this.setState({...this.state, cityList: citsArray.slice()})
      }

      const lastFile = clientFiles[clientFiles.length - 1] || {}
      const prevLastFile = prevProps.clientFiles[prevProps.clientFiles.length - 1] || {}
      if (lastFile.id && prevLastFile.id) {
        if (lastFile.id !== prevLastFile.id) {
          this._imageHandler(lastFile)
        }
      }
    } else {
      let doc: any = document
      doc.body.style.overflow = 'auto'
      doc.body.style.paddingRight = '0'
    }
  }

  renderProgressBar() {
    let {currentLevel, selectedType} = this.state
    switch (selectedType) {
      case 'Ability':
        return (
            <div className={'contribution-progress-bar'}>
              <div className={'level-container-active'}>
                <CircularAddIcon className={'level-container-svg add'}/>
                <div className={'level-container-text'}>
                  آوردۀ جدید
                </div>
              </div>
              <div style={{opacity: '0'}} className={currentLevel !== 'one' ? 'level-container-active' : 'level-container'}/>
              <div className={currentLevel !== 'one' ? 'level-container-active' : 'level-container'}>
                <InformationIcon className={'level-container-svg info ' + currentLevel}/>
                <div className={'level-container-text'}> مشخصات</div>
              </div>
              <div className={'level-bar'}/>
              <div className={'level-bar-progress ' + (currentLevel === 'one' ? 'one' : 'three')}/>
            </div>
        )
      case 'Product':
        return (
            <div className={'contribution-progress-bar'}>
              <div className={'level-container-active'}>
                <CircularAddIcon className={'level-container-svg add'}/>
                <div className={'level-container-text'}>
                  آوردۀ جدید
                </div>
              </div>
              <div className={currentLevel !== 'one' ? 'level-container-active' : 'level-container'}>
                <InformationIcon className={'level-container-svg info ' + currentLevel}/>
                <div className={'level-container-text'}>
                  اطلاعات اولیه
                </div>
              </div>
              {/* NOT AVAILABLE FOR NOW
               <div className={currentLevel !== "one" && currentLevel !== "two" ? "level-container-active" : "level-container"}>
               <ItemsAndPropertiesIcon className={"progress-step-icon level-container-svg items " + currentLevel}/>
               <div className={"level-container-text"}>
               مشخصات فنّی
               </div>
               </div>
               <div className={currentLevel === "four" || currentLevel === "five" ? "level-container-active" : "level-container"}>
               <Medal width="24px" height="25px" svgClass={"level-container-svg medal " + currentLevel}/>
               <div className={"level-container-text"}>
               گواهینامه ها
               </div>
               </div>
               */}
              <div className={currentLevel !== 'one' && currentLevel !== 'two' ? 'level-container-active' : 'level-container'}>
                <ContributionIcon className={'level-container-svg contribution ' + currentLevel}/>
                <div className={'level-container-text'}>
                  مدیریت ویترین
                </div>
              </div>
              <div className={'level-bar'}/>
              <div className={'level-bar-progress ' + currentLevel}/>
            </div>
        )
      default:
        return null
    }

  }

  renderCurrentLevel() {
    let {
      currentLevel,
      processing,
      selectedImage,
      selectedImageId,
      selectedType,
      catLvlOne,
      catLvlTwo,
      catLvlThree,
      countryList,
      provinceList,
      cityList,
      productName,
      abilityTitle,
      abilityDescription
    } = this.state
    let {translator} = this.props
    if (currentLevel === 'one') {
      return (
          <div>
            <div className="contribution-description">
              <div className="icon-wrapper">
                <TipsIcon className="tip-icon"/>
              </div>
              <div className="contribution-desc-txt">
                <p>
                  آورده در سامانه اینوین دارایی توامندی یا ارزشی‌ست که کاربران اعم از مجموعه‌ها و افراد ارایه
                  می‌دهند. قابلیت عرضه در پنجره‌ها کارگزاری و انجام معامله آن وجود دارد. محصولات تولیدی
                  مهارت‌ها تاییدیه‌ها گواهی‌نامه‌ها خدمات مشاوره. زیرساخت‌های قابل اشتراک از انواع آورده در
                  سامانه اینوین هستند.
                </p>
              </div>
            </div>
            <div className={'contribution-description-options-area'}>
              <div className={'text'}>انتخاب نوع آورده:</div>
              <div className={'contribution-description-options'}>

                <Material backgroundColor='rgba(71,91,112,0.5)' className={selectedType === 'Product' ? 'contribution-material-block-active' : 'contribution-material-block'} content={
                  <div onClick={() => this._changeSelectedType('Product')}
                       className={selectedType === 'Product' ? 'contribution-description-option-block-active' : 'contribution-description-option-block'}>
                    <ContributionIcon className={'option-contribution-svg'}/>
                    <div className={'option-contribution-text'}>محصول</div>
                  </div>
                }/>

                <Material backgroundColor='rgba(71,91,112,0.5)' className={selectedType === 'Ability' ? 'contribution-material-block-active' : 'contribution-material-block'} content={
                  <div
                      onClick={() => this._changeSelectedType('Ability')}
                      className={selectedType === 'Ability' ? 'contribution-description-option-block-active' : 'contribution-description-option-block'}>
                    <SkillIcon className="option-contribution-svg-smaller"/>
                    <div className={'option-contribution-text'}>مهارت</div>
                  </div>
                }/>
                {/* // NOT AVAILABLE FOR NOW
                 <Material backgroundColor='rgba(71,91,112,0.5)' className={selectedType === "Certificate" ? "contribution-material-block-active" : "contribution-material-block"} content={
                 <div
                 onClick={() => this._changeSelectedType("Certificate")}
                 className={selectedType === "Certificate" ? "contribution-description-option-block-active" : "contribution-description-option-block"}>
                 <CertificateIcon className="option-contribution-svg-smaller"/>
                 <div className={"option-contribution-text"}>تاییدیه</div>
                 </div>
                 }/>
                 =======
                 <Material backgroundColor='rgba(71,91,112,0.5)' className={selectedType === "Ability" ? "contribution-material-block-active" : "contribution-material-block"} content={
                 <div
                 onClick={() => this._changeSelectedType("Ability")}
                 className={selectedType === "Ability" ? "contribution-description-option-block-active" : "contribution-description-option-block"}>
                 <SkillIcon className="option-contribution-svg-smaller"/>
                 <div className={"option-contribution-text"}>مهارت</div>
                 </div>
                 }/>
                 {/* // NOT AVAILABLE FOR NOW
                 <Material backgroundColor='rgba(71,91,112,0.5)' className={selectedType === "Certificate" ? "contribution-material-block-active" : "contribution-material-block"} content={
                 <div
                 onClick={() => this._changeSelectedType("Certificate")}
                 className={selectedType === "Certificate" ? "contribution-description-option-block-active" : "contribution-description-option-block"}>
                 <CertificateIcon className="option-contribution-svg-smaller"/>
                 <div className={"option-contribution-text"}>تاییدیه</div>
                 </div>
                 }/>
                 >>>>>>> f7d96cd42719dbbaf9583d129b04d8843840fc0f

                 <Material backgroundColor='rgba(71,91,112,0.5)' className={selectedType === "Consultation" ? "contribution-material-block-active" : "contribution-material-block"} content={
                 <div
                 onClick={() => this._changeSelectedType("Consultation")}
                 className={selectedType === "Consultation" ? "contribution-description-option-block-active" : "contribution-description-option-block"}>
                 <ConsultIcon className="option-contribution-svg-small"/>
                 <div className={"option-contribution-text"}>مشاوره</div>
                 </div>
                 }/>

                 <Material backgroundColor='rgba(71,91,112,0.5)' className={selectedType === "Substructure" ? "contribution-material-block-active" : "contribution-material-block"} content={
                 <div
                 onClick={() => this._changeSelectedType("Substructure")}
                 className={selectedType === "Substructure" ? "contribution-description-option-block-active" : "contribution-description-option-block"}>
                 <QuestionMark width="20px" height="20px" svgClass={"option-contribution-svg"}/>
                 <div className={"option-contribution-text"}>زیرساخت قابل اشتراک</div>
                 </div>
                 }/>
                 */}
              </div>
            </div>
          </div>
      )
    } else if (selectedType === 'Product') {
      switch (currentLevel) {
        case 'two':
          let self: any = this
          return (
              <div className="contribution-product-two">
                <div className={'gray-text-input-label-container'}>
                  <label className="gray-text-input-label">عنوان آورده:</label>
                  <input type="text" className="form-control gray-text-input" defaultValue={productName}
                         onChange={(e) => this.setState({...this.state, productName: e.target.value})}/>
                  <div ref={e => self.nameError = e} className={'product-name-error-hide'}>طول نام غیر مجاز است</div>
                </div>
                <div className={'gray-text-input-label-container'}> {/*TODO: SET THREE AREA FIELD*/}
                  <label className="gray-text-input-label">محدوده جغرافیایی:</label>
                  {/*<input type="text" className="form-control gray-text-input"/>*/}
                  <div className={'inteli-area'}>
                    <InteliInput list={countryList} handleChange={(data) => this._handleCountry(data)}/>
                  </div>
                  <div className={'inteli-area'}>
                    <InteliInput list={provinceList} handleChange={(data) => this._handleProvince(data)}/>
                  </div>
                  <div className={'inteli-area'}>
                    <InteliInput list={cityList} handleChange={(data) => this._handleCity(data)}/>
                  </div>
                  <div ref={e => self.locationError = e} className={'product-name-error-hide'}>محدوده جغرافیایی را کامل انتخاب کنید</div>

                </div>

                <div className={'gray-text-input-label-container'}>
                  <label className="gray-text-input-label">طبقه اول دسته بندی:</label>
                  <InteliInput handleChange={(data) => this._handleCatLvlChange(data, 'one')}
                               list={catLvlOne}/>
                  <div className={'gray-text-input-label-container full'}>
                    <label className="gray-text-input-label">طبقه دوم دسته بندی:</label>
                    <InteliInput handleChange={(data) => this._handleCatLvlChange(data, 'two')}
                                 list={catLvlTwo}/>
                  </div>
                  <div className={'gray-text-input-label-container full'}>
                    <label className="gray-text-input-label">طبقه سوم دسته بندی:</label>
                    <InteliInput handleChange={(data) => this._handleCatLvlChange(data, 'three')}
                                 list={catLvlThree}/>
                  </div>
                </div>
                <div className={'gray-text-input-label-container'}>
                  <label className="gray-text-input-label">توصیف اجمالی آورده:</label>
                  <textarea name="description" className="form-control gray-textarea-input"
                            onChange={(e) => this.setState({...this.state, productDescription: e.target.value})}/>
                  <div ref={e => self.descriptionError = e} className={'product-name-error-hide'}>طول توضیحات غیر مجاز است</div>
                </div>
                {/*<div className={"gray-text-input-label-container"}>
                 <label className="gray-text-input-label">قیمت:</label>
                 <RadioButtonGroup
                 selected={priceType}
                 handler={this._priceHandler}
                 items={[{value: "معین", title: "معین"}, {value: "تماس با عرضه کننده", title: "تماس با عرضه کننده"}]}
                 name="userType"
                 label={""}
                 className={"contribution"}
                 contribution={"contribution"}
                 />
                 <input type="text" className="form-control gray-text-input" style={{textAlign: "left"}} placeholder={"IRR"}/>
                 </div>*/}
              </div>
          )
        case 'three':
          return (
              <div className="contribution-product-three">
                <div className="create-product-title-container">
                  <label className="gray-text-input-label">{translator['Product Gallery']}:</label>
                </div>
                <div className={'create-product-upload-container'}>
                  {processing ?
                      <ClipLoader color="#253545" size={20} loading={true}/>
                      :
                      <UploadIcon className={'create-product-upload-svg'}/>
                  }
                  {!processing && selectedImageId.length < 5 ?
                      <input type="file" accept="image/*" onChange={e => this._uploadHandler(e.currentTarget.files[0])}/>
                      : null}
                </div>
                <div className={'product-gallery-container'}>
                  <div className={'product-gallery-item-container'}>
                    {selectedImage[0] ?
                        <div>
                          <img src={selectedImage[0]} alt={'در حال بارگذاری تصویر محصول'} className={'product-gallery-item'}/>
                          <div className={'product-gallery-cancel-item'} onClick={() => this._deleteImage(0)}>✕</div>
                        </div>
                        :
                        null
                    }
                  </div>
                  <div className={'product-gallery-item-container'}>
                    {selectedImage[1] ?
                        <div>
                          <img src={selectedImage[1]} alt={'در حال بارگذاری تصویر محصول'} className={'product-gallery-item'}/>
                          <div className={'product-gallery-cancel-item'} onClick={() => this._deleteImage(1)}>✕</div>
                        </div>
                        :
                        null
                    }
                  </div>
                  <div className={'product-gallery-item-container'}>
                    {selectedImage[2] ?
                        <div>
                          <img src={selectedImage[2]} alt={'در حال بارگذاری تصویر محصول'} className={'product-gallery-item'}/>
                          <div className={'product-gallery-cancel-item'} onClick={() => this._deleteImage(2)}>✕</div>
                        </div>
                        :
                        null
                    }
                  </div>
                  <div className={'product-gallery-item-container'}>
                    {selectedImage[3] ?
                        <div>
                          <img src={selectedImage[3]} alt={'در حال بارگذاری تصویر محصول'} className={'product-gallery-item'}/>
                          <div className={'product-gallery-cancel-item'} onClick={() => this._deleteImage(3)}>✕</div>
                        </div>
                        :
                        null
                    }
                  </div>
                  <div className={'product-gallery-item-container'}>
                    {selectedImage[4] ?
                        <div>
                          <img src={selectedImage[4]} alt={'در حال بارگذاری تصویر محصول'} className={'product-gallery-item'}/>
                          <div className={'product-gallery-cancel-item'} onClick={() => this._deleteImage(4)}>✕</div>
                        </div>
                        :
                        null
                    }
                  </div>
                </div>

                <div className="create-product-title-container">
                  <label className="gray-text-input-label">{translator['Product Video']}:</label>
                </div>
                <div className={'create-product-upload-container'}>
                  <UploadIcon className={'create-product-upload-svg'}/>
                  <input type="file" accept="video/*" onChange={null}/>
                </div>
                <div className={'product-gallery-container'}>
                  <div className={'product-gallery-item-container'}/>
                </div>
              </div>
          )
          // case "four":
          //   return (
          //       <div className="contribution-description">
          //         <div className="icon-wrapper">
          //           <TipsIcon className="tip-icon"/>
          //         </div>
          //         <div className="contribution-desc-txt">
          //           <p>
          //             مرحله ی چهارم
          //           </p>
          //         </div>
          //       </div>
          //   )
          // case "five":
          //   return (
          //       <div className="contribution-product-two">
          //         {
          //           productFeatures.map((p, k) =>
          //               <div className={"product-features-frame-container"} key={k}>
          //                 <input
          //                     type={"text"} className={productFeatures[k].filled ? "product-features-frame-filled" : "product-features-frame"}
          //                     placeholder={productFeatures[k - 1] ? productFeatures[k - 1].filled ? "عنوان ویژگی" : "" : "عنوان ویژگی (مثلا اندازه قطر داخلی)"}
          //                     disabled={productFeatures[k - 1] ? !productFeatures[k - 1].filled : false}
          //                     onChange={(e) => this._setProductFeature(e.target.value, k, "title")}
          //                     onBlur={(e) => this._setProductFeature(e.target.value, k, "blur")}
          //                 >
          //                 </input>
          //                 <input
          //                     type={"text"} className={productFeatures[k].filled ? "product-features-frame-filled" : "product-features-frame"}
          //                     placeholder={productFeatures[k - 1] ? productFeatures[k - 1].filled ? "مقدار ویژگی" : "" : "مقدار ویژگی (مثلا 110 میلی متر)"}
          //                     disabled={productFeatures[k - 1] ? !productFeatures[k - 1].filled : false}
          //                     onChange={(e) => this._setProductFeature(e.target.value, k, "amount")}
          //                     onBlur={(e) => this._setProductFeature(e.target.value, k, "blur")}
          //                 >
          //                 </input>
          //               </div>
          //           )
          //         }
          //       </div>
          //   )
        default:
          return (
              <div className="contribution-description">
                <div className="contribution-desc-txt">
                  <p>
                    Undefined Level
                  </p>
                </div>
              </div>
          )
      }
    } else if (selectedType === 'Ability') {
      switch (currentLevel) {
        case 'two':
          let self: any = this
          return (
              <div className="contribution-ability-two">
                <div className={'gray-text-input-label-container'}>
                  <label className="gray-text-input-label">عنوان مهارت:</label>
                  <input type="text" className="form-control gray-text-input" defaultValue={abilityTitle}
                         onChange={(e) => this.setState({...this.state, abilityTitle: e.target.value})}/>
                  <div ref={e => self._titleError = e} className={'product-name-error-hide'}>طول عنوان غیر مجاز است</div>
                </div>
                <div className={'gray-text-input-label-container'}>
                  <label className="gray-text-input-label">توضیحات مهارت:</label>
                  <textarea name="description" className="form-control gray-textarea-input" defaultValue={abilityDescription}
                            onChange={(e) => this.setState({...this.state, abilityDescription: e.target.value})}/>
                  <div ref={e => self._descriptionError = e} className={'product-name-error-hide'}>طول توضیحات غیر مجاز است</div>
                </div>
                {/*<div className={"gray-text-input-label-container"}>
                 <label className="gray-text-input-label">قیمت:</label>
                 <RadioButtonGroup
                 selected={priceType}
                 handler={this._priceHandler}
                 items={[{value: "معین", title: "معین"}, {value: "تماس با عرضه کننده", title: "تماس با عرضه کننده"}]}
                 name="userType"
                 label={""}
                 className={"contribution"}
                 contribution={"contribution"}
                 />
                 <input type="text" className="form-control gray-text-input" style={{textAlign: "left"}} placeholder={"IRR"}/>
                 </div>*/}
              </div>
          )
        default:
          return (
              <div className="contribution-description">
                <div className="contribution-desc-txt">
                  <p>
                    Undefined Level
                  </p>
                </div>
              </div>
          )
      }
    }
  }

  renderFooter() {
    let {currentLevel, processing, selectedType} = this.state
    switch (selectedType) {
      case 'Product':
        return (
            <div className={'contribution-footer'}>
              <button className={'next-button'}
                      onClick={() => currentLevel === 'three' ?
                          processing ?
                              null : this._handleCreateProduct()
                          : this.nextLevel()}>
                <div>
                  {currentLevel === 'three' ?
                      processing ?
                          <ClipLoader color="#35495c" size={20} loading={true}/> : 'ثبت'
                      : 'بعدی'}
                </div>
              </button>

              <button className={currentLevel === 'one' ? 'previous-button-hidden' : 'previous-button'} onClick={() => this.previousLevel()}>
                قبلی
              </button>

            </div>
        )
      case 'Ability':
        return (
            <div className={'contribution-footer'}>
              <button className={'next-button'}
                      onClick={() => currentLevel === 'two' ?
                          this._handleCreateAbility() :
                          this.nextLevel()}>
                <div>
                  {currentLevel === 'two' ?
                      'ثبت' :
                      'بعدی'}
                </div>
              </button>

              <button className={currentLevel === 'one' ? 'previous-button-hidden' : 'previous-button'} onClick={() => this.previousLevel()}>
                قبلی
              </button>

            </div>
        )
      default:
        return (
            <div className={'contribution-footer'}>
              <button className={'next-button'}
                      onClick={() => currentLevel === 'three' ?
                          processing ?
                              null : this._handleCreateProduct()
                          : this.nextLevel()}>
                <div>
                  {currentLevel === 'three' ?
                      processing ?
                          <ClipLoader color="#35495c" size={20} loading={true}/> : 'ثبت'
                      : 'بعدی'}
                </div>
              </button>

              <button className={currentLevel === 'one' ? 'previous-button-hidden' : 'previous-button'} onClick={() => this.previousLevel()}>
                قبلی
              </button>

            </div>
        )
    }

  }

  nextLevel() {
    let {
      currentLevel,
      productName,
      productDescription,
      // selectedCity,
      selectedType
    } = this.state
    if (selectedType === 'Product') {
      switch (currentLevel) {
        case 'one':
          this.setState({
            ...this.state,
            currentLevel: 'two',
            // productName: "",
            productDescription: '',
            selectedImage: [],
            selectedImageId: [],
            selectedCountry: null,
            selectedProvince: null,
            selectedCity: null,
          })
          break
        case 'two':
          let self: any = this
          if (productName.length < 1 || productName.length > 99) {
            self.nameError.className = 'product-name-error'
            self.descriptionError.className = 'product-name-error-hide'
            self.locationError.className = 'product-name-error-hide'
          } else if (productDescription.length > 999) {
            self.nameError.className = 'product-name-error-hide'
            self.descriptionError.className = 'product-name-error'
            self.locationError.className = 'product-name-error-hide'
          }
          // else if (selectedCity === null) {
          //   self.nameError.className = 'product-name-error-hide'
          //   self.descriptionError.className = 'product-name-error-hide'
          //   self.locationError.className = 'product-name-error'
          // }
          else {
            self.nameError.className = 'product-name-error-hide'
            self.descriptionError.className = 'product-name-error-hide'
            self.locationError.className = 'product-name-error-hide'
            this.setState({...this.state, currentLevel: 'three'})
          }
          break
          // case "three":
          //   this.setState({...this.state, currentLevel: "four"})
          //   break
          // case "four":
          //   this.setState({...this.state, currentLevel: "five"})
          //   break
        default :
          this.setState({...this.state, currentLevel: 'one'})
          break
      }
    } else if (selectedType === 'Ability') {
      switch (currentLevel) {
        case 'one':
          this.setState({
            ...this.state,
            currentLevel: 'two',
            // productName: '',
            abilityDescription: '',
            AbilityTitle: '',
          })
          break
          // case "two":
          //   if (productName.length < 1 || productName.length > 99) {
          //     this.nameError.className = "product-name-error"
          //     this.descriptionError.className = "product-name-error-hide"
          //     this.locationError.className = "product-name-error-hide"
          //   } else if (productDescription.length > 999) {
          //     this.nameError.className = "product-name-error-hide"
          //     this.descriptionError.className = "product-name-error"
          //     this.locationError.className = "product-name-error-hide"
          //   } else if (selectedCity === null) {
          //     this.nameError.className = "product-name-error-hide"
          //     this.descriptionError.className = "product-name-error-hide"
          //     this.locationError.className = "product-name-error"
          //   } else {
          //     this.nameError.className = "product-name-error-hide"
          //     this.descriptionError.className = "product-name-error-hide"
          //     this.locationError.className = "product-name-error"
          //     this.setState({...this.state, currentLevel: "three"})
          //   }
          //   break
          // case "three":
          //   this.setState({...this.state, currentLevel: "four"})
          //   break
          // case "four":
          //   this.setState({...this.state, currentLevel: "five"})
          //   break
        default :
          this.setState({...this.state, currentLevel: 'one'})
          break
      }
    }
  }

  previousLevel() {
    let {currentLevel} = this.state
    switch (currentLevel) {
      case 'two':
        this.setState({
          ...this.state,
          currentLevel: 'one',
          productDescription: '',
          selectedImage: [],
          selectedImageId: [],
          selectedCountry: null,
          selectedProvince: null,
          selectedCity: null,
        })
        break
      case 'three':
        this.setState({
          ...this.state,
          currentLevel: 'two',
          productDescription: '',
          selectedImage: [],
          selectedImageId: [],
          selectedCountry: null,
          selectedProvince: null,
          selectedCity: null,
        })
        break
        // case "four":
        //   this.setState({...this.state, currentLevel: "three"})
        //   break
        // case "five":
        //   this.setState({...this.state, currentLevel: "four"})
        //   break
      default :
        this.setState({...this.state, currentLevel: 'one'})
        break
    }
  }

  _changeSelectedType = (selected) => {
    this.setState({...this.state, selectedType: selected})
  }

  _handleCatLvlChange(cat, level) {
    let {categories} = this.props
    if (level === 'one') {
      let selected: any = Object.values(categories.list).filter(p => p.id === cat.id)
      let childes: any = Object.values(categories.list).filter(p => p.category_parent === cat.id)
      console.log(selected[0])
      this.setState({
        ...this.state,
        selectedCatLvlOne: selected[0].id,
        catLvlTwo: childes.slice(),
        selectedCatLvlTwo: null,
        selectedCatLvlThree: null
      })
    } else if (level === 'two') {
      let selected: any = Object.values(categories.list).filter(p => p.id === cat.id)
      let childes: any = Object.values(categories.list).filter(p => p.category_parent === cat.id)
      console.log(selected[0])
      this.setState({
        ...this.state,
        selectedCatLvlTwo: selected[0].id,
        catLvlThree: childes.slice(),
        selectedCatLvlThree: null
      })
    } else if (level === 'three') {
      let selected: any = Object.values(categories.list).filter(p => p.id === cat.id)
      console.log(selected[0])
      this.setState({...this.state, selectedCatLvlThree: selected[0].id})
    }
  }

  _handleCountry(data) {
    const {_getProvinces, province} = this.props
    _getProvinces(data.id)
    let provins: any = Object.values(province.list).filter(p => p.province_related_country === data.id)
    this.setState({...this.state, provinceList: provins.slice(), selectedCountry: data.id, selectedProvince: null, selectedCity: null})
  }

  _handleProvince(data) {
    const {_getCities, city} = this.props
    _getCities(data.id)
    let cits: any = Object.values(city.list).filter(p => p.town_related_province === data.id)
    this.setState({...this.state, cityList: cits.slice(), selectedProvince: data.id, selectedCity: null})
  }

  _handleCity(data) {
    this.setState({...this.state, selectedCity: data.id})
  }

  _closeModal() {
    this.setState({
      ...this.state,
      currentLevel: 'one',
      productName: '',
      productDescription: '',
      abilityTitle: '',
      abilityDescription: '',
      selectedImage: [],
      selectedImageId: [],
      selectedCountry: null,
      selectedProvince: null,
      selectedCity: null,
    }, this.props.handleModalVisibility())
  }

  _handleCreateProduct() {
    let {_createProduct, identity} = this.props
    let {
      selectedImage,
      selectedImageId,
      productDescription,
      productName,
      selectedCatLvlOne,
      selectedCatLvlTwo,
      selectedCatLvlThree,
      selectedCountry,
      selectedProvince,
      selectedCity,
    } = this.state

    let productInfo = {
      // attrs: undefined,
      description: productDescription,
      name: productName,
      product_owner: identity,
      files_count: selectedImage.length,
      product_related_country: selectedCountry,
      product_related_province: selectedProvince,
      product_related_town: selectedCity,
      product_category:
          selectedCatLvlThree !== null ?
              selectedCatLvlThree
              :
              selectedCatLvlTwo !== null ?
                  selectedCatLvlTwo
                  :
                  selectedCatLvlOne,
    }
    let formData = {
      product: productInfo,
      // certificates: undefined,
      // tags: undefined,
      // galleryImages: selectedImage.slice(),
      galleryImages: selectedImageId.slice(),
      galleryVideo: undefined,
      mainGalleryImageIndex: 0,
    }
    _createProduct(formData)
    this._closeModal()
  }

  _handleCreateAbility() {
    let {abilityTitle, abilityDescription} = this.state
    let {clientId} = this.props
    let self: any = this
    if (abilityTitle.length < 4 || abilityTitle.length >= 250) {
      self._titleError.className = 'product-name-error'
      self._descriptionError.className = 'product-name-error-hide'
    } else if (abilityDescription.length >= 127000) {
      self._descriptionError.className = 'product-name-error'
      self._titleError.className = 'product-name-error-hide'
    } else {
      let formData = {
        title: abilityTitle,
        description: abilityDescription,
        skill_user: clientId && clientId,
      }
      let {_createSkillAction} = this.props
      _createSkillAction(formData)
      this._closeModal()
    }
  }

  _uploadHandler = (fileString: any) => {
    const reader: any = new FileReader()
    if (fileString) {
      reader.readAsDataURL(fileString)
      reader.onload = () => {
        this.setState({
          ...this.state,
          selectedImageTemp: reader.result
        }, this._createFile)
      }
    }
  }
  _createFile = () => {
    const {createFile} = this.props
    this.setState({...this.state, processing: true})
    createFile({file_string: this.state.selectedImageTemp})
  }
  _imageHandler = (img: ImageType) => {
    let imgs = this.state.selectedImage
    let ids = this.state.selectedImageId
    imgs.push(img.file)
    ids.push(img.id)
    this.setState({
      ...this.state,
      selectedImage: imgs.slice(),
      selectedImageId: ids.slice(),
      processing: false,
    })
  }
  _deleteImage = (index: number) => {
    let {selectedImage, selectedImageId} = this.state
    let img = selectedImage
    let ids = selectedImageId
    img.splice(index, 1)
    ids.splice(index, 1)
    this.setState({...this.state, selectedImage: img.slice(), selectedImageId: ids.slice()})
  }

  // shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
  //   return nextProps.categories !== this.props.categories ||
  //       nextProps.countries !== this.props.countries ||
  //       nextProps.modalIsOpen !== this.props.modalIsOpen ||
  //       this.state !== nextState
  // }

  render() {
    const {modalIsOpen} = this.props
    return (
        <div className={modalIsOpen ? 'contribution-modal-container' : 'contribution-modal-container-out'}>
          <TransitionGroup>
            {modalIsOpen ?
                <CSSTransition key={1} timeout={250} classNames='fade'>{this.renderProgressBar()}</CSSTransition>
                : null}
            {modalIsOpen ?
                <CSSTransition key={2} timeout={250} classNames='fade'>{this.renderCurrentLevel()}</CSSTransition>
                : null}
            {modalIsOpen ?
                <CSSTransition key={3} timeout={250} classNames='fade'>{this.renderFooter()}</CSSTransition>
                : null}
          </TransitionGroup>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  const identity = state.auth.client.identity.content
  const clientId = state.auth.client.user.id
  const initialFormValues = getFormValues(state, 'addingContributionInitialInfoForm')
  const provinceId = initialFormValues.product_related_province ? initialFormValues.product_related_province.value : ''
  const countryId = initialFormValues.product_related_country ? initialFormValues.product_related_country.value : ''
  const citySelectorByProvinceId = makeCitySelectorByProvinceId()
  const provinceSelectorByProvinceId = makeProvinceSelectorByCountryId()
  const categorySelector = makeCategorySelector()
  const fileSelectorByKeyValue = makeFileSelectorByKeyValue()

  // const provinces =
  return {
    categories: categorySelector(state),
    cities: citySelectorByProvinceId(state, provinceId),
    city: state.common.location.city,
    clientFiles: fileSelectorByKeyValue(state, 'identity', identity),
    clientId,
    countries: countrySelector(state),
    hashTags: hashTagsListSelector(state),
    identity,
    initialInfoFormState: initialFormValues,
    nowCreatedProductId: nowCreatedProductIdSelector(state),
    nowCreatedSkillId: nowCreatedSkillIdSelector(state),
    province: state.common.location.province,
    provinces: provinceSelectorByProvinceId(state, countryId),
    skillInfoFormValues: getFormValues(state, skillInfoFormName),
    testToken: state.auth.client.token,
    translator: getMessages(state),
  }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
          _getCategories: getCategories,
          _getHashTags: getHashTags,
          _createProduct: createProductAsContribution,
          _getCountries: getCountries,
          _getProvinces: getProvinces,
          _getCities: getCities,
          _changeFormSingleFieldValue: change,
          _createSkillAction: createSkillAction,
          createFile,
          getFiles,
        },
        dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddingContribution)