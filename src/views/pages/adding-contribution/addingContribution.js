// @flow
import * as React from "react"
import Certificates from "./product/certificates"
import MenuProgressive from "../progressive/penu-progressive"
import NewContribution from "./newConribution"
import TechnicalProperties from "./product/technicalProperties"
import {Component} from "react"
import {Modal, ModalBody} from "reactstrap"
import {
  CERTIFICATES_IMG_IDS,
  LAYER1S,
  MainCategories,
  PROGRESS_STEPS,
  PROGRESSIVE_STATUS_CHOICES,
  tags,
  WRAPPER_CLASS_NAMES,
} from "./addingConributionData"
import client from "src/consts/client"
import countrySelector from "src/redux/selectors/common/location/getCountry"
import Desc from "../../common/Text/Tip"
import FontAwesome from "react-fontawesome"
import GalleryAndTags from "./product/galleryAndTags"
import InitialInfoReduxForm, {initialInfoFormName} from "./product/reduxFormInitialInfo"
import makeCitySelectorByProvinceId from "src/redux/selectors/common/location/getCityByProvince"
import makeProvinceSelectorByCountryId from "src/redux/selectors/common/location/getProvinceByCountry"
import NextPrevBtns from "./nextAndPrevBtns"
import nowCreatedProductIdSelector from "src/redux/selectors/common/product/getNowCreatedProductId"
import nowCreatedSkillIdSelector from "src/redux/selectors/skill/getNowCreatedSkillId"
import SkillInfoForm, {skillInfoFormName} from "./skill/infoForm"
import SkillSuccessMessage from "./skill/successMessage"
import SuccessMessage from "./product/successMessage"
import type {NewContributionDataType, SkillFormValsType} from "./types"
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"
import {bindActionCreators} from "redux"
import {change} from "redux-form"
import {connect} from "react-redux"
import {createProductAsContribution} from "src/redux/actions/commonActions/productActions/productActions"
import {createSkillAction} from "src/redux/actions/skill/createSkillAction"
import {getCategories} from "src/redux/actions/commonActions/categoryActions"
import {getCountries, getProvinces, getCities} from "src/redux/actions/commonActions/location"
import {getFormValues} from "src/redux/selectors/formValuesSelectors"
import {getHashTags} from "src/redux/actions/commonActions/hashTagActions"
import {getMessages} from "../../../redux/selectors/translateSelector"
import {hashTagsListSelector} from "src/redux/selectors/common/hashTags/hashTag"
import {makeCategorySelector} from "src/redux/selectors/common/category/getCategoriesByParentId"
import {provinceSelector} from "src/redux/selectors/common/location/getProvinceByCountry"
import {
  CertificateIcon,
  CircularAddIcon,
  ConsultIcon,
  ContributionIcon,
  InformationIcon,
  ItemsAndPropertiesIcon,
  Medal,
  QuestionMark,
  SkillIcon,
  TipsIcon,
} from "src/images/icons"
import InteliInput from "src/views/common/inputs/InteliInput"
import {RadioButtonGroup} from "src/views/common/inputs/RadioButtonInput"
import Material from "../../common/components/Material"


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}


type AddingContributionProps = {
  _getCategories: Function,
  _getHashTags: Function,
  _getCountries: Function,
  nowCreatedProductId: number,
  _changeFormSingleFieldValue: Function,
  _getProvinces: Function,
  initialInfoFormState: {},
  _getCities: Function,
  _createProduct: Function,
  skillInfoFormValues: SkillFormValsType,
  handleModalVisibility: Function,
  hashTags: {},
  translator: TranslatorType,
  categories: {},
  countries: {},
  provinces: {},
  cities: {},
  modalIsOpen: boolean,
  _createSkillAction: Function,
  nowCreatedSkillId: number
}

type ProgressStepType = {
  title: string,
  icon: React.Node
}
type NewTechPropertyDataType = {
  id?: number,
  value?: string,
  title?: string
}
type AddingContributionState = {
  activeStep: number,
  addingTechPropNow: boolean,
  newContributionData: NewContributionDataType,
  newTechPropertyData: NewTechPropertyDataType,
  progressStatus: string,
  progressSteps: Array<ProgressStepType>,
  wrapperClassName: string,
  currentLevel: string,
  selectedType: string,
  selectedCatLvlOne: string,
  selectedCatLvlTwo: string,
  selectedCatLvlThree: string,
}

class AddingContribution extends Component<AddingContributionProps, AddingContributionState> {
  constructor(props) {
    super(props)
    this.state = {
      wrapperClassName: WRAPPER_CLASS_NAMES.ENTERING,
      activeStep: 1,
      progressSteps: PROGRESS_STEPS.product,
      progressStatus: PROGRESSIVE_STATUS_CHOICES.ACTIVE,
      newContributionData: {},
      addingTechPropNow: false,
      newTechPropertyData: {},

      currentLevel: "one",
      selectedType: "Product",
      selectedCatLvlOne: "",
      selectedCatLvlTwo: "",
      selectedCatLvlThree: "",
      priceType: "معین"
    }

    const self: any = this
    self.nextLevel = self.nextLevel.bind(self)
    self.previousLevel = self.previousLevel.bind(self)
    self.renderProgressBar = self.renderProgressBar.bind(self)
    self.renderCurrentLevel = self.renderCurrentLevel.bind(self)
    self.renderFooter = self.renderFooter.bind(self)
    self._closeModal = self._closeModal.bind(self)
  }

  componentDidMount() {
    const {_getCategories, _getHashTags} = this.props
    _getCategories()
    _getHashTags()
    this._newContributionMainCategoryHandler(MainCategories[0].value)
  }

  componentDidUpdate(prevProps, prevState, ss) {
    // const prevActiveStep = prevState.activeStep
    const {_getCountries, nowCreatedProductId, nowCreatedSkillId} = this.props
    const {activeStep, newContributionData} = this.state
    if ((prevState.activeStep === 1) && (activeStep === 2)) {
      _getCountries()
      const {technicalProperties} = newContributionData
      const properties = (technicalProperties && technicalProperties.slice()) || []
      const firstIndex = properties.length || 0
      for (let i = firstIndex; i < 9; i++) properties.push({id: i})
      this.setState({
        ...this.state,
        newContributionData: {
          ...this.state.newContributionData,
          technicalProperties: properties
        }
      })
    }
    if ((!prevProps.nowCreatedProductId && nowCreatedProductId)
        ||
        (!prevProps.nowCreatedSkillId && nowCreatedSkillId)) this._nextStep()
  }


  _activationAddTechPropBlock = (e, key) => {
    const isActive: boolean = (key === "click")
    this.setState({
      ...this.state,
      addingTechPropNow: isActive
    })

  }
  _techPropertiesOrderHandler = (result) => {
    const {source, destination} = result
    if (!destination) {
      return
    }
    let sourceIndex, destinationIndex
    const {technicalProperties = []} = this.state.newContributionData
    if (source.droppableId === destination.droppableId) {
      sourceIndex = source.index
      destinationIndex = destination.index
    } else {
      sourceIndex = source.droppableId - 3 + source.index
      destinationIndex = destination.droppableId - 3 + destination.index
    }
    const reOrderedProperties = reorder(
        technicalProperties.slice(),
        sourceIndex,
        destinationIndex
    )
    this.setState({
      ...this.state,
      newContributionData: {
        ...this.state.newContributionData,
        technicalProperties: reOrderedProperties
      },
    })
  }
  _techPropInputFillHandler = (e) => {
    const element = e.target
    const {newTechPropertyData} = this.state
    let newPropertyData = {
      ...newTechPropertyData,
      [element.name]: element.value,
      id: +element.dataset.propertyId  // + added to convert string to integer
    }
    if (newTechPropertyData.id !== undefined) {
      if (newTechPropertyData.id !== +element.dataset.propertyId) {
        newPropertyData = {}
      }
    }
    this.setState({
      ...this.state,
      newTechPropertyData: newPropertyData
    })
  }
  _setNewTechPropertyDate = property => this.setState({...this.state, newTechPropertyData: property})
  _addOrEditTechProperty = () => {
    const {newContributionData, newTechPropertyData} = this.state
    const {technicalProperties} = newContributionData
    const newTechnicalProperties = technicalProperties && technicalProperties.map(property => {
      if (property.id === newTechPropertyData.id) return newTechPropertyData
      else return property
    })

    if (newTechnicalProperties) {
      this.setState({
        ...this.state,
        newContributionData: {
          ...this.state.newContributionData,
          technicalProperties: newTechnicalProperties
        },
        newTechPropertyData: {},
      })
    }
  }
  _createSkillHandler = () => {
    const {_createSkillAction, skillInfoFormValues} = this.props
    // const {hashTags, ...initialValues} = skillInfoFormValues
    _createSkillAction(skillInfoFormValues)
  }
  _countryChangeHandler = v => {
    const {_changeFormSingleFieldValue, _getProvinces, initialInfoFormState = {}} = this.props
    v && _getProvinces(v.value)
    if (initialInfoFormState[LAYER1S.COUNTRY]) {
      if (initialInfoFormState[LAYER1S.COUNTRY].value !== v.value) {
        _changeFormSingleFieldValue(initialInfoFormName, LAYER1S.PROVINCE, "")
      }
    }

  } // used in initialInfo
  _provinceChangeHandler = v => {
    const {_changeFormSingleFieldValue, _getCities, initialInfoFormState = {}} = this.props
    v && _getCities(v.value)
    if (initialInfoFormState[LAYER1S.PROVINCE]) {
      if (initialInfoFormState[LAYER1S.PROVINCE].value !== v.value) {
        _changeFormSingleFieldValue(initialInfoFormName, LAYER1S.CITY, "")
      }
    }

  } // used in initialInfo
  _createProductHandler = () => {
    const identityId = client.getIdentityId()
    const {newContributionData} = this.state
    const {
      technicalProperties,
      certificates,
      galleryImages,
      galleryVideo,
      tags,
      mainGalleryImageIndex
    } = newContributionData
    const {initialInfoFormState, _createProduct} = this.props
    const {
      NAME,
      DESCRIPTION,
      COUNTRY,
      PROVINCE,
      CITY,
      CATEGORY_LAYER1,
      CATEGORY_LAYER2,
      CATEGORY_LAYER3,
      PRICE_STATUS,
      PRODUCT_OWNER
    } = LAYER1S

    let attrs = technicalProperties && technicalProperties.reduce((result, property) => {
      const newProperty = property.title ? {[property.title]: property.value} : {}
      return {
        ...result,
        ...newProperty
      }
    }, {})
    attrs = JSON.stringify(attrs)
    const category = (initialInfoFormState[CATEGORY_LAYER3]) ||
        initialInfoFormState[CATEGORY_LAYER2] || initialInfoFormState[CATEGORY_LAYER1]

    const product = {
      [NAME]: initialInfoFormState[NAME],
      [DESCRIPTION]: initialInfoFormState[DESCRIPTION],
      [COUNTRY]: initialInfoFormState[COUNTRY].value,
      [PROVINCE]: initialInfoFormState[PROVINCE].value,
      [CITY]: initialInfoFormState[CITY].value,
      [CATEGORY_LAYER3]: category.value,
      [PRICE_STATUS]: newContributionData[PRICE_STATUS],
      [PRODUCT_OWNER]: identityId,
      attrs
    }
    const formData = {
      product,
      certificates,
      galleryImages,
      galleryVideo,
      tags,
      mainGalleryImageIndex
    }
    _createProduct(formData)
  }
  _submitHandler = () => {
    const {mainCategory} = this.state.newContributionData
    switch (mainCategory) {
      case MainCategories[0].value: // in case product.
        this._createProductHandler()
        break
      case MainCategories[1].value: // in case skill.
        this._createSkillHandler()
        break
      default:
        return
    }
  }
  _tagsSelectionHandler = (resultTags) => {
    // const {newContributionData} = this.state
    // const tags = (newContributionData.tags && [...newContributionData.tags, ...resultTags]) || [...resultTags]
    this.setState({
      ...this.state,
      newContributionData: {
        ...this.state.newContributionData,
        tags: resultTags
      }
    })
  }
  _nextStep = () => {
    const {activeStep, progressSteps} = this.state
    if (activeStep < progressSteps.length + 1) {
      this._setStep((activeStep + 1), PROGRESSIVE_STATUS_CHOICES.GOING_NEXT)
    }
  }
  _prevStep = () => {
    const {activeStep} = this.state
    if (activeStep !== 1) this._setStep((activeStep - 1), PROGRESSIVE_STATUS_CHOICES.GOING_PREV)
  }
  _deleteTag = (value) => {
    const {newContributionData} = this.state
    const {tags = []} = newContributionData
    const newTags = tags.filter(tag => tag.value !== value)
    this.setState({...this.state, newContributionData: {...newContributionData, tags: newTags}})
  }
  _certificatesImagesHandler = (e, id) => {
    const {newContributionData} = this.state
    let imgId = id
    if (!id) {
      for (let i = 0; i < CERTIFICATES_IMG_IDS.length; i++) {
        if (!newContributionData[CERTIFICATES_IMG_IDS[i]]) { // looking for first id that has'nt image data yet.
          imgId = CERTIFICATES_IMG_IDS[i]
          break
        }
      }
    }
    const input = e.target
    this._setStateForFileField(input, imgId)
  }
  _certificateIndexHandler = (idx) => {
    const {certificates} = this.state.newContributionData
    const cert = (certificates && certificates[idx]) || {}

    this.setState({
      ...this.state,
      newContributionData: {
        ...this.state.newContributionData,
        ...cert,
        [LAYER1S.NEW_CERT_INDEX]: idx,
        // [LAYER1S.NEW_CERT_TITLE]: cert[LAYER1S.NEW_CERT_TITLE],
        // [LAYER1S.NEW_CERT_IMAGE]: cert[LAYER1S.NEW_CERT_IMAGE],
        // [LAYER1S.NEW_CERT_LOGO]: cert[LAYER1S.NEW_CERT_LOGO],
        // [LAYER1S.NEW_CERT_NEED_FOR_VERIFY]: cert[LAYER1S.NEW_CERT_NEED_FOR_VERIFY],
      }
    })
  }
  _galleryImageDelete = (idx) => {
    const {newContributionData} = this.state
    let galleryImages: any = (newContributionData.galleryImages && [...newContributionData.galleryImages]) || []
    galleryImages.splice(idx, 1)
    this.setState({
      ...this.state,
      newContributionData: {
        ...newContributionData,
        galleryImages: galleryImages
      }
    })
  }
  _setMainGalleryImageIndex = (idx) => {
    const {newContributionData} = this.state
    const mainIndex = ((newContributionData.mainGalleryImageIndex === idx) && 10) || idx
    this.setState({
      ...this.state,
      newContributionData: {
        ...newContributionData,
        mainGalleryImageIndex: mainIndex
      }
    })
  }
  _layer1InputsValueHandler = (value, key) => {
    this.setState({
      ...this.state,
      newContributionData: {
        ...this.state.newContributionData,
        [key]: value
      }
    })
  }
  _galleryImageAddEdit = (input, idx) => {
    const {newContributionData} = this.state
    const reader = new FileReader()
    let galleryImages: any = (newContributionData.galleryImages && [...newContributionData.galleryImages]) || []
    if (input.files) {
      reader.onload = () => {
        galleryImages.splice(idx, 1, reader.result)
        this.setState({
          ...this.state,
          newContributionData: {
            ...newContributionData,
            galleryImages: galleryImages
          }
        })
      }
      input.files[0] && reader.readAsDataURL(input.files[0])
    }
  }
  _videoHandler = (input) => {
    const {newContributionData} = this.state
    this.setState({
      ...this.state,
      newContributionData: {
        ...newContributionData,
        [LAYER1S.GALLERY_VIDEO_NAME]: null
      }
    }, () => {
      if (input) {
        setTimeout(() => this._setStateForFileField(input, LAYER1S.GALLERY_VIDEO_NAME), 10)
      }
    })
  }
  _newCertificateHandler = () => {
    const {newContributionData} = this.state
    const {NEW_CERT_TITLE, NEW_CERT_IMAGE, NEW_CERT_LOGO, NEW_CERT_NEED_FOR_VERIFY} = LAYER1S
    const {certificates} = newContributionData
    const index = newContributionData[LAYER1S.NEW_CERT_INDEX]

    const newCert = {
      [NEW_CERT_TITLE]: newContributionData[NEW_CERT_TITLE],
      [NEW_CERT_IMAGE]: newContributionData[NEW_CERT_IMAGE],
      [NEW_CERT_LOGO]: newContributionData[NEW_CERT_LOGO],
      [NEW_CERT_NEED_FOR_VERIFY]: newContributionData[NEW_CERT_NEED_FOR_VERIFY],
    }

    const newCertificates: any = (certificates && [...certificates]) || []
    const isEditing = (index === 0) || (index > 0)
    const deleteCount = isEditing ? 1 : 0 // determines that creating or updating.
    const start = isEditing ? index : newCertificates.length // if there is index we want to update a certificate. else we only
    // want to add a new certificate in the end of the certificates.

    if (newCert[NEW_CERT_TITLE] && newCert[NEW_CERT_IMAGE]) {
      newCertificates.splice(start, deleteCount, newCert)
      this.setState({
        ...this.state,
        newContributionData: {
          ...newContributionData,
          certificates: newCertificates,
          [LAYER1S.NEW_CERT_TITLE]: "",
          [LAYER1S.NEW_CERT_IMAGE]: "",
          [LAYER1S.NEW_CERT_LOGO]: "",
          [LAYER1S.NEW_CERT_INDEX]: "",
          [LAYER1S.NEW_CERT_NEED_FOR_VERIFY]: false,
        },
      })
    }
  }
  _skillFormTagHandler = (value) => {
    const {skillInfoFormValues, _changeFormSingleFieldValue} = this.props
    const {hashTags} = skillInfoFormValues
    const newHashTags = hashTags.filter(tag => tag.value !== value)
    _changeFormSingleFieldValue(skillInfoFormName, "hashTags", newHashTags)
  }
  _setStateForFileField = (input, key) => {
    const reader = new FileReader()
    if (input.files && key) {
      reader.onload = () => {
        this.setState({
          ...this.state,
          newContributionData: {...this.state.newContributionData, [key]: reader.result}
        })
      }
      input.files[0] && reader.readAsDataURL(input.files[0])
    }
  }
  _setStep = (newStep, status) => {
    this.setState({
          ...this.state,
          activeStep: newStep,
          progressStatus: status,
          wrapperClassName: WRAPPER_CLASS_NAMES.EXITING,
        },
        () => {
          this._afterStepChanging()
        })
  }
  _afterStepChanging = () => {
    setTimeout(() => this.setState({
      ...this.state,
      progressStatus: PROGRESSIVE_STATUS_CHOICES.ACTIVE,
      wrapperClassName: WRAPPER_CLASS_NAMES.ENTERED,
    }), 10)
  }
  _newContributionMainCategoryHandler = (category) => {
    const data = {...this.state.newContributionData, mainCategory: category}
    this.setState({
      ...this.state,
      newContributionData: {
        ...this.state.newContributionData,
        mainCategory: "transition"
      }
    })
    setTimeout(() => this.setState({
      ...this.state,
      newContributionData: data,
      progressSteps: PROGRESS_STEPS[category]
    }), 300)
  }
  _handleModalVisibility = () => {
    const {handleModalVisibility} = this.props
    handleModalVisibility()

    this.setState({
      ...this.state,
      newContributionData: {
        mainCategory: MainCategories[0].value
      },
      activeStep: 1,
      progressSteps: PROGRESS_STEPS[MainCategories[0].value]
    })
  }
  _shareContribution = () => 1
  _introToExchange = () => 1
  _findAgent = () => 1
  _getCertificateHandler = () => 1
  _switchContentByMainCategory = () => {
    const {newContributionData} = this.state
    const {mainCategory} = newContributionData
    switch (mainCategory) {
      case MainCategories[0].value:
        return this._productContentHandler()
      case MainCategories[1].value:
        return this._skillContentHandler()
      default:
        return <span/>
    }
  }
  _renderNewContribution = () => {
    const {newContributionData} = this.state
    return (
        <NewContribution
            categories={MainCategories}
            goToNextStep={this._nextStep}
            goToPrevStep={this._handleModalVisibility}
            selectedCategory={newContributionData.mainCategory}
            selectCategoryHandler={this._newContributionMainCategoryHandler}
        />
    )
  }
  _skillContentHandler = () => {
    const {activeStep, newContributionData} = this.state
    const {hashTags, skillInfoFormValues} = this.props
    switch (activeStep) {
      case 1:
        return this._renderNewContribution()
      case 2:
        return (
            <SkillInfoForm
                goToNextStep={this._submitHandler}
                goToPrevStep={this._prevStep}
                hashTags={hashTags}
                destroyOnUnmount={false}
                formVals={skillInfoFormValues}
                tagHandler={this._skillFormTagHandler}
            />
        )
      case 3:
        return (
            <SkillSuccessMessage
                shareContribution={this._shareContribution}
                finishHandler={this._handleModalVisibility}
            />
        )
      default:
        return <span/>
    }
  }
  _productContentHandler = () => {
    const {newContributionData, activeStep, addingTechPropNow, newTechPropertyData} = this.state

    const {technicalProperties, [LAYER1S.NEW_CERT_INDEX]: newCertIndex} = newContributionData

    const {
      translator, categories, initialInfoFormState, hashTags, countries, provinces, cities, nowCreatedProductId
    } = this.props

    switch (activeStep) {
      case 1:
        return this._renderNewContribution()
      case 2:
        return (
            <InitialInfoReduxForm
                countries={countries}
                destroyOnUnmount={false}
                goToNextStep={this._nextStep}
                goToPrevStep={this._prevStep}
                inputHandler={this._layer1InputsValueHandler}
                newContributionData={newContributionData}
                formVals={initialInfoFormState}
                categories={categories}
                countryChangeHandler={this._countryChangeHandler}
                provinces={provinces}
                provinceChangeHandler={this._provinceChangeHandler}
                cities={cities}
            />
        )
      case 3:
        return (
            <TechnicalProperties
                activationAddPropBlock={this._activationAddTechPropBlock}
                properties={technicalProperties}
                addingTechPropNow={addingTechPropNow}
                inputFillHandler={this._techPropInputFillHandler}
                newPropertyData={newTechPropertyData}
                addOrEditTechProperty={this._addOrEditTechProperty}
                propertiesOrderHandler={this._techPropertiesOrderHandler}
                setNewTechPropertyDate={this._setNewTechPropertyDate}
                goToNextStep={this._nextStep}
                goToPrevStep={this._prevStep}
            />
        )
      case 4:
        return (
            <Certificates
                certificatesImagesHandler={this._certificatesImagesHandler}
                goToNextStep={this._nextStep}
                goToPrevStep={this._prevStep}
                newContributionData={newContributionData}
                setStateForFileField={this._setStateForFileField}
                newCertificateHandler={this._newCertificateHandler}
                inputHandler={this._layer1InputsValueHandler}
                certificateIndexHandler={this._certificateIndexHandler}
                newCertIndex={newCertIndex}
            />
        )
      case 5:
        return (
            <GalleryAndTags
                translator={translator && translator.addingContribution}
                tags={tags}
                tagsSelectionHandler={this._tagsSelectionHandler}
                newContributionData={newContributionData}
                deleteTag={this._deleteTag}
                imageAddEditHandler={this._galleryImageAddEdit}
                imageDeleteHandler={this._galleryImageDelete}
                setMainGalleryImageIndex={this._setMainGalleryImageIndex}
                goToNextStep={this._submitHandler}
                goToPrevStep={this._prevStep}
                videoHandler={this._videoHandler}
                hashTags={hashTags}
            />
        )
      case 6:
        return (
            <SuccessMessage
                shareContribution={this._shareContribution}
                introToExchange={this._introToExchange}
                findAgent={this._findAgent}
                getCertificateHandler={this._getCertificateHandler}
                finishHandler={this._handleModalVisibility}
                nowCreatedId={nowCreatedProductId}
            />
        )
      default:
        return <span/>
    }
  }

  nextLevel() {
    let {currentLevel} = this.state
    switch (currentLevel) {
      case "one":
        this.setState({...this.state, currentLevel: "two"})
        break
      case "two":
        this.setState({...this.state, currentLevel: "three"})
        break
      case "three":
        this.setState({...this.state, currentLevel: "four"})
        break
      case "four":
        this.setState({...this.state, currentLevel: "five"})
        break
      default :
        this.setState({...this.state, currentLevel: "one"})
        break
    }
  }

  previousLevel() {
    let {currentLevel} = this.state
    switch (currentLevel) {
      case "two":
        this.setState({...this.state, currentLevel: "one"})
        break
      case "three":
        this.setState({...this.state, currentLevel: "two"})
        break
      case "four":
        this.setState({...this.state, currentLevel: "three"})
        break
      case "five":
        this.setState({...this.state, currentLevel: "four"})
        break
      default :
        this.setState({...this.state, currentLevel: "one"})
        break
    }
  }

  renderProgressBar() {
    let {currentLevel} = this.state
    return (
        <div className={"contribution-progress-bar"}>
          <div className={"level-container-active"}>
            <CircularAddIcon className={"progress-step-icon level-container-svg add"}/>
            <div className={"level-container-text"}>
              آوردۀ جدید
            </div>
          </div>
          <div className={currentLevel !== "one" ? "level-container-active" : "level-container"}>
            <InformationIcon className={"progress-step-icon level-container-svg info " + currentLevel}/>
            <div className={"level-container-text"}>
              اطلاعات اولیه
            </div>
          </div>
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
          <div className={currentLevel === "five" ? "level-container-active" : "level-container"}>
            <ContributionIcon className={"progress-step-icon level-container-svg contribution " + currentLevel}/>
            <div className={"level-container-text"}>
              مدیریت ویترین
            </div>
          </div>
          <div className={"level-bar"}/>
          <div className={"level-bar-progress " + currentLevel}/>
        </div>
    )
  }

  _changeSelectedType = (selected) => {
    this.setState({...this.state, selectedType: selected})
  }

  _handleCatLvlChange(text, level) {
    console.log(text)
    if (level === "one") {
      this.setState({...this.state, selectedCatLvlOne: text})
    } else if (level === "two") {
      this.setState({...this.state, selectedCatLvlTwo: text})
    } else if (level === "three") {
      this.setState({...this.state, selectedCatLvlThree: text})
    }
  }

  renderCurrentLevel() {
    let {
      currentLevel,
      selectedType,
      selectedCatLvlOne,
      selectedCatLvlTwo,
      selectedCatLvlThree,
      inteliMenu,
      priceType
    } = this.state
    switch (currentLevel) {
      case "one":
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
                    توانمندی‌ها تاییدیه‌ها گواهی‌نامه‌ها خدمات مشاوره. زیرساخت‌های قابل اشتراک از انواع آورده در
                    سامانه اینوین هستند.
                  </p>
                </div>
              </div>
              <div className={"contribution-description-options-area"}>
                <div className={"text"}>انتخاب نوع آورده:</div>
                <div className={"contribution-description-options"}>

                  <Material backgroundColor='rgba(71,91,112,0.5)' className={selectedType === "Product" ? "contribution-material-block-active" : "contribution-material-block"} content={
                    <div onClick={() => this._changeSelectedType("Product")}
                         className={selectedType === "Product" ? "contribution-description-option-block-active" : "contribution-description-option-block"}>
                      <ContributionIcon className={"option-contribution-svg"}/>
                      <div className={"option-contribution-text"}>محصول</div>
                    </div>
                  }/>

                  <Material backgroundColor='rgba(71,91,112,0.5)' className={selectedType === "Ability" ? "contribution-material-block-active" : "contribution-material-block"} content={
                    <div
                        onClick={() => this._changeSelectedType("Ability")}
                        className={selectedType === "Ability" ? "contribution-description-option-block-active" : "contribution-description-option-block"}>
                      <SkillIcon className="option-contribution-svg-smaller"/>
                      <div className={"option-contribution-text"}>توانمندی</div>
                    </div>
                  }/>

                  <Material backgroundColor='rgba(71,91,112,0.5)' className={selectedType === "Certificate" ? "contribution-material-block-active" : "contribution-material-block"} content={
                    <div
                        onClick={() => this._changeSelectedType("Certificate")}
                        className={selectedType === "Certificate" ? "contribution-description-option-block-active" : "contribution-description-option-block"}>
                      <CertificateIcon className="option-contribution-svg-smaller"/>
                      <div className={"option-contribution-text"}>تاییدیه</div>
                    </div>
                  }/>

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

                </div>
              </div>
            </div>
        )
      case "two":
        let namesList = ["کامپیوتر", "الکترونیک", "نرم افزار", "سخت افزار", "طراحی", "انیمیشن"]
        return (
            <div className="contribution-product-two">
              <div className={"gray-text-input-label-container"}>
                <label className="gray-text-input-label">عنوان آورده:</label>
                <input type="text" className="form-control gray-text-input"/>
              </div>
              <div className={"gray-text-input-label-container"}>
                <label className="gray-text-input-label">محدوده جغرافیایی:</label>
                <input type="text" className="form-control gray-text-input"/>
              </div>
              <div className={"gray-text-input-label-container"}>
                <label className="gray-text-input-label">طبقه اول دسته بندی:</label>
                <InteliInput handleChange={(text) => this._handleCatLvlChange(text, "one")} list={namesList}/>
              </div>
              <div className={"gray-text-input-label-container"}>
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
              </div>
              <div className={"gray-text-input-label-container"}>
                <label className="gray-text-input-label">طبقه دوم دسته بندی:</label>
                <InteliInput handleChange={(text) => this._handleCatLvlChange(text, "two")} list={namesList}/>

                <div className={"gray-text-input-label-container full"}>
                  <label className="gray-text-input-label">طبقه سوم دسته بندی:</label>
                  <InteliInput handleChange={(text) => this._handleCatLvlChange(text, "three")} list={namesList}/>
                </div>
              </div>
              <div className={"gray-text-input-label-container"}>
                <label className="gray-text-input-label">توصیف اجمالی محصول:</label>
                <textarea name="description" className="form-control gray-textarea-input"/>
              </div>
            </div>
        )
      case "three":
        return (
            <div className="contribution-description">
              <div className="icon-wrapper">
                <TipsIcon className="tip-icon"/>
              </div>
              <div className="contribution-desc-txt">
                <p>
                  مرحله ی سوم
                </p>
              </div>
            </div>
        )
      case "four":
        return (
            <div className="contribution-description">
              <div className="icon-wrapper">
                <TipsIcon className="tip-icon"/>
              </div>
              <div className="contribution-desc-txt">
                <p>
                  مرحله ی چهارم
                </p>
              </div>
            </div>
        )
      case "five":
        return (
            <div className="contribution-description">
              <div className="icon-wrapper">
                <TipsIcon className="tip-icon"/>
              </div>
              <div className="contribution-desc-txt">
                <p>
                  مرحله ی پنجم
                </p>
              </div>
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

  renderFooter() {
    let {currentLevel} = this.state
    return (
        <div className={"contribution-footer"}>
          <button className={"next-button"}>
            {
              currentLevel === "five" ?
                  <div onClick={() => this._closeModal()}>
                    ثبت
                  </div>
                  :
                  <div onClick={() => this.nextLevel()}>
                    بعدی
                  </div>
            }
          </button>

          <button className={currentLevel === "one" ? "previous-button-hidden" : "previous-button"} onClick={() => this.previousLevel()}>
            قبلی
          </button>

        </div>
    )
  }

  _closeModal() {
    this.setState({...this.state, currentLevel: "one"}, this.props.handleModalVisibility())
  }

  _priceHandler = (value) => {
    this.setState({...this.state, priceType: value})
  }

  render() {
    const {activeStep, progressSteps, progressStatus, wrapperClassName, newContributionData} = this.state
    const {mainCategory = ""} = newContributionData
    const {currentLevel} = this.state
    const {modalIsOpen} = this.props
    return (
        <div
            // className={modalIsOpen ? "contribution-modal-container" : "contribution-modal-container-out"}
        >
{/*
          {this.renderProgressBar()}

          {this.renderCurrentLevel()}

          {this.renderFooter()}
*/}

          <Modal className="exchanges-modal" size="lg" isOpen={modalIsOpen} backdrop={false}>
           <ModalBody className="adding-contribution-wrapper">
           <FontAwesome name="times" size="2x" className="close-btn"
           onClick={this._handleModalVisibility}/>
           <div className={`progressive-wrapper ${mainCategory}`}>
           <MenuProgressive
           steps={progressSteps}
           activeStep={activeStep}
           status={progressStatus}
           // stepsClassName={mainCategory}
           />
           </div>
           <div className={`wrapper ${wrapperClassName}`}>
           {this._switchContentByMainCategory()}
           </div>
           </ModalBody>
           </Modal>

        </div>
    )
  }
}

const mapStateToProps = (state) => {
  const initialFormValues = getFormValues(state, "addingContributionInitialInfoForm")
  const provinceId = initialFormValues.product_related_province ? initialFormValues.product_related_province.value : ""
  const countryId = initialFormValues.product_related_country ? initialFormValues.product_related_country.value : ""
  const citySelectorByProvinceId = makeCitySelectorByProvinceId()
  const provinceSelectorByProvinceId = makeProvinceSelectorByCountryId()
  const categorySelector = makeCategorySelector()

  // const provinces =
  return {
    translator: getMessages(state),
    categories: categorySelector(state),
    initialInfoFormState: initialFormValues,
    skillInfoFormValues: getFormValues(state, skillInfoFormName),
    hashTags: hashTagsListSelector(state),
    countries: countrySelector(state),
    provinces: provinceSelectorByProvinceId(state, countryId),
    cities: citySelectorByProvinceId(state, provinceId),
    testToken: state.auth.client.token,
    nowCreatedProductId: nowCreatedProductIdSelector(state),
    nowCreatedSkillId: nowCreatedSkillIdSelector(state),
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
          _createSkillAction: createSkillAction
        },
        dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddingContribution)