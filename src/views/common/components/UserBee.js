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
import InteliInput from '../inputs/InteliInput'
import updateUserByUserIdAction from 'src/redux/actions/user/updateUserByUserIdAction'
import WorkExperienceActions from 'src/redux/actions/user/workExperienceActions'
import {Bee} from 'src/images/icons'
import {bindActionCreators} from 'redux'
import {ClipLoader} from 'react-spinners'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {Link} from 'react-router-dom'
import types from 'src/redux/actions/types'
import uuid from 'uuid'
import {createFileFunc} from 'src/views/common/Functions'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import TempActions from 'src/redux/actions/tempActions'
import AuthActions from 'src/redux/actions/authActions'

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
      resume: null,
      resumeId: null,

      imageLoading: false,
      selectedProfileFile: null,
      selectedProfile: null,
      profileMediaId: null,

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
      jobSubmitted: false,

      getData: false,

      done: false,

      close: false,
    }
  }

  componentDidMount(): void {
    const {currentUser, actions} = this.props
    actions.getEducationByUserId({userId: currentUser.id})
    actions.getWorkExperienceByUserId({userId: currentUser.id})
    actions.getUniversities()
    actions.getEducationFields()
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (!this.state.done) {
      const {currentUser, profileIdTemp, resumeIdTemp, temp, actions} = nextProps
      const {profileMediaId, resumeId, resume} = this.state

      let setResume = resume
      let image = 0
      let name = 0
      let graduate = 0
      let job = 0
      let bio = 0

      if (currentUser.profile_media) {
        image = 30
      }
      if ((currentUser.last_name && currentUser.last_name.trim().length > 0) || (currentUser.first_name && currentUser.first_name.trim().length > 0)) {
        name = 20
      }
      if (currentUser.description && currentUser.description.trim().length > 0) {
        bio = 20
      }
      if (currentUser.educations && currentUser.educations.content.length > 0) {
        graduate = 15
      }
      if (currentUser.workExperiences && currentUser.workExperiences.content.length > 0) {
        job = 15
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

      this.setState({...this.state, image, name, graduate, job, bio, resume: setResume}, () => {
        if (image === 30) this.setState({...this.state, imageLoading: false, profileMediaId: null})
        if (image === 30 && name === 20 && bio === 20 && graduate === 15 && job === 15) {
          this.setState({...this.state, done: true}, () => setTimeout(() => actions.setBeeDone(true), 30000))
        }
      })
    }
  }

  _handleCancel = () => {
    const {level} = this.state
    if (level < 5)
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
    if (this.state.nameText.trim().length > 0 && this.state.lastNameText.trim().length > 0) {
      const {actions, currentUser} = this.props
      const formFormat = {
        first_name: this.state.nameText,
        last_name: this.state.lastNameText,
      }
      actions.updateUserByUserId(formFormat, currentUser.id)
    }
    else this.setState({...this.state, nameSubmitted: true})
  }

  _handleGraduate = () => {
    const {translate, actions, currentUser} = this.props
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
        field_of_study: this.state.major,
      }

      const formValues: {} = {...formFormat}
      actions.createEducationByUserId({userId: currentUser.id, formValues})
    }
    else this.setState({...this.state, educationSubmitted: true})
  }

  _handleJob = () => {
    if (this.state.jobTitle.length > 0 && this.state.jobWork.length > 0) {
      const {actions, currentUser} = this.props
      const formFormat = {
        name: this.state.jobWork,
        position: this.state.jobTitle,
        work_experience_organization: 4309,
      }
      const formValues: {} = {...formFormat}
      actions.createWorkExperienceByUserId({userId: currentUser.id, formValues})
      setTimeout(() => {
        actions.getWorkExperienceByUserId({userId: currentUser.id})
      }, 500)
    }
    else this.setState({...this.state, jobSubmitted: true})
  }

  _handleBio = () => {
    if (this.state.bioText.length > 0) {
      const {actions, currentUser} = this.props
      const formFormat = {
        description: this.state.bioText,
      }
      actions.updateUserByUserId(formFormat, currentUser.id)
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

  _handleClose = () => this.setState({...this.state, close: true})

  renderLevel() {
    const {level, image, name, graduate, job, bio, resume} = this.state
    const {translate, currentUser} = this.props
    if (image + name + graduate + job + bio === 100) {
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
              {image + name + graduate + job + bio} %
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
      else this.setState({...this.state, level: this.state.level + 1})
    }
    else if (level === 2) {
      if (name === 0)
        return (
            <div>
              <div className='bee-text'>{translate['Enter Your Name']}</div>
              <div className='bee-close' onClick={this._handleClose}>✕</div>

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
              <div className='bee-close' onClick={this._handleClose}>✕</div>

              <div className='bee-text-graduate'>{translate['Enter Your Last Education Major. You Can Change It Later']}</div>

              <div className='bee-background-cont'>
                <BeeBackground className='bee-background'/>
                <Bee className='bee'/>
              </div>

              <div className='bee-text-name'>{translate['Grade']}</div>
              <InteliInput handleChange={this._handleSelectMaghta} list={[{name: translate['Bachelor'], id: 1}, {name: translate['Phd'], id: 2}, {name: translate['Master'], id: 3}]} className='bee-inteli-text-box'/>
              <div className={this.state.educationSubmitted && this.state.maghta.length === 0 ? 'bee-job-error' : 'bee-job-error-hide'}>{translate['Please Select Grade!']}</div>

              <div className='bee-text-name'>{translate['Field of study']}</div>
              <InteliInput noCheck={true} icon={<FontAwesome name='search' className='inteli-search-svg-h'/>} handleChange={this._handleSelectMajor} list={fields} className='bee-inteli-text-box'/>
              <div className={this.state.educationSubmitted && this.state.major.length === 0 ? 'bee-job-error' : 'bee-job-error-hide'}>{translate['Please Select Major!']}</div>

              <div className='bee-text-name'>{translate['University']}</div>
              <InteliInput noCheck={true} icon={<FontAwesome name='search' className='inteli-search-svg-h'/>} handleChange={this._handleSelectCollege} list={universities} className='bee-inteli-text-box'/>
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
              <div className='bee-close' onClick={this._handleClose}>✕</div>

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
              <div className='bee-close' onClick={this._handleClose}>✕</div>

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

const mapStateToProps = (state) => {
  const id = state.auth.client.identity.content
  const user = state.identities.list[id]

  return ({
    currentUser: user,
    translate: getMessages(state),
    universities: getAllUniversities(state),
    educationFields: getAllEducationFields(state),
    profileIdTemp: state.temp.file['profile_media'],
    resumeIdTemp: state.temp.file['resume'],
    files: state.common.file.list,
    temp: state.temp.file,
  })
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateUserByUserId: updateUserByUserIdAction.updateUser,
    createEducationByUserId: EducationActions.createEducationByUserId,
    createWorkExperienceByUserId: WorkExperienceActions.createWorkExperienceByUserId,
    getEducationByUserId: EducationActions.getEducationByUserId,
    getWorkExperienceByUserId: WorkExperienceActions.getWorkExperienceByUserId,
    getUniversities: getUniversities,
    getEducationFields: getEducationFields,
    createFile: FileActions.createFile,
    removeFileFromTemp: TempActions.removeFileFromTemp,
    setBeeDone: AuthActions.setBeeDone,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(UserBee)