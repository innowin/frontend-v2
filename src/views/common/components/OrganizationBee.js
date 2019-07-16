import React, {PureComponent} from 'react'
import BeeBackground from 'src/images/bee/beeBackground'
import connect from 'react-redux/es/connect/connect'
import {Bee} from 'src/images/icons'
import {bindActionCreators} from 'redux'
import {ClipLoader} from 'react-spinners'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {Link} from 'react-router-dom'
import types from 'src/redux/actions/types'
import {createFileFunc} from '../Functions'
import updateUserByUserIdAction from 'src/redux/actions/user/updateUserByUserIdAction'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import TempActions from 'src/redux/actions/tempActions'
import uuid from 'uuid'
import constants from 'src/consts/constants'
import AuthActions from 'src/redux/actions/authActions'
import {getClientObject} from '../../../redux/selectors/common/client/getClient'

class OrganizationBee extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      level: 1,

      image: 0,
      name: 0,
      graduate: 0,
      bio: 0,

      resume: null,
      resumeId: null,

      imageLoading: false,
      selectedProfileFile: null,
      selectedProfile: null,
      profileMediaId: null,

      nameText: '',
      nameSubmitted: false,

      siteText: '',
      telText: '',
      educationSubmitted: false,

      bioText: '',
      bioSubmitted: false,

      done: false,

      close: false,

    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (!this.state.done) {
      const {currentUser, profileIdTemp, resumeIdTemp, temp, actions} = nextProps
      const {profileMediaId, resumeId, resume} = this.state
      const {nike_name, description, telegram_account, web_site, profile_media} = currentUser

      let setResume = resume
      let image = 0
      let name = 0
      let graduate = 0
      let bio = 0

      if (profile_media) {
        image = 30
      }
      if (nike_name && nike_name.trim().length > 0) {
        name = 25
      }
      if (description && description.trim().length > 0) {
        bio = 25
      }
      if ((telegram_account && telegram_account.length > 0) && (web_site && web_site.length > 0)) {
        graduate = 20
      }
      else if ((telegram_account && telegram_account.length > 0) || (web_site && web_site.length > 0)) {
        graduate = 10
      }

      if (profileMediaId && temp[profileMediaId] && temp[profileMediaId].progress === 100 && profileIdTemp) {
        const formFormat = {
          profile_media: profileIdTemp,
        }
        actions.updateUserByUserId(formFormat, currentUser.id)
        actions.removeFileFromTemp('profile_media')
        actions.removeFileFromTemp(profileMediaId)
      }

      if (resumeId && temp[resumeId] && temp[resumeId].progress === 100 && resumeIdTemp) {
        setResume = true
        actions.removeFileFromTemp('resume')
        actions.removeFileFromTemp(resumeId)
      }

      this.setState({...this.state, image, name, graduate, bio, resume: setResume}, () => {
        if (image === 30) this.setState({...this.state, imageLoading: false, profileMediaId: null}, () => {
          if (image === 30 && name === 25 && bio === 25 && graduate === 20) {
            this.setState({...this.state, done: true}, () => setTimeout(() => actions.setBeeDone(true), 30000))
          }
        })
      })
    }
  }

  _handleCancel = () => {
    const {level} = this.state
    if (level < 4)
      this.setState({...this.state, level: this.state.level + 1})
    else this.setState({...this.state, level: 1})
  }

  _handleChooseProfile = (fileString) => {
    const reader = new FileReader()
    if (fileString) {
      reader.readAsDataURL(fileString)
      reader.onload = () => {
        this.setState({
          ...this.state,
          selectedProfile: reader.result,
          selectedProfileFile: fileString,
          imageLoading: true,
        }, this._createProfile)
      }
    }
  }

  _createProfile = () => {
    const {createFile} = this.props.actions
    const {selectedProfileFile, selectedProfile} = this.state
    const fileId = uuid()
    const file = {fileId, formFile: selectedProfileFile}
    const createArguments = {
      fileIdKey: 'fileId',
      nextActionType: types.COMMON.FILE.SET_FILE_IDS_IN_TEMP_FILE,
      nextActionData: {tempFileKeyName: 'profile_media'},
    }
    this.setState({...this.state, profileMediaId: fileId}, () => {
      createFileFunc(createFile, selectedProfile, createArguments, constants.CREATE_FILE_TYPES.IMAGE, constants.CREATE_FILE_CATEGORIES.PROFILE.PROFILE_PICTURE, file)
    })
  }

  _handleChooseResume = (fileString) => {
    const reader = new FileReader()
    if (fileString) {
      reader.readAsDataURL(fileString)
      reader.onload = () => {
        this.setState({
          ...this.state,
          selectedResume: reader.result,
          selectedResumeFile: fileString,
          resume: false,
        }, this._createResume)
      }
    }
  }

  _createResume = () => {
    const {createFile} = this.props.actions
    const {selectedResumeFile, selectedResume} = this.state
    const fileId = uuid()
    const file = {fileId, formFile: selectedResumeFile}
    const createArguments = {
      fileIdKey: 'fileId',
      nextActionType: types.COMMON.FILE.SET_FILE_IDS_IN_TEMP_FILE,
      nextActionData: {tempFileKeyName: 'resume'},
    }
    this.setState({...this.state, resumeId: fileId}, () => {
      createFileFunc(createFile, selectedResume, createArguments, constants.CREATE_FILE_TYPES.FILE, constants.CREATE_FILE_CATEGORIES.PROFILE.RESUME, file)
    })
  }

  _handleName = () => {
    if (this.state.nameText.trim().length > 0) {
      const {actions, currentUser} = this.props
      const formFormat = {
        nike_name: this.state.nameText.trim(),
      }
      actions.updateUserByUserId(formFormat, currentUser.id)
    }
    else this.setState({...this.state, nameSubmitted: true})
  }

  _handleGraduate = () => {
    if (this.state.siteText.trim().length > 0 || this.state.telText.trim().length > 0) {
      const {actions, currentUser} = this.props
      const formFormat =
          this.state.siteText.trim().length > 0 && this.state.telText.trim().length > 0 ?
              {web_site: this.state.siteText.trim(), telegram_account: this.state.telText.trim()}
              :
              this.state.siteText.trim().length > 0 ? {web_site: this.state.siteText.trim()} : {telegram_account: this.state.telText.trim()}
      actions.updateUserByUserId(formFormat, currentUser.id)
    }
    else this.setState({...this.state, educationSubmitted: true})
  }

  _handleBio = () => {
    if (this.state.bioText.trim().length > 0) {
      const {actions, currentUser} = this.props
      const formFormat = {
        description: this.state.bioText.trim(),
      }
      actions.updateUserByUserId(formFormat, currentUser.id)
    }
    else this.setState({...this.state, bioSubmitted: true})
  }

  _handleBioChange = (e) => {
    this.setState({...this.state, bioText: e.target.value.trim()})
  }

  _handleNameChange = (e) => {
    this.setState({...this.state, nameText: e.target.value.trim()})
  }

  _handleSiteChange = (e) => {
    this.setState({...this.state, siteText: e.target.value.trim()})
  }

  _handleTelChange = (e) => {
    this.setState({...this.state, telText: e.target.value.trim()})
  }

  _handleClose = () => this.setState({...this.state, close: true})

  renderLevel() {
    const {level, image, name, graduate, bio, resume} = this.state
    const {translate, currentUser} = this.props
    if (image + name + graduate + bio === 100) {
      return (
          <div>
            <div className='bee-text'>{translate['Awesome']}</div>
            <div className='bee-close' onClick={this._handleClose}>✕</div>

            <div className='bee-text-graduate'>{translate['Congrats, Your Profile Have Been Completed.']}</div>

            <div className='bee-background-cont'>
              <BeeBackground className='bee-background'/>
              <Bee className='bee'/>
            </div>

            <div className='bee-button-complete'>
              {image + name + graduate + bio} %
            </div>

            <div className='bee-button-submit-cont'>
              <Link to={`/user/${currentUser.id}`} className='bee-button-submit'>{translate['View Profile']}</Link>

              <div className='bee-button-submit'>
                {
                  resume === true ? 'آپلود شد' : resume === null ? 'آپلود رزومه' : <ClipLoader size={19}/>
                }
                {
                  resume === null ? <input type='file' className='bee-button-input' onChange={e => this._handleChooseResume(e.currentTarget.files[0])}/> : null
                }
              </div>
            </div>

          </div>
      )
    }
    else if (level === 1) {
      if (image === 0)
        return (
            <div>
              <div className='bee-text'>{translate['Choose a Photo For Profile']}</div>
              <div className='bee-close' onClick={this._handleClose}>✕</div>

              <div className='bee-background-cont'>
                <BeeBackground className='bee-background'/>
                <Bee className='bee'/>
              </div>

              <div className='bee-buttons'>
                <button className='bee-button-cancel' onClick={this._handleCancel}>{translate['Not Now']}</button>

                <button className='bee-button-choose'>
                  <input type='file' className='bee-button-input' onChange={!this.state.imageLoading ? e => this._handleChooseProfile(e.currentTarget.files[0]) : console.log('Uploading')}/>
                  {
                    this.state.imageLoading ?
                        <ClipLoader size={12} color='grey'/>
                        :
                        translate['Choose Photo']
                  }
                </button>

              </div>
            </div>
        )
      else {
        this.setState({...this.state, level: this.state.level + 1})
        this.forceUpdate()
      }
    }
    else if (level === 2) {
      if (name === 0)
        return (
            <div>
              <div className='bee-text'>{translate['Enter Your Team Name']}</div>
              <div className='bee-close' onClick={this._handleClose}>✕</div>

              <div className='bee-background-cont'>
                <BeeBackground className='bee-background'/>
                <Bee className='bee'/>
              </div>

              <div className='bee-text-name'>{translate['Organization Name']}</div>
              <input type='text' className='bee-name-text-box' onChange={this._handleNameChange}/>
              <div className={this.state.nameSubmitted && this.state.nameText.length === 0 ? 'bee-job-error' : 'bee-job-error-hide'}>{translate['Please Enter Your Name!']}</div>

              <div className='bee-loading'>
                <div className='bee-loading-nav'>
                  <div className='bee-loading-fill' style={{width: (image + name + graduate + bio) + '%'}}/>
                </div>
                <div>{translate['Complement of profile']} {image + name + graduate + bio}%</div>
              </div>

              <div className='bee-buttons'>
                <button className='bee-button-cancel' onClick={this._handleCancel}>{translate['Not Now']}</button>
                <button className='bee-button-choose' onClick={this._handleName}>{translate['Submit']}</button>
              </div>

            </div>
        )
      else {
        this.setState({...this.state, level: this.state.level + 1})
        this.forceUpdate()
      }
    }
    else if (level === 3) {
      if (graduate === 0 || graduate === 10)
        return (
            <div>
              <div className='bee-text'>{translate['The Ways to Connect With Your Collection']}</div>
              <div className='bee-close' onClick={this._handleClose}>✕</div>

              <div className='bee-background-cont'>
                <BeeBackground className='bee-background'/>
                <Bee className='bee'/>
              </div>

              <div className='bee-text-name'>{translate['WebSite']}</div>
              <input type='text' defaultValue={currentUser.web_site ? currentUser.web_site : ''} className='bee-name-text-box-left' placeholder='example.com' onChange={this._handleSiteChange}/>
              <div className={this.state.educationSubmitted && this.state.siteText.length === 0 ? 'bee-job-error' : 'bee-job-error-hide'}>{translate['Please Enter Your Website!']}</div>

              <div className='bee-text-last-name'>{translate['Telegram Id']}</div>
              <input type='text' defaultValue={currentUser.telegram_account ? currentUser.telegram_account : ''} className='bee-name-text-box-left' placeholder='@username' onChange={this._handleTelChange}/>
              <div className={this.state.educationSubmitted && this.state.telText.length === 0 ? 'bee-job-error' : 'bee-job-error-hide'}>{translate['Please Enter Your Telegram Id!']}</div>

              <div className='bee-loading'>
                <div className='bee-loading-nav'>
                  <div className='bee-loading-fill' style={{width: (image + name + graduate + bio) + '%'}}/>
                </div>
                <div>{translate['Complement of profile']} {image + name + graduate + bio}%</div>
              </div>

              <div className='bee-buttons'>
                <button className='bee-button-cancel' onClick={this._handleCancel}>{translate['Not Now']}</button>
                <button className='bee-button-choose' onClick={this._handleGraduate}>{translate['Submit']}</button>
              </div>

            </div>
        )
      else {
        this.setState({...this.state, level: this.state.level + 1})
        this.forceUpdate()
      }
    }
    else if (level === 4) {
      if (bio === 0)
        return (
            <div>
              <div className='bee-text'>{translate['Bio']}</div>
              <div className='bee-close' onClick={this._handleClose}>✕</div>

              <div className='bee-text-graduate'>{translate['Write a Short Introduction Of Team Or Organization, Your Activities Or Your Interests']}</div>

              <div className='bee-background-cont'>
                <BeeBackground className='bee-background'/>
                <Bee className='bee'/>
              </div>

              <textarea onChange={this._handleBioChange} className='bee-name-text-box' placeholder={translate['Example: Nokavan , IT Products Developer']}/>
              <div className={this.state.bioSubmitted && this.state.bioText.length === 0 ? 'bee-bio-error' : 'bee-bio-error-hide'}>{translate['Please Enter Bio Text!']}</div>

              <div className='bee-loading'>
                <div className='bee-loading-nav'>
                  <div className='bee-loading-fill' style={{width: (image + name + graduate + bio) + '%'}}/>
                </div>
                <div>{translate['Complement of profile']} {image + name + graduate + bio}%</div>
              </div>

              <div className='bee-buttons'>
                <button className='bee-button-cancel' onClick={this._handleCancel}>فعلا نه</button>
                <button className='bee-button-choose' onClick={this._handleBio}>ثبت</button>
              </div>

            </div>
        )
      else {
        this.setState({...this.state, level: 1})
        this.forceUpdate()
      }
    }

  }

  render() {
    if (!this.state.close)
      return (
          <div className='bee-panel-cont'>
            {
              this.renderLevel()
            }
          </div>
      )
    else return null
  }
}

const mapStateToProps = (state) => ({
  currentUser: getClientObject(state),
  translate: getMessages(state),
  profileIdTemp: state.temp.file['profile_media'],
  resumeIdTemp: state.temp.file['resume'],
  temp: state.temp.file,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateUserByUserId: updateUserByUserIdAction.updateUser,
    createFile: FileActions.createFile,
    removeFileFromTemp: TempActions.removeFileFromTemp,
    setBeeDone: AuthActions.setBeeDone,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(OrganizationBee)