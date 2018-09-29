// @flow
import * as React from 'react'
import {Component} from 'react'
import {Modal, ModalBody} from 'reactstrap'
import MenuProgressive from '../progressive/penu-progressive'
import TechnicalProperties from './product/technicalProperties'
import NewContribution from './newConribution'
import Certificates from './product/certificates'
import {
  MainCategories,
  WRAPPER_CLASS_NAMES,
  PROGRESSIVE_STATUS_CHOICES,
  CERTIFICATES_IMG_IDS,
  tags,
  PROGRESS_STEPS,
  LAYER1S
} from './addingConributionData'
import GalleryAndTags from './product/galleryAndTags'
import {getMessages} from "../../../redux/selectors/translateSelector"
import {connect} from "react-redux";
import SuccessMessage from './product/successMessage'
import FontAwesome from "react-fontawesome"
import client from 'src/consts/client'
import InitialInfoReduxForm, {initialInfoFormName} from './product/reduxFormInitialInfo'
import {getFormValues} from 'src/redux/selectors/formValuesSelectors'
import {categorySelector} from 'src/redux/selectors/common/category'
import {getCategories} from 'src/redux/actions/commonActions/categoryActions'
import {bindActionCreators} from "redux"
import {getHashTags} from "src/redux/actions/commonActions/hashTagActions"
import {hashTagsListSelector} from "src/redux/selectors/common/hashTag"
import {createProductAsContribution} from "src/redux/actions/commonActions/productActions/productActions"
import {getCountries, getProvinces, getCities} from "src/redux/actions/commonActions/location"
import countrySelector from "src/redux/selectors/common/location/country"
import {provinceSelector} from "src/redux/selectors/common/location/province"
import {citySelector} from "src/redux/selectors/common/location/city"
import {change} from 'redux-form';
import nowCreatedProductIdSelector from "src/redux/selectors/common/product/getNowCreatedProductId"
import nowCreatedSkillIdSelector from "src/redux/selectors/skill/getNowCreatedSkillId"
import SkillInfoForm, {skillInfoFormName} from "./skill/infoForm";
import SkillSuccessMessage from "./skill/successMessage"
import {createSkillAction} from "src/redux/actions/skill/createSkillAction"
import type {NewContributionDataType, SkillFormValsType} from "./types"
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


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
  wrapperClassName: string,
  activeStep: number,
  progressSteps: Array<ProgressStepType>,
  progressStatus: string,
  newContributionData: NewContributionDataType,
  addingTechPropNow: boolean,
  newTechPropertyData: NewTechPropertyDataType,
}
class AddingContribution extends Component<AddingContributionProps, AddingContributionState> {
  constructor(props) {
    super(props);
    this.state = {
      wrapperClassName: WRAPPER_CLASS_NAMES.ENTERING,
      activeStep: 1,
      progressSteps: PROGRESS_STEPS.product,
      progressStatus: PROGRESSIVE_STATUS_CHOICES.ACTIVE,
      newContributionData: {},
      addingTechPropNow: false,
      newTechPropertyData: {},
    };
  }

  componentDidMount() {
    const {_getCategories, _getHashTags} = this.props
    _getCategories()
    _getHashTags()
    this._newContributionMainCategoryHandler(MainCategories[0].value)
  }

  componentDidUpdate(prevProps, prevState) {
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
    const isActive: boolean = (key === 'click')
    this.setState({
      ...this.state,
      addingTechPropNow: isActive
    })

  }

  _techPropertiesOrderHandler = (result) => {
    const {source, destination} = result;
    if (!destination) {
      return;
    }
    let sourceIndex, destinationIndex
    const {technicalProperties=[]} = this.state.newContributionData
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
    );
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
        _changeFormSingleFieldValue(initialInfoFormName, LAYER1S.PROVINCE, '')
      }
    }

  } // used in initialInfo

  _provinceChangeHandler = v => {
    const {_changeFormSingleFieldValue, _getCities, initialInfoFormState = {}} = this.props
    v && _getCities(v.value)
    if (initialInfoFormState[LAYER1S.PROVINCE]) {
      if (initialInfoFormState[LAYER1S.PROVINCE].value !== v.value) {
        _changeFormSingleFieldValue(initialInfoFormName, LAYER1S.CITY, '')
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
    const {tags=[]} = newContributionData
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

    const newCertificates : any = (certificates && [...certificates]) || []
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
          [LAYER1S.NEW_CERT_TITLE]: '',
          [LAYER1S.NEW_CERT_IMAGE]: '',
          [LAYER1S.NEW_CERT_LOGO]: '',
          [LAYER1S.NEW_CERT_INDEX]: '',
          [LAYER1S.NEW_CERT_NEED_FOR_VERIFY]: false,
        },
      })
    }
  }
  _skillFormTagHandler = (value) => {
    const {skillInfoFormValues, _changeFormSingleFieldValue} = this.props
    const {hashTags} = skillInfoFormValues
    const newHashTags = hashTags.filter(tag => tag.value !== value)
    _changeFormSingleFieldValue(skillInfoFormName, 'hashTags', newHashTags)
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
        mainCategory: 'transition'
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
        return <span />
    }
  }

  render() {
    const {activeStep, progressSteps, progressStatus, wrapperClassName, newContributionData} = this.state
    const {mainCategory=''} = newContributionData
    const {modalIsOpen} = this.props
    return (
        <div>
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
    );
  }
}

const mapStateToProps = (state) => ({
    translator: getMessages(state),
    categories: categorySelector(state),
    initialInfoFormState: getFormValues(state, 'addingContributionInitialInfoForm'),
    skillInfoFormValues: getFormValues(state, skillInfoFormName),
    hashTags: hashTagsListSelector(state),
    countries: countrySelector(state),
    provinces: provinceSelector(state),
    cities: citySelector(state),
    testToken: state.auth.client.token,
    nowCreatedProductId: nowCreatedProductIdSelector(state),
    nowCreatedSkillId: nowCreatedSkillIdSelector(state)
  })

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
        dispatch
    );


export default connect(mapStateToProps, mapDispatchToProps)(AddingContribution)