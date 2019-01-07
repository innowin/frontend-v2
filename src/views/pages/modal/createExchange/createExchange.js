// @flow
import * as React from "react"
import {Component} from "react"
import {progressiveSteps} from "./createExchangeData"
import FontAwesome from "react-fontawesome"
import {Modal, ModalBody} from "reactstrap"
import MenuProgressive from "../../progressive/penu-progressive"
import {
  PROGRESSIVE_STATUS_CHOICES, WRAPPER_CLASS_NAMES, exchangeFields, SOCIAL, exchangeIdentityFields
} from "./createExchangeData"
import BasicInfo from "./basicInfo"
import People from "./people"
import MoreInfo from "./moreInfo"
import SuccessMessage from "./successMessage"
import {ThinDownArrow, ShareIcon, ImageUploadSvg, UploadIcon} from "src/images/icons"
import {createFile, getFiles} from "../../../../redux/actions/commonActions/fileActions"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import makeFileSelectorByKeyValue from "../../../../redux/selectors/common/file/selectFilsByKeyValue"
import type {ImageType} from "./basicInfo"
import {hashTagsListSelector} from "../../../../redux/selectors/common/hashTags/hashTag"
import helpers from "../../../../consts/helperFunctions/helperFunctions"
import type {TagAsOptionType} from "../../adding-contribution/types"
import socialActions from "../../../../redux/actions/commonActions/socialActions"
import exchangeActions from "../../../../redux/actions/exchangeActions"
import constants from "../../../../consts/constants"
import type {PersonType} from "./people"
import exchangeMembershipActions from "../../../../redux/actions/commonActions/exchangeMembershipActions"
import {getFolloweesSelector} from "src/redux/selectors/common/social/getFollowees"
import {ClipLoader} from "react-spinners"


type HashTagType = {
  id: string,
  title: string,
  usage: number
}

type CreateExchangeProps = {
  modalIsOpen: boolean,
  handleModalVisibility: Function,
  identity: string,
  getFiles: (string) => void,
  createFile: (any) => void,
  hisFiles: Array<ImageType>,
  hashTags: { [string]: HashTagType },
  getFollowees: Function,
  social: Array<PersonType>,
  createExchange: Function,
  addMember: Function,
  createdExchange: { id: string, owner: string },
  members: Array<{}>,
  auth: any
}

type CreateExchangeState = {
  activeStep: number,
  progressStatus: string,
  wrapperClassName: string,
  formData: { [string]: string },
  selectedImage?: any,
  selectedTags: Array<TagAsOptionType>,
  searchKey?: string,
  created?: boolean,
  inActPeopleIds: Array<string>,
  processing: boolean,
}
const initialState = {
  activeStep: 1,
  progressStatus: PROGRESSIVE_STATUS_CHOICES.ACTIVE,
  wrapperClassName: WRAPPER_CLASS_NAMES.ENTERING,
  formData: {},
  selectedTags: [],
  inActPeopleIds: [], // ids of people that doing some action (like adding to exchange members) on theme in this time.
  processing: false,
}

class CreateExchange extends Component<CreateExchangeProps, CreateExchangeState> {
  constructor() {
    super()
    this.state = {
      ...initialState,
      name: "",
      isPrivate: false,
      description: "",
      exchangeImage: null,
    }
  }

  componentDidMount() {
    const {identity, getFollowees, auth} = this.props
    const query = `?identity=${identity}`
    getFiles(query)
    let getFolloweesPayload
    if (auth.client.organization) {
      getFolloweesPayload = {
        followOwnerIdentity: auth.client.identity.content,
        followOwnerType: constants.USER_TYPES.ORG,
        followOwnerId: auth.client.organization.id
      }
    } else {
      getFolloweesPayload = {
        followOwnerIdentity: auth.client.identity.content,
        followOwnerType: constants.USER_TYPES.PERSON,
        followOwnerId: auth.client.user.id
      }
    }
    getFollowees(getFolloweesPayload)
  }

  componentDidUpdate(prevProps, prevState) {
    const {hisFiles, createdExchange, members} = this.props
    const {inActPeopleIds, exchangeImageFlag} = this.state
    const lastFile = hisFiles[hisFiles.length - 1] || {}
    const prevLastFile = prevProps.hisFiles[prevProps.hisFiles.length - 1] || {}
    if (exchangeImageFlag) {
      if (lastFile.id && prevLastFile.id) {
        if (lastFile.id !== prevLastFile.id) {
          this._imageHandler(lastFile)
        }
      }
    }
    if (prevState.exchangeImage !== this.state.exchangeImage && this.state.exchangeImage !== null) {
      this.setState({...this.state, processing: false})
      console.log("NO PROCESS")
    }
    /*
     if ((prevProps.createdExchange.id !== createdExchange.id) && createdExchange.id) {
     this.setState({...this.state, created: true})
     this._processingHandler()
     this._goToNextStep()
     }
     const newInActPeopleIds = [...inActPeopleIds]
     inActPeopleIds.forEach(id => {
     const isInMembers = members.some(m => m[exchangeIdentityFields.identity].id === id)
     const wasInMembers = prevProps.members.some(m => m[exchangeIdentityFields.identity].id === id)
     if ((isInMembers && !wasInMembers) || (!isInMembers && wasInMembers)) {
     newInActPeopleIds.splice(newInActPeopleIds.indexOf(id), 1)
     }
     })
     if (inActPeopleIds.length !== newInActPeopleIds.length) {
     this.setState({
     ...this.state,
     inActPeopleIds: newInActPeopleIds
     })
     }
     */
  }

  _processingHandler = () => this.setState({...this.state, processing: !this.state.processing})

  _createExchange = () => {
    // this._goToNextStep()
    // this.setState({...this.state, created: true})
    if (!this.state.created) {
      this._processingHandler()
      this.props.createExchange(this.state.formData)
    } else this._goToNextStep()
    // fixme: should update exchange if (this.state.created === true)
  }
  _addMember = (id) => {
    const {createdExchange, addMember} = this.props
    this.setState({
      ...this.state,
      inActPeopleIds: [...this.state.inActPeopleIds, id]
    })
    addMember({
      identityId: id,
      exchangeIdentity: createdExchange.id
    })
  }
  _setStep = (newStep: number, status: string) => {
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

  _inputHandler = (fieldName: string) => {
    return (value: string | number | boolean) => {
      this.setState({
        ...this.state,
        formData: {
          ...this.state.formData,
          [fieldName]: value
        }
      })
    }
  }

  _uploadHandler = (fileString: any) => {
    const reader = new FileReader()
    if (fileString) {
      reader.onload = () => {
        this.setState({
          ...this.state,
          selectedImage: reader.result,
          exchangeImageFlag: true,
        }, this._createFile)
      }
      reader.readAsDataURL(fileString)
    }
  }
  _createFile = () => {
    const {createFile} = this.props
    this.setState({...this.state, processing: true})
    console.log("PROCESS...")
    createFile({file_string: this.state.selectedImage})
  }
  _imageHandler = (img: ImageType) => {
    this.setState({
      ...this.state,
      selectedImage: img.file,
      exchangeImage: img.id,
      exchangeImageFlag: false,
      formData: {
        ...this.state.formData,
        [exchangeFields.image]: img.id
      }
    })
  }
  _afterStepChanging = () => {
    setTimeout(() => this.setState({
      ...this.state,
      progressStatus: PROGRESSIVE_STATUS_CHOICES.ACTIVE,
      wrapperClassName: WRAPPER_CLASS_NAMES.ENTERED,
    }), 10)
  }

  _goToNextStep = () => {
    const {activeStep} = this.state
    if (activeStep < progressiveSteps.length + 1) {
      this._setStep(activeStep + 1, PROGRESSIVE_STATUS_CHOICES.GOING_NEXT)
    }
  }
  _goToPrevStep = () => {
    const {activeStep} = this.state
    if (activeStep !== 1) {
      this._setStep(activeStep - 1, PROGRESSIVE_STATUS_CHOICES.GOING_PREV)
    }
  }

  _tagAddHandler = (tags: Array<TagAsOptionType>) => {
    const tagSet = new Set(tags)
    this.setState({
      ...this.state,
      selectedTags: [...tagSet]
    })
  }

  _deleteTagHandler = (id) => {
    this.setState({
      ...this.state,
      selectedTags: this.state.selectedTags.filter(tag => tag.value !== id)
    })
  }

  _handleModalVisibility = () => {
    this.setState(initialState)
    this.props.handleModalVisibility()
  }
  _searchHandler = (key) => this.setState({
    ...this.state,
    searchKey: key
  })
  _setContent = () => {
    const {activeStep, formData, selectedImage, selectedTags, searchKey = "", inActPeopleIds, processing} = this.state
    const {hisFiles, hashTags, social, members, createdExchange} = this.props
    const tags = helpers.objToArrayAsOptions(hashTags, "id", "title", ["usage"])
    const basicInfoBtnBarActs = [
      {
        title: "لغو",
        func: this._handleModalVisibility
      },
      {
        title: "بعدی",
        func: this._goToNextStep,
        icon: (<ThinDownArrow className="left-arrow"/>)
      }
    ]
    const moreInfoBtnBarActs = [
      {
        title: "قبلی",
        func: this._goToPrevStep,
        icon: (<ThinDownArrow className="right-arrow"/>)
      },
      {
        title: "بعدی",
        func: this._createExchange,
        icon: (<ThinDownArrow className="left-arrow"/>)
      }
    ]
    const peopleBtnBarActs = [
      {
        title: "قبلی",
        func: this._goToPrevStep,
        icon: (<ThinDownArrow className="right-arrow"/>)
      },
      {
        title: "بعدی",
        func: this._goToNextStep,
        icon: (<ThinDownArrow className="left-arrow"/>)
      }
    ]
    const successMessageActs = [
      // {
      //   title: 'به اشتراک بگذارید',
      //   func: () => console.log('created successFully'),
      //   icon: (<ShareIcon className="right-arrow"/>)
      // },
      {
        title: "پایان",
        func: this._handleModalVisibility,
      }
    ]
    switch (activeStep) {
      case 1:
        return (
            <BasicInfo
                processing={processing}
                btnBarActs={basicInfoBtnBarActs}
                formData={formData}
                uploadHandler={this._uploadHandler}
                imageHandler={this._imageHandler}
                inputHandler={this._inputHandler}
                selectedImage={selectedImage || ""}
                selectionImages={hisFiles}
            />
        )
      case 2:
        return (
            <MoreInfo
                processing={processing}
                inputHandler={this._inputHandler}
                btnBarActs={moreInfoBtnBarActs}
                deleteTagHandler={this._deleteTagHandler}
                desc={formData ? formData[exchangeFields.desc] : ""}
                selectedTags={selectedTags}
                tagAddHandler={this._tagAddHandler}
                tags={tags}
            />
        )
      case 3:
        return (
            <People
                people={social}
                btnBarActs={peopleBtnBarActs}
                searchHandler={this._searchHandler}
                searchKey={searchKey}
                addMember={this._addMember}
                members={members}
                inActIds={inActPeopleIds}
            />
        )
      case 4:
        return (
            <SuccessMessage
                acts={successMessageActs}
                exchangeId={createdExchange.id}
            />
        )
      default:
        return <span/>
    }
  }

  _handleCloseModal() {
    let {handleModalVisibility} = this.props
    handleModalVisibility()
  }

  _handleCreateExchange() {
    let {name, description, exchangeImage, isPrivate} = this.state
    if (name.length > 3 && name.length <= 32 && description.length < 100) {
      let {createExchange, handleModalVisibility} = this.props
      let formValues = {
        name: name,
        private: isPrivate,
        description: description,
        exchange_image: exchangeImage,
      }
      createExchange(formValues)
      handleModalVisibility()
    } else {
      console.log("Illegal Length")
    }
  }

  render() {
    const {activeStep, progressStatus, wrapperClassName, name, description, processing, selectedImage} = this.state
    const {modalIsOpen, translate} = this.props
    const pageContent = this._setContent()
    return (
        <div
            className={modalIsOpen ? "create-exchange-modal-container" : "create-exchange-modal-container-out"}
        >

          <div className="create-exchange-close-icon" onClick={() => this._handleCloseModal()}>
            ✕
          </div>

          <div className={"create-exchange-header"}>
            {translate["Create New Exchange"]}
          </div>
          <div className={"create-exchange-header-desc"}>
            پنجره، گروهی متشکل از ارائه‌دهندگان و متقاضیان محصولات، خدمات و مهارت هاست.
          </div>

          <div className={"create-exchange-inputs"}>
            <div>
              <label>
                {translate["Exchange Name"]} <span className={"secondary-color"}>*</span>
              </label>
              <input type={"text"} className={"create-exchange-name-input"} placeholder={translate["Exchange Name"]}
                     onChange={(e) => this.setState({...this.state, name: e.target.value})}/>
              <div className={name.length < 32 ? "create-exchange-name-input-limit" : "create-exchange-name-input-limited"}>
                {name.length} / 32
              </div>
            </div>
            <div>
              <label>
                {translate["Exchange Description"]}
              </label>
              <textarea className={"create-exchange-desc-input"} placeholder={"موضوع فعالیت این پنجره چیست؟"}
                        onChange={(e) => this.setState({...this.state, description: e.target.value})}/>
              <div className={description.length < 100 ? "create-exchange-desc-input-limit" : "create-exchange-desc-input-limited"}>
                {description.length} / 100
              </div>
            </div>
            <div>
              <label>
                {translate["Upload Picture"]}
              </label>
              <div className={"create-exchange-upload"}>
                {selectedImage !== undefined && selectedImage !== null && !processing ?
                    <img alt={"image"} src={selectedImage} className={"create-exchange-upload-image"}/>
                    :
                    <UploadIcon className={"create-exchange-upload-svg"}/>
                }
                <input type="file" onChange={!processing ? (e => this._uploadHandler(e.currentTarget.files[0])) : console.log("Still Uploading")}/>
              </div>
            </div>
          </div>

          <div className={"create-exchange-buttons"}>
            <button className={"create-exchange-success-button"} onClick={() => !processing ? this._handleCreateExchange() : null}>
              {processing ?
                  <ClipLoader color="#35495c" size={17} loading={true}/>
                  :
                  translate["Create"]
              }
            </button>
            <button className={"create-exchange-cancel-button"} onClick={() => this._handleCloseModal()}>
              {translate["Cancel"]}
            </button>
          </div>

          {/*<Modal className="exchanges-modal" size="lg" isOpen={modalIsOpen} backdrop={false}>*/}
          {/*<ModalBody className="create-exchange-wrapper">*/}
          {/*<FontAwesome*/}
          {/*name="times"*/}
          {/*size="2x"*/}
          {/*className="close-btn"*/}
          {/*onClick={this._handleModalVisibility}*/}
          {/*/>*/}
          {/*<div className="progressive-wrapper">*/}
          {/*<MenuProgressive*/}
          {/*steps={progressiveSteps}*/}
          {/*activeStep={activeStep}*/}
          {/*status={progressStatus}*/}
          {/*/>*/}
          {/*</div>*/}
          {/*<div className={`wrapper ${wrapperClassName}`}>*/}
          {/*{pageContent}*/}
          {/*</div>*/}
          {/*</ModalBody>*/}
          {/*</Modal>*/}

        </div>
    )
  }
}

const mapStateToProps = (state) => {
  const identity = state.auth.client.identity.content
  const auth = state.auth
  // const {ownerId, identityType} = ownProps
  const getFolloweesProps = auth.client.organization ?
      {
        identityId: auth.client.identity.content,
        ownerId: auth.client.organization.id,
        identityType: constants.USER_TYPES.ORG,
      }
      :
      {
        identityId: auth.client.identity.content,
        ownerId: auth.client.user.id,
        identityType: constants.USER_TYPES.PERSON
      }

  const fileSelectorByKeyValue = makeFileSelectorByKeyValue()
  const exchangeId = state.exchanges.nowCreatedId
  const members = state.common.exchangeMembership.list ?
      Object.values(state.common.exchangeMembership.list).filter((m: any) =>
          m[exchangeIdentityFields.exchange] && m[exchangeIdentityFields.exchange].id === exchangeId)
      : {}
  const social = SOCIAL.reduce((res, item) => {
    if (res.some(i => i.id === item.follow_follower.id)) return res
    else return [...res, {
      ...item.follow_follower,
      file: "http://restful.daneshboom.ir/media/75f00defdde44fd4b0d8bee05617e9c7.jpg",
    }]
  }, [])
  return {
    identity,
    hisFiles: fileSelectorByKeyValue(state, "identity", identity),
    hashTags: hashTagsListSelector(state),
    social: getFolloweesSelector(state, getFolloweesProps),
    createdExchange: state.exchanges.list[exchangeId] || {},
    members,
    auth: state.auth,
    translate: state.intl.messages || {},
  }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
          getFiles,
          getFollowees: socialActions.getFollowees,
          createFile,
          createExchange: exchangeActions.createExchange,
          addMember: exchangeMembershipActions.createExchangeMembership,
        },
        dispatch
    )
export default connect(mapStateToProps, mapDispatchToProps)(CreateExchange)