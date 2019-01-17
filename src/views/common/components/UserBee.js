import React, {Component} from 'react'
import BeeBackground from 'src/images/bee/beeBackground'
import connect from 'react-redux/es/connect/connect'
import constants from 'src/consts/constants'
import EducationActions from 'src/redux/actions/user/educationActions'
import {getUniversities} from 'src/redux/actions/commonActions/university'
import {getAllUniversities} from 'src/redux/selectors/common/university/getAllUniversities'
import {getAllEducationFields} from 'src/redux/selectors/common/educationField/getAllEducationFileds'
import {getEducationFields} from 'src/redux/actions/commonActions/educationField'
import FontAwesome from 'react-fontawesome'
import GetUserActions from 'src/redux/actions/user/getUserActions'
import InteliInput from '../inputs/InteliInput'
import makeFileSelectorByKeyValue from 'src/redux/selectors/common/file/selectFilsByKeyValue'
import updateProfile from 'src/redux/actions/user/updateProfileByProfileIdAction'
import updateUserByUserIdAction from 'src/redux/actions/user/updateUserByUserIdAction'
import WorkExperienceActions from 'src/redux/actions/user/workExperienceActions'
import {Bee} from 'src/images/icons'
import {bindActionCreators} from 'redux'
import {ClipLoader} from 'react-spinners'
import {createFile, getFiles} from 'src/redux/actions/commonActions/fileActions'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {Link} from 'react-router-dom'

class UserBee extends Component {

  constructor(props) {
    super(props)
    this.state = {
      level: 1,

      image: 0,
      name: 0,
      graduate: 0,
      job: 0,
      bio: 0,

      imageLoading: false,

      nameText: '',
      lastNameText: '',
      nameSubmitted: false,

      maghta: '',
      major: '',
      college: '',
      educationSubmitted: false,

      bioText: '',
      bioSubmitted: false,

      jobTitle: '',
      jobWork: '',
      jobSubmitted: false
    }
  }

  componentDidMount(): void {
    const {currentUserMedia, currentUserName, profile, currentUserEducation, currentUserWork, currentUserId, actions} = this.props
    actions.getUserByUserId(currentUserId)
    actions.getProfileByUserId(currentUserId)
    actions.getEducationByUserId({userId: currentUserId})
    actions.getWorkExperienceByUserId({userId: currentUserId})
    actions.getUniversities()
    actions.getEducationFields()

    let image = 0
    let name = 0
    let graduate = 0
    let job = 0
    let bio = 0

    if (currentUserMedia) {
      image = 30
    }
    if (currentUserName.trim().length > 0) {
      name = 20
    }
    if (profile && profile.description && profile.description.trim().length > 0) {
      bio = 20
    }
    if (currentUserEducation.length > 0) {
      graduate = 15
    }
    if (currentUserWork.length > 0) {
      job = 15
    }

    this.setState({...this.state, image, name, graduate, job, bio}, () => {
      if (image === 30) this.setState({...this.state, imageLoading: false})
    })
  }

  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    const {currentUserMedia, currentUserName, profile, currentUserEducation, currentUserWork, currentUserId, currentUserProfileId, actions} = nextProps

    let image = 0
    let name = 0
    let graduate = 0
    let job = 0
    let bio = 0

    if (currentUserMedia) {
      image = 30
    }
    if (currentUserName.trim().length > 0) {
      name = 20
    }
    if (profile && profile.description && profile.description.trim().length > 0) {
      bio = 20
    }
    if (currentUserEducation.length > 0) {
      graduate = 15
    }
    if (currentUserWork.length > 0) {
      job = 15
    }

    if (this.state.imageLoading) {
      const {clientFiles} = nextProps
      const lastFile = clientFiles[clientFiles.length - 1] || {}
      const prevLastFile = this.props.clientFiles[this.props.clientFiles.length - 1] || {}
      if (lastFile.id) {
        if (!prevLastFile || (prevLastFile && (lastFile.id !== prevLastFile.id))) {
          this.setState({...this.state, imageLoading: false}, () => {
            actions.updateProfile({formValues: {profile_media: lastFile.id}, profileId: currentUserProfileId, userId: currentUserId})
          })
        }
      }
    }

    this.setState({...this.state, image, name, graduate, job, bio}, () => {
      if (image === 30) this.setState({...this.state, imageLoading: false})
    })
  }

  _handleCancel = () => {
    const {level} = this.state
    if (level < 5)
      this.setState({...this.state, level: this.state.level + 1})
    else this.setState({...this.state, level: 1})
  }

  _handleChooseProfile = (e) => {
    const {actions} = this.props
    e.preventDefault()
    let reader = new FileReader()
    let file = e.target.files[0]
    if (file) {
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        this.setState({...this.state, imageLoading: true}, () => actions.createFile({file_string: reader.result}))
      }
    }
  }

  _handleName = () => {
    if (this.state.nameText.trim().length > 0 && this.state.lastNameText.trim().length > 0) {
      const {actions, currentUserId} = this.props
      const formFormat = {
        first_name: this.state.nameText,
        last_name: this.state.lastNameText
      }
      actions.updateUserByUserId(formFormat, currentUserId)
      setTimeout(() => {
        actions.getUserByUserId(currentUserId)
        actions.getProfileByUserId(currentUserId)
      }, 500)
    }
    else this.setState({...this.state, nameSubmitted: true})
  }

  _handleGraduate = () => {
    const {translate, actions, currentUserId} = this.props
    if (this.state.maghta.length > 0 && this.state.major.length > 0 && this.state.college.length > 0) {

      let grade
      if (this.state.maghta === translate['Bachelor']) {
        grade = constants.SERVER_GRADES.BACHELOR
      }
      else if (this.state.maghta === translate['Master']) {
        grade = constants.SERVER_GRADES.MASTER
      }
      else if (this.state.maghta === translate['Phd']) {
        grade = constants.SERVER_GRADES.PHD
      }

      const formFormat = {
        grade: grade,
        university: this.state.college,
        field_of_study: this.state.major
      }

      const formValues: {} = {...formFormat}
      actions.createEducationByUserId({userId: currentUserId, formValues})
    }
    else this.setState({...this.state, educationSubmitted: true})
  }

  _handleJob = () => {
    if (this.state.jobTitle.length > 0 && this.state.jobWork.length > 0) {
      const {actions, currentUserId} = this.props
      const formFormat = {
        name: this.state.jobWork,
        position: this.state.jobTitle,
        work_experience_organization: 2506
      }
      const formValues: {} = {...formFormat}
      actions.createWorkExperienceByUserId({userId: currentUserId, formValues})
      setTimeout(() => {
        actions.getWorkExperienceByUserId({userId: currentUserId})
      }, 500)
    }
    else this.setState({...this.state, jobSubmitted: true})
  }

  _handleBio = () => {
    if (this.state.bioText.length > 0) {
      const {actions, currentUserId} = this.props
      const formFormat = {
        description: this.state.bioText
      }
      actions.updateUserByUserId(formFormat, currentUserId)
      setTimeout(() => {
        actions.getUserByUserId(currentUserId)
        actions.getProfileByUserId(currentUserId)
      }, 500)
    }
    else this.setState({...this.state, bioSubmitted: true})
  }

  _handleSelectMaghta = (select) => {
    this.setState({...this.state, maghta: select.name})
  }

  _handleSelectMajor = (select) => {
    this.setState({...this.state, major: select.name})
  }

  _handleSelectCollege = (select) => {
    this.setState({...this.state, college: select.name})
  }

  _handleBioChange = (e) => {
    this.setState({...this.state, bioText: e.target.value.trim()})
  }

  _handleJobTitleChange = (e) => {
    this.setState({...this.state, jobTitle: e.target.value.trim()})
  }

  _handleJobWorkChange = (e) => {
    this.setState({...this.state, jobWork: e.target.value.trim()})
  }

  _handleNameChange = (e) => {
    this.setState({...this.state, nameText: e.target.value.trim()})
  }

  _handleLastNameChange = (e) => {
    this.setState({...this.state, lastNameText: e.target.value.trim()})
  }

  renderLevel() {
    const {level, image, name, graduate, job, bio} = this.state
    const {translate, currentUserId} = this.props
    if (image + name + graduate + job + bio === 100) {
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
              {image + name + graduate + job + bio} %
            </div>

            <div className='bee-button-submit-cont'>
              <Link to={`/user/${currentUserId}`} className='bee-button-submit'>{translate['View Profile']}</Link>
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
      else this.setState({...this.state, level: this.state.level + 1})
    }
    else if (level === 2) {
      if (name === 0)
        return (
            <div>
              <div className='bee-text'>{translate['Enter Your Name']}</div>
              <div className='bee-close'>✕</div>

              <div className='bee-background-cont'>
                <BeeBackground className='bee-background'/>
                <Bee className='bee'/>
              </div>

              <div className='bee-text-name'>{translate['First name']}</div>
              <input type='text' className='bee-name-text-box' onChange={this._handleNameChange}/>
              <div className={this.state.nameSubmitted && this.state.nameText.length === 0 ? 'bee-job-error' : 'bee-job-error-hide'}>{translate['Please Enter Your Name!']}</div>

              <div className='bee-text-last-name'>{translate['Last name']}</div>
              <input type='text' className='bee-name-text-box' onChange={this._handleLastNameChange}/>
              <div className={this.state.nameSubmitted && this.state.lastNameText.length === 0 ? 'bee-job-error' : 'bee-job-error-hide'}>{translate['Please Enter Your Last Name!']}</div>

              <div className='bee-loading'>
                <div className='bee-loading-nav'>
                  <div className='bee-loading-fill' style={{width: (image + name + graduate + job + bio) + '%'}}/>
                </div>
                <div>{translate['Complement of profile']} {image + name + graduate + job + bio}%</div>
              </div>

              <div className='bee-buttons'>
                <button className='bee-button-cancel' onClick={this._handleCancel}>{translate['Not Now']}</button>
                <button className='bee-button-choose' onClick={this._handleName}>{translate['Submit']}</button>
              </div>

            </div>
        )
      else this.setState({...this.state, level: this.state.level + 1})
    }
    else if (level === 3) {
      if (graduate === 0) {
        let universities = []
        Object.values(this.props.universities).forEach(uni => {
          universities.push({...uni, name: uni.university_title})
        })
        let fields = []
        Object.values(this.props.educationFields).forEach(field => {
          fields.push({...field, name: field.university_field_title})
        })
        return (
            <div>
              <div className='bee-text'>{translate['Last Education Major']}</div>
              <div className='bee-close'>✕</div>

              <div className='bee-text-graduate'>{translate['Enter Your Last Education Major. You Can Change It Later']}</div>

              <div className='bee-background-cont'>
                <BeeBackground className='bee-background'/>
                <Bee className='bee'/>
              </div>

              <div className='bee-text-name'>{translate['Grade']}</div>
              <InteliInput handleChange={this._handleSelectMaghta} list={[{name: translate['Bachelor'], id: 1}, {name: translate['Phd'], id: 2}, {name: translate['Master'], id: 3}]} className='bee-inteli-text-box'/>
              <div className={this.state.educationSubmitted && this.state.maghta.length === 0 ? 'bee-job-error' : 'bee-job-error-hide'}>{translate['Please Select Grade!']}</div>

              <div className='bee-text-name'>{translate['Field of study']}</div>
              <InteliInput noCheck={true} icon={<FontAwesome name='search' className='inteli-search-svg'/>} handleChange={this._handleSelectMajor} list={fields} className='bee-inteli-text-box'/>
              <div className={this.state.educationSubmitted && this.state.major.length === 0 ? 'bee-job-error' : 'bee-job-error-hide'}>{translate['Please Select Major!']}</div>

              <div className='bee-text-name'>{translate['University']}</div>
              <InteliInput noCheck={true} icon={<FontAwesome name='search' className='inteli-search-svg'/>} handleChange={this._handleSelectCollege} list={universities} className='bee-inteli-text-box'/>
              <div className={this.state.educationSubmitted && this.state.college.length === 0 ? 'bee-job-error' : 'bee-job-error-hide'}>{translate['Please Select College!']}</div>

              <div className='bee-loading'>
                <div className='bee-loading-nav'>
                  <div className='bee-loading-fill' style={{width: (image + name + graduate + job + bio) + '%'}}/>
                </div>
                <div>{translate['Complement of profile']} {image + name + graduate + job + bio}%</div>
              </div>

              <div className='bee-buttons'>
                <button className='bee-button-cancel' onClick={this._handleCancel}>{translate['Not Now']}</button>
                <button className='bee-button-choose' onClick={this._handleGraduate}>{translate['Submit']}</button>
              </div>

            </div>
        )
      }
      else this.setState({...this.state, level: this.state.level + 1})
    }
    else if (level === 4) {
      if (job === 0)
        return (
            <div>
              <div className='bee-text'>{translate['Job']}</div>
              <div className='bee-close'>✕</div>

              <div className='bee-text-graduate'>{translate['Resume Will Introduce a More Professional Profile.']}</div>

              <div className='bee-background-cont'>
                <BeeBackground className='bee-background'/>
                <Bee className='bee'/>
              </div>

              <div className='bee-text-name'>{translate['Job Title']}</div>
              <input onChange={this._handleJobTitleChange} type='text' className='bee-graduate-text-box' placeholder={translate['Example: Administration Manager']}/>
              <div className={this.state.jobSubmitted && this.state.jobTitle.length === 0 ? 'bee-job-error' : 'bee-job-error-hide'}>{translate['Please Enter Job Title!']}</div>

              <div className='bee-text-name'>{translate['Name work']}</div>
              <input onChange={this._handleJobWorkChange} type='text' className='bee-name-text-box' placeholder={translate['Example: Royan Institute']}/>
              <div className={this.state.jobSubmitted && this.state.jobWork.length === 0 ? 'bee-job-error' : 'bee-job-error-hide'}>{translate['Please Enter Name work!']}</div>

              <div className='bee-loading'>
                <div className='bee-loading-nav'>
                  <div className='bee-loading-fill' style={{width: (image + name + graduate + job + bio) + '%'}}/>
                </div>
                <div>{translate['Complement of profile']} {image + name + graduate + job + bio}%</div>
              </div>

              <div className='bee-buttons'>
                <button className='bee-button-cancel' onClick={this._handleCancel}>{translate['Not Now']}</button>
                <button className='bee-button-choose' onClick={this._handleJob}>{translate['Submit']}</button>
              </div>

            </div>
        )
      else this.setState({...this.state, level: this.state.level + 1})
    }
    else if (level === 5) {
      if (bio === 0)
        return (
            <div>
              <div className='bee-text'>{translate['Bio']}</div>
              <div className='bee-close'>✕</div>

              <div className='bee-text-graduate'>{translate['Write a Short Introduction Of Yourself, Your Activities Or Your Interests']}</div>

              <div className='bee-background-cont'>
                <BeeBackground className='bee-background'/>
                <Bee className='bee'/>
              </div>

              <textarea onChange={this._handleBioChange} className='bee-name-text-box' placeholder={translate['Example: 23 Years Old | Industrial Designer']}/>
              <div className={this.state.bioSubmitted && this.state.bioText.length === 0 ? 'bee-bio-error' : 'bee-bio-error-hide'}>{translate['Please Enter Bio Text!']}</div>

              <div className='bee-loading'>
                <div className='bee-loading-nav'>
                  <div className='bee-loading-fill' style={{width: (image + name + graduate + job + bio) + '%'}}/>
                </div>
                <div>{translate['Complement of profile']} {image + name + graduate + job + bio}%</div>
              </div>

              <div className='bee-buttons'>
                <button className='bee-button-cancel' onClick={this._handleCancel}>فعلا نه</button>
                <button className='bee-button-choose' onClick={this._handleBio}>ثبت</button>
              </div>

            </div>
        )
      else this.setState({...this.state, level: 1})
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
  const identity = state.auth.client.identity.content
  const client = state.auth.client
  const clientImgId = (client.user_type === 'person') ?
      (client.profile.profile_media)
      :
      (client.organization && client.organization.organization_logo)

  const userId = (client.organization && client.organization.id) || (client.user && client.user.id)

  const stateUser = state.users.list[userId]
  const defaultObject = {content: {}, isLoading: false, error: null}
  const profile = (stateUser && stateUser.profile) || defaultObject

  const fileSelectorByKeyValue = makeFileSelectorByKeyValue()

  return ({
    currentUserType: client.user_type,
    currentUserId: userId,
    currentUserProfileId: client.profile.id,
    currentUserMedia: (state.common.file.list[clientImgId] && state.common.file.list[clientImgId].file) || null,
    currentUserName: client.user.first_name + ' ' + client.user.last_name,
    currentUserBio: client.profile.description,
    currentUserEducation: client.educations,
    currentUserWork: client.workExperiences,
    clientFiles: fileSelectorByKeyValue(state, 'identity', identity),
    translate: getMessages(state),
    profile: profile.content,
    universities: getAllUniversities(state),
    educationFields: getAllEducationFields(state)
  })
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getProfileByUserId: GetUserActions.getProfileByUserId,
    createEducationByUserId: EducationActions.createEducationByUserId,
    updateUserByUserId: updateUserByUserIdAction.updateUser,
    getUserByUserId: GetUserActions.getUserByUserId,
    createWorkExperienceByUserId: WorkExperienceActions.createWorkExperienceByUserId,
    getEducationByUserId: EducationActions.getEducationByUserId,
    getWorkExperienceByUserId: WorkExperienceActions.getWorkExperienceByUserId,
    createFile,
    getFiles,
    updateProfile: updateProfile.updateProfile,
    getUniversities: getUniversities,
    getEducationFields: getEducationFields
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(UserBee)