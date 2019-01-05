import React, { Component } from 'react'
import BeeBackground from 'src/images/bee/beeBackground'
import connect from 'react-redux/es/connect/connect'
import OrganizationActions from 'src/redux/actions/organization/organizationActions'
import { Bee } from 'src/images/icons'
import { bindActionCreators } from 'redux'
import { ClipLoader } from 'react-spinners'
import { createFile } from 'src/redux/actions/commonActions/fileActions'
import { getMessages } from 'src/redux/selectors/translateSelector'
import { Link } from 'react-router-dom'
import types from 'src/redux/actions/types'
import { createFileFunc } from '../Functions'
import TempActions from 'src/redux/actions/tempActions'

class OrganizationBee extends Component {
  constructor(props) {
    super(props)
    this.state = {
      level: 1,

      image: 0,
      name: 0,
      graduate: 0,
      bio: 0,

      imageLoading: false,

      nameText: '',
      nameSubmitted: false,

      siteText: '',
      telText: '',
      educationSubmitted: false,

      bioText: '',
      bioSubmitted: false
    }
  }

  componentDidMount(): void {
    const { organLogo, organObject } = this.props

    let image = 0
    let name = 0
    let graduate = 0
    let bio = 0

    if (organLogo) {
      image = 30
    }
    if (organObject.content.nike_name && organObject.content.nike_name.trim().length > 0) {
      name = 25
    }
    if (organObject.content.biography && organObject.content.biography.trim().length > 0) {
      bio = 25
    }
    if ((organObject.content.telegram_account && organObject.content.telegram_account.length > 0) || (organObject.content.web_site && organObject.content.web_site.length > 0)) {
      graduate = 20
    }

    this.setState({ ...this.state, image, name, graduate, bio })
  }

  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    const { organLogo, organObject, currentOrganizationId, actions } = nextProps

    let image = 0
    let name = 0
    let graduate = 0
    let bio = 0

    if (organLogo) {
      image = 30
    }
    if (organObject.content.nike_name && organObject.content.nike_name.trim().length > 0) {
      name = 25
    }
    if (organObject.content.biography && organObject.content.biography.trim().length > 0) {
      bio = 25
    }
    if ((organObject.content.telegram_account && organObject.content.telegram_account.length > 0) || organObject.content.web_site && organObject.content.web_site.length > 0) {
      graduate = 20
    }

    if (this.state.imageLoading) {
      console.log('this.props.tempFile : ', nextProps.tempFile)
      if (nextProps.tempFile) {
        const formFormat = {
          organization_logo: nextProps.tempFile
        }
        actions.updateOrganizationByOrganizationId({ formValues: formFormat, organizationId: currentOrganizationId })
        nextProps.actions.removeFileFromTemp('org_photo')
      }
    }

    this.setState({ ...this.state, image, name, graduate, bio })
  }

  _handleCancel = () => {
    const { level } = this.state
    if (level < 4)
      this.setState({ ...this.state, level: this.state.level + 1 })
    else this.setState({ ...this.state, level: 1 })
  }

  _handleChooseProfile = (e) => {
    e.preventDefault()
    const { actions } = this.props
    let reader = new FileReader()
    let file = e.target.files[0]
    if (file) {
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        this.setState({ ...this.state, imageLoading: true }, () => {
          const nextActionType = types.COMMON.SET_FILE_IDS_IN_TEMP_FILE
          const fileIdKey = 'fileId'
          const nextActionData = { tempFileKeyName: 'org_photo' }
          const createArguments = {
            fileIdKey,
            nextActionType,
            nextActionData
          }
          createFileFunc(actions.createFile, reader.result, createArguments)
        })
      }
    }
  }

  _handleName = () => {
    if (this.state.nameText.trim().length > 0) {
      const { actions, currentOrganizationId } = this.props
      const formFormat = {
        nike_name: this.state.nameText.trim()
      }
      actions.updateOrganizationByOrganizationId({ formValues: formFormat, organizationId: currentOrganizationId })
    }
    else this.setState({ ...this.state, nameSubmitted: true })
  }

  _handleGraduate = () => {
    if (this.state.siteText.trim().length > 0 && this.state.telText.trim().length > 0) {
      const { actions, currentOrganizationId } = this.props
      const formFormat = {
        web_site: this.state.siteText.trim(),
        telegram_account: this.state.telText.trim()
      }
      actions.updateOrganizationByOrganizationId({ formValues: formFormat, organizationId: currentOrganizationId })
    }
    else this.setState({ ...this.state, educationSubmitted: true })
  }

  _handleBio = () => {
    if (this.state.bioText.trim().length > 0) {
      const { actions, currentOrganizationId } = this.props
      const formFormat = {
        biography: this.state.bioText.trim()
      }
      actions.updateOrganizationByOrganizationId({ formValues: formFormat, organizationId: currentOrganizationId })
    }
    else this.setState({ ...this.state, bioSubmitted: true })
  }

  _handleBioChange = (e) => {
    this.setState({ ...this.state, bioText: e.target.value.trim() })
  }

  _handleNameChange = (e) => {
    this.setState({ ...this.state, nameText: e.target.value.trim() })
  }

  _handleSiteChange = (e) => {
    this.setState({ ...this.state, siteText: e.target.value.trim() })
  }

  _handleTelChange = (e) => {
    this.setState({ ...this.state, telText: e.target.value.trim() })
  }

  renderLevel() {
    const { level, image, name, graduate, bio } = this.state
    const { translate, currentOrganizationId } = this.props
    if (image + name + graduate + bio === 100) {
      return (
          <div>
            <div className='bee-text'>{translate['Awesome']}</div>
            <div className='bee-close'>✕</div>

            <div className='bee-text-graduate'>{translate['Congrats, Your Profile Have Been Completed.']}</div>

            <div className='bee-background-cont'>
              <BeeBackground className='bee-background'/>
              <Bee className='bee'/>
            </div>

            <div className='bee-button-complete'>
              {image + name + graduate + bio} %
            </div>

            <div className='bee-button-submit-cont'>
              <Link to={`/organization/${currentOrganizationId}`} className='bee-button-submit'>{translate['View Profile']}</Link>
            </div>
          </div>
      )
    }
    else if (level === 1) {
      if (image === 0)
        return (
            <div>
              <div className='bee-text'>{translate['Choose a Photo For Profile']}</div>
              <div className='bee-close'>✕</div>

              <div className='bee-background-cont'>
                <BeeBackground className='bee-background'/>
                <Bee className='bee'/>
              </div>

              <div className='bee-buttons'>
                <button className='bee-button-cancel' onClick={this._handleCancel}>{translate['Not Now']}</button>

                <button className='bee-button-choose'>
                  <input type='file' className='bee-button-input' onChange={this._handleChooseProfile}/>
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
      else this.setState({ ...this.state, level: this.state.level + 1 })
    }
    else if (level === 2) {
      if (name === 0)
        return (
            <div>
              <div className='bee-text'>{translate['Enter Your Team Name']}</div>
              <div className='bee-close'>✕</div>

              <div className='bee-background-cont'>
                <BeeBackground className='bee-background'/>
                <Bee className='bee'/>
              </div>

              <div className='bee-text-name'>{translate['Organization Name']}</div>
              <input type='text' className='bee-name-text-box' onChange={this._handleNameChange}/>
              <div className={this.state.nameSubmitted && this.state.nameText.length === 0 ? 'bee-job-error' : 'bee-job-error-hide'}>{translate['Please Enter Your Name!']}</div>

              <div className='bee-loading'>
                <div className='bee-loading-nav'>
                  <div className='bee-loading-fill' style={{ width: (image + name + graduate + bio) + '%' }}/>
                </div>
                <div>{translate['Complement of profile']} {image + name + graduate + bio}%</div>
              </div>

              <div className='bee-buttons'>
                <button className='bee-button-cancel' onClick={this._handleCancel}>{translate['Not Now']}</button>
                <button className='bee-button-choose' onClick={this._handleName}>{translate['Submit']}</button>
              </div>

            </div>
        )
      else this.setState({ ...this.state, level: this.state.level + 1 })
    }
    else if (level === 3) {
      if (graduate === 0)
        return (
            <div>
              <div className='bee-text'>{translate['The Ways to Connect With Your Collection']}</div>
              <div className='bee-close'>✕</div>

              <div className='bee-background-cont'>
                <BeeBackground className='bee-background'/>
                <Bee className='bee'/>
              </div>

              <div className='bee-text-name'>{translate['WebSite']}</div>
              <input type='text' className='bee-name-text-box-left' placeholder='example.com' onChange={this._handleSiteChange}/>
              <div className={this.state.educationSubmitted && this.state.siteText.length === 0 ? 'bee-job-error' : 'bee-job-error-hide'}>{translate['Please Enter Your Website!']}</div>

              <div className='bee-text-last-name'>{translate['Telegram Id']}</div>
              <input type='text' className='bee-name-text-box-left' placeholder='@username' onChange={this._handleTelChange}/>
              <div className={this.state.educationSubmitted && this.state.telText.length === 0 ? 'bee-job-error' : 'bee-job-error-hide'}>{translate['Please Enter Your Telegram Id!']}</div>

              <div className='bee-loading'>
                <div className='bee-loading-nav'>
                  <div className='bee-loading-fill' style={{ width: (image + name + graduate + bio) + '%' }}/>
                </div>
                <div>{translate['Complement of profile']} {image + name + graduate + bio}%</div>
              </div>

              <div className='bee-buttons'>
                <button className='bee-button-cancel' onClick={this._handleCancel}>{translate['Not Now']}</button>
                <button className='bee-button-choose' onClick={this._handleGraduate}>{translate['Submit']}</button>
              </div>

            </div>
        )
      else this.setState({ ...this.state, level: this.state.level + 1 })
    }
    else if (level === 4) {
      if (bio === 0)
        return (
            <div>
              <div className='bee-text'>{translate['Bio']}</div>
              <div className='bee-close'>✕</div>

              <div className='bee-text-graduate'>{translate['Write a Short Introduction Of Team Or Organization, Your Activities Or Your Interests']}</div>

              <div className='bee-background-cont'>
                <BeeBackground className='bee-background'/>
                <Bee className='bee'/>
              </div>

              <textarea onChange={this._handleBioChange} className='bee-name-text-box' placeholder={translate['Example: Nokavan , IT Products Developer']}/>
              <div className={this.state.bioSubmitted && this.state.bioText.length === 0 ? 'bee-bio-error' : 'bee-bio-error-hide'}>{translate['Please Enter Bio Text!']}</div>

              <div className='bee-loading'>
                <div className='bee-loading-nav'>
                  <div className='bee-loading-fill' style={{ width: (image + name + graduate + bio) + '%' }}/>
                </div>
                <div>{translate['Complement of profile']} {image + name + graduate + bio}%</div>
              </div>

              <div className='bee-buttons'>
                <button className='bee-button-cancel' onClick={this._handleCancel}>فعلا نه</button>
                <button className='bee-button-choose' onClick={this._handleBio}>ثبت</button>
              </div>

            </div>
        )
      else this.setState({ ...this.state, level: 1 })
    }

  }

  render() {
    return (
        <div className='bee-panel-cont'>
          {
            this.renderLevel()
          }
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  const client = state.auth.client
  const userId = (client.organization && client.organization.id) || (client.user && client.user.id)
  const defaultObject = { content: {}, isLoading: false, error: null }
  const stateOrgan = state.organs.list[userId]
  const organLogo = (stateOrgan && stateOrgan.organization && stateOrgan.organization.content && stateOrgan.organization.content.organization_logo)

  return ({
    currentUserType: client.user_type,
    currentUserIdentity: client.identity.content,
    currentUserId: (client.user && client.user.id),
    currentOrganizationId: userId,
    currentUserName: client.organization.nike_name,
    currentUserBio: client.profile.description,
    translate: getMessages(state),
    organObject: (stateOrgan && stateOrgan.organization) || defaultObject,
    organLogo,
    tempFile: state.temp.file['org_photo']
  })
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    createFile,
    updateOrganizationByOrganizationId: OrganizationActions.updateOrganization,
    removeFileFromTemp: TempActions.removeFileFromTemp
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(OrganizationBee)