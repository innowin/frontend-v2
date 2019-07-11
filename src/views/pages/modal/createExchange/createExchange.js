import React from 'react'
import {Component} from 'react'
import uuid from 'uuid'
import {UploadIcon} from 'src/images/icons'
import constants from 'src/consts/constants'
import {createFileFunc} from 'src/views/common/Functions'
import exchangeActions from 'src/redux/actions/exchangeActions'
import {bindActionCreators} from 'redux'
import {ClipLoader} from 'react-spinners'
import {connect} from 'react-redux'
import {createFile} from 'src/redux/actions/commonActions/fileActions'
import types from 'src/redux/actions/types'
import TempActions from 'src/redux/actions/tempActions'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {getAllOfExchanges} from '../../../../redux/selectors/common/exchanges/GetAllExchanges'

class CreateExchange extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 1,
      formData: {},
      selectedTags: [],
      inActPeopleIds: [], // ids of people that doing some action (like adding to exchange members) on theme in this time.
      processing: false,
      name: '',
      isPrivate: false,
      description: '',
      exchangeImage: null,
      exchangeImageFlag: false,
    }
  }

  componentDidUpdate(prevProps, prevState, SS) {
    const {tempFiles} = this.props
    const {exchangeImageFlag} = this.state
    const doc = document

    if (exchangeImageFlag && tempFiles.exchange_image) {
      this.setState({
        ...this.state,
        exchangeImageFlag: false,
        processing: false,
      })
    }

    if (prevState.exchangeImage !== this.state.exchangeImage && this.state.exchangeImage !== null) {
      this.setState({...this.state, processing: false})
      console.log('NO PROCESS')
    }

    if (this.props.modalIsOpen) {
      doc.body.style.overflow = 'hidden'
      doc.body.style.paddingRight = '7px'
    }
    else {
      doc.body.style.overflow = 'auto'
      doc.body.style.paddingRight = '0'
    }
  }

  _uploadHandler = (fileString) => {
    const reader = new FileReader()
    if (fileString) {
      reader.onload = () => {
        this.setState({
          ...this.state,
          selectedImage: reader.result,
          selectedImageFile: fileString,
          exchangeImageFlag: true,
        }, this._createFile)
      }
      reader.readAsDataURL(fileString)
    }
  }

  _createFile = () => {
    const {createFile} = this.props
    this.setState({...this.state, processing: true})
    console.log('PROCESS...')

    const nextActionType = types.COMMON.FILE.SET_FILE_IDS_IN_TEMP_FILE
    const nextActionData = 'exchange_image'
    const createArguments = {
      fileIdKey: 'fileId',
      nextActionType,
      nextActionData: {tempFileKeyName: nextActionData},
    }
    const file = {fileId: uuid(), formFile: this.state.selectedImageFile}
    const fileString = this.state.selectedImage
    createFileFunc(createFile, fileString, createArguments, constants.CREATE_FILE_TYPES.IMAGE, constants.CREATE_FILE_CATEGORIES.EXCHANGE.IMAGE, file)
  }

  _handleCloseModal() {
    let {handleModalVisibility} = this.props
    handleModalVisibility()
  }

  _handleCreateExchange() {
    const {name, description, isPrivate} = this.state

    if (name.length > 2 && name.length <= 32 && description.length < 700) {
      let {createExchange, handleModalVisibility, removeFileFromTemp, tempFiles} = this.props
      let formValues = {
        name: name,
        private: isPrivate,
        description: description,
        exchange_image: tempFiles.exchange_image ? tempFiles.exchange_image : null,
      }
      createExchange(formValues)
      removeFileFromTemp('exchange_image')
      handleModalVisibility()
      this.exName.value = ''
      this.exDes.value = ''
      this.exPic.value = null
      this.setState({
        ...this.state,
        name: '',
        description: '',
        exchangeImage: null,
        selectedImage: null,
        selectedImageFile: null,
        isPrivate: false,
        processing: false,
      })
    }
    else {
      if (description.length >= 700) {
        this.descError.className = 'product-name-error'
      }
      else this.descError.className = 'product-name-error-hide'
      if (name.length < 2 || name.length > 32) {
        this.nameError.className = 'product-name-error'
      }
      else this.nameError.className = 'product-name-error-hide'
    }
  }

  render() {
    const {name, description, processing, selectedImage} = this.state
    const {modalIsOpen, translate} = this.props

    return (
        <div className={modalIsOpen ? 'create-exchange-modal-container' : 'create-exchange-modal-container-out'}>
          <TransitionGroup>
            {modalIsOpen ?
                <CSSTransition key={10} timeout={250} classNames='fade'>
                  <div className="create-exchange-close-icon" onClick={() => this._handleCloseModal()}>
                    ✕
                  </div>
                </CSSTransition> : null}
            {modalIsOpen ?
                <CSSTransition key={11} timeout={250} classNames='fade'>
                  <div className={'create-exchange-header'}>
                    {translate['Create New Exchange']}
                  </div>
                </CSSTransition> : null}
            {modalIsOpen ?
                <CSSTransition key={12} timeout={250} classNames='fade'>
                  <div className={'create-exchange-header-desc'}>
                    پنجره، گروهی متشکل از ارائه‌دهندگان و متقاضیان محصولات، خدمات و مهارت هاست.
                  </div>
                </CSSTransition> : null}
            {modalIsOpen ?
                <CSSTransition key={13} timeout={250} classNames='fade'>
                  <div className={'create-exchange-inputs'}>
                    <div>
                      <label>
                        {translate['Exchange Name']} <span className={'secondary-color'}>*</span>
                      </label>
                      <input type={'text'} className={'create-exchange-name-input'} placeholder={translate['Exchange Name']}
                             ref={e => this.exName = e} onChange={(e) => this.setState({...this.state, name: e.target.value})}/>
                      <div className={name.length < 32 ? 'create-exchange-name-input-limit' : 'create-exchange-name-input-limited'}>
                        {name.length} / 32
                      </div>
                      <div ref={e => this.nameError = e} className={'product-name-error-hide'}>طول نام غیر مجاز است</div>
                    </div>
                    <div>
                      <label>
                        {translate['Exchange Description']}
                      </label>
                      <textarea className={'create-exchange-desc-input'} placeholder={'موضوع فعالیت این پنجره چیست؟'}
                                ref={e => this.exDes = e} onChange={(e) => this.setState({...this.state, description: e.target.value})}/>
                      <div className={description.length < 700 ? 'create-exchange-desc-input-limit' : 'create-exchange-desc-input-limited'}>
                        {description.length} / 700
                      </div>
                      <div ref={e => this.descError = e} className={'product-name-error-hide'}>طول توضیحات غیر مجاز است</div>
                    </div>
                    <div>
                      <label>
                        {translate['Upload Picture']}
                      </label>
                      <div className={'create-exchange-upload'}>
                        {selectedImage !== undefined && selectedImage !== null && !processing ?
                            <img alt={''} src={selectedImage} className={'create-exchange-upload-image'}/>
                            :
                            <UploadIcon className={'create-exchange-upload-svg'}/>
                        }
                        <input ref={e => this.exPic = e} type="file"
                               onChange={!processing ? (e => this._uploadHandler(e.currentTarget.files[0])) : console.log('Still Uploading')}/>
                      </div>
                    </div>
                  </div>
                </CSSTransition> : null}
            {
              modalIsOpen &&
              <CSSTransition key={14} timeout={250} classNames='fade'>
                <div className={'create-exchange-buttons'}>
                  <button className={'create-exchange-success-button'} onClick={() => !processing && this._handleCreateExchange()}>
                    {processing ?
                        <ClipLoader color="#35495c" size={17} loading={true}/>
                        :
                        translate['Create']
                    }
                  </button>
                  <button className={'create-exchange-cancel-button'} onClick={() => this._handleCloseModal()}>
                    {translate['Cancel']}
                  </button>
                </div>
              </CSSTransition>
            }
          </TransitionGroup>

        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  identity: state.auth.client.identity.content,
  createdExchange: getAllOfExchanges(state)[state.exchanges.nowCreatedId] || {},
  auth: state.auth,
  translate: state.intl.messages,
  tempFiles: state.temp.file,
})


const mapDispatchToProps = dispatch =>
    bindActionCreators({
      createFile,
      createExchange: exchangeActions.createExchange,
      removeFileFromTemp: TempActions.removeFileFromTemp,
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateExchange)