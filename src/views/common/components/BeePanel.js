import React, {Component} from 'react'
import BeeBackground from 'src/images/bee/beeBackground'
import connect from 'react-redux/es/connect/connect'
import {Bee} from 'src/images/icons'
import {bindActionCreators} from 'redux'
import InteliInput from '../inputs/InteliInput'
import FontAwesome from 'react-fontawesome'
import constants from '../../../consts/constants'
import {getMessages} from '../../../redux/selectors/translateSelector'
import EducationActions from '../../../redux/actions/user/educationActions'
import updateUserByUserIdAction from '../../../redux/actions/user/updateUserByUserIdAction'
import GetUserActions from '../../../redux/actions/user/getUserActions'
import WorkExperienceActions from '../../../redux/actions/user/workExperienceActions'
import {Link} from 'react-router-dom'

class BeePanel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      level: 1,
      image: 0,
      name: 0,
      graduate: 0,
      job: 0,
      bio: 0,

      maghta: '',
      major: '',
      college: ''
    }
  }

  componentDidMount(): void {
    const {currentUserMedia, currentUserName, profile, currentUserEducation, currentUserWork, currentUserId, actions} = this.props
    actions.getUserByUserId(currentUserId)
    actions.getProfileByUserId(currentUserId)
    actions.getEducationByUserId({userId: currentUserId})
    actions.getWorkExperienceByUserId({userId: currentUserId})

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

    this.setState({...this.state, image, name, graduate, job, bio})

  }

  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    const {currentUserMedia, currentUserName, profile, currentUserEducation, currentUserWork} = nextProps

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

    this.setState({...this.state, image, name, graduate, job, bio})
  }

  _handleCancel = () => {
    const {level} = this.state
    if (level < 5)
      this.setState({...this.state, level: this.state.level + 1})
    else this.setState({...this.state, level: 1})
  }

  _handleChooseProfile = () => {
    this.setState({...this.state, level: 2})
  }

  _handleName = () => {
    this.setState({...this.state, level: 3})
  }

  _handleGraduate = () => {
    const {translate, actions, currentUserId} = this.props
    if (this.state.maghta.length > 0 && this.state.major.length > 0 && this.state.college.length > 0) {

      let grade
      if (this.state.maghta === translate['Bachelor']) {
        grade = constants.SERVER_GRADES.BACHELOR
      } else if (this.state.maghta === translate['Master']) {
        grade = constants.SERVER_GRADES.MASTER
      } else if (this.state.maghta === translate['Phd']) {
        grade = constants.SERVER_GRADES.PHD
      }

      const formFormat = {
        grade: grade,
        university: this.state.college,
        field_of_study: this.state.major,
      }

      const formValues: {} = {...formFormat}
      actions.createEducationByUserId({userId: currentUserId, formValues})
    } else alert('لطفا ابتدا موارد لازم را انتخاب کنید')
  }

  _handleJob = () => {
    if (this.workRole.value.length > 0 && this.workName.value.length > 0) {
      const {actions, currentUserId} = this.props
      const formFormat = {
        name: this.workRole.value,
        position: this.workName.value,
        work_experience_organization: 2506,
      }
      const formValues: {} = {...formFormat}
      actions.createWorkExperienceByUserId({userId: currentUserId, formValues})
      setTimeout(() => {
        actions.getWorkExperienceByUserId({userId: currentUserId})
      }, 500)
    } else alert('error')
  }

  _handleBio = () => {
    if (this.bio.value.length > 0) {
      const {actions, currentUserId} = this.props
      const formFormat = {
        description: this.bio.value
      }
      actions.updateUserByUserId(formFormat, currentUserId)
      setTimeout(() => {
        actions.getUserByUserId(currentUserId)
        actions.getProfileByUserId(currentUserId)
      }, 500)
    } else alert('لطفا ابتدا بیوگرافی را تایپ نمایید')
  }

  _handleSelectMaghta = (select) => {
    this.setState({...this.state, maghta: select})
  }

  _handleSelectMajor = (select) => {
    this.setState({...this.state, major: select})
  }

  _handleSelectCollege = (select) => {
    this.setState({...this.state, college: select})
  }

  renderLevel() {
    const {level, image, name, graduate, job, bio} = this.state
    const {translate, currentUserId} = this.props
    if (image + name + graduate + job + bio === 100) {
      return (
          <div>
            <div className='bee-text'>عالیه!</div>
            <div className='bee-close'>✕</div>

            <div className='bee-text-graduate'>تبریک، پروفایل شما کامل شد.</div>

            <div className='bee-background-cont'>
              <BeeBackground className='bee-background'/>
              <Bee className='bee'/>
            </div>

            <div className='bee-button-complete'>
              {image + name + graduate + job + bio} %
            </div>

            <div className='bee-button-submit-cont'>
              <Link to={`/user/${currentUserId}`} className='bee-button-submit'>مشاهده پروفایل</Link>
            </div>

          </div>
      )
    } else if (level === 1) {
      if (image === 0)
        return (
            <div>
              <div className='bee-text'>یک عکس برای پروفایل خود انتخاب کنید.</div>
              <div className='bee-close'>✕</div>

              <div className='bee-background-cont'>
                <BeeBackground className='bee-background'/>
                <Bee className='bee'/>
              </div>

              <div className='bee-buttons'>
                <button className='bee-button-cancel' onClick={this._handleCancel}>فعلا نه</button>
                <button className='bee-button-choose' onClick={this._handleChooseProfile}>انتخاب عکس</button>
              </div>
            </div>
        )
      else this.setState({...this.state, level: this.state.level + 1})
    } else if (level === 2) {
      if (name === 0)
        return (
            <div>
              <div className='bee-text'>نام خود را وارد کنید.</div>
              <div className='bee-close'>✕</div>

              <div className='bee-background-cont'>
                <BeeBackground className='bee-background'/>
                <Bee className='bee'/>
              </div>

              <div className='bee-text-name'>نام و نام خانوادگی</div>
              <input type='text' className='bee-name-text-box'/>

              <div className='bee-loading'>
                <div className='bee-loading-nav'>
                  <div className='bee-loading-fill' style={{width: (image + name + graduate + job + bio) + '%'}}/>
                </div>
                <div>تکمیل پروفایل {image + name + graduate + job + bio}%</div>
              </div>

              <div className='bee-buttons'>
                <button className='bee-button-cancel' onClick={this._handleCancel}>فعلا نه</button>
                <button className='bee-button-choose' onClick={this._handleName}>ثبت</button>
              </div>

            </div>
        )
      else this.setState({...this.state, level: this.state.level + 1})
    } else if (level === 3) {
      if (graduate === 0)
        return (
            <div>
              <div className='bee-text'>آخرین مقطع تحصیلی</div>
              <div className='bee-close'>✕</div>

              <div className='bee-text-graduate'>آخرین مقطع تحصیلی خود را وارد کنید. شما می توانید در ادامه، از داخل صفحه پروفایل مقاطع دیگر را نیز وارد نمایید</div>

              <div className='bee-background-cont'>
                <BeeBackground className='bee-background'/>
                <Bee className='bee'/>
              </div>

              <div className='bee-text-name'>مقطع</div>
              <InteliInput handleChange={this._handleSelectMaghta} list={[translate['Bachelor'], translate['Phd'], translate['Master']]} className='bee-inteli-text-box'/>
              <div className='bee-text-name'>رشته تحصیلی</div>
              <InteliInput icon={<FontAwesome name='search' className='inteli-search-svg'/>} handleChange={this._handleSelectMajor} list={['نرم افزار']} className='bee-inteli-text-box'/>
              <div className='bee-text-name'>دانشگاه</div>
              <InteliInput icon={<FontAwesome name='search' className='inteli-search-svg'/>} handleChange={this._handleSelectCollege} list={['دانشگاه تهران']} className='bee-inteli-text-box'/>

              <div className='bee-loading'>
                <div className='bee-loading-nav'>
                  <div className='bee-loading-fill' style={{width: (image + name + graduate + job + bio) + '%'}}/>
                </div>
                <div>تکمیل پروفایل {image + name + graduate + job + bio}%</div>
              </div>

              <div className='bee-buttons'>
                <button className='bee-button-cancel' onClick={this._handleCancel}>فعلا نه</button>
                <button className='bee-button-choose' onClick={this._handleGraduate}>ثبت</button>
              </div>

            </div>
        )
      else this.setState({...this.state, level: this.state.level + 1})
    } else if (level === 4) {
      if (job === 0)
        return (
            <div>
              <div className='bee-text'>شغل</div>
              <div className='bee-close'>✕</div>

              <div className='bee-text-graduate'>سابقه کاری، پروفایل حرفه ای تری از شما معرفی می کند.</div>

              <div className='bee-background-cont'>
                <BeeBackground className='bee-background'/>
                <Bee className='bee'/>
              </div>

              <div className='bee-text-name'>عنوان شغلی</div>
              <input ref={e => this.workRole = e} type='text' className='bee-graduate-text-box' placeholder='مثال: مدیر اجرایی'/>
              <div className='bee-text-name'>محل کار</div>
              <input ref={e => this.workName = e} type='text' className='bee-name-text-box' placeholder='مثال: پژوهشکده رویان'/>

              <div className='bee-loading'>
                <div className='bee-loading-nav'>
                  <div className='bee-loading-fill' style={{width: (image + name + graduate + job + bio) + '%'}}/>
                </div>
                <div>تکمیل پروفایل {image + name + graduate + job + bio}%</div>
              </div>

              <div className='bee-buttons'>
                <button className='bee-button-cancel' onClick={this._handleCancel}>فعلا نه</button>
                <button className='bee-button-choose' onClick={this._handleJob}>ثبت</button>
              </div>

            </div>
        )
      else this.setState({...this.state, level: this.state.level + 1})
    } else if (level === 5) {
      if (bio === 0)
        return (
            <div>
              <div className='bee-text'>بیوگرافی</div>
              <div className='bee-close'>✕</div>

              <div className='bee-text-graduate'>معرفی کوتاهی از خود، فعالیت ها یا علاقه مندی هایتان بنویسید.</div>

              <div className='bee-background-cont'>
                <BeeBackground className='bee-background'/>
                <Bee className='bee'/>
              </div>

              <div className='bee-text-name'>عنوان شغلی</div>
              <textarea ref={e => this.bio = e} className='bee-name-text-box' placeholder='مثال: 23 ساله | طراح صنعتی'/>

              <div className='bee-loading'>
                <div className='bee-loading-nav'>
                  <div className='bee-loading-fill' style={{width: (image + name + graduate + job + bio) + '%'}}/>
                </div>
                <div>تکمیل پروفایل {image + name + graduate + job + bio}%</div>
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
    if (this.props.currentUserType === 'person')
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
  const client = state.auth.client
  const clientImgId = (client.user_type === 'person') ?
      (client.profile.profile_media)
      :
      (client.organization && client.organization.organization_logo)

  const userId = (client.organization && client.organization.id) || (client.user && client.user.id)

  const stateUser = state.users.list[userId]
  const defaultObject = {content: {}, isLoading: false, error: null}
  const profile = (stateUser && stateUser.profile) || defaultObject

  return ({
    currentUserType: client.user_type,
    currentUserIdentity: client.identity.content,
    currentUserId: userId,
    currentUserImgId: clientImgId,
    currentUserMedia: (state.common.file.list[clientImgId] && state.common.file.list[clientImgId].file) || null,
    currentUserName: client.user.first_name + ' ' + client.user.last_name,
    currentUserBio: client.profile.description,
    currentUserEducation: client.educations,
    currentUserWork: client.workExperiences,
    translate: getMessages(state),
    profile: profile.content
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
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(BeePanel)