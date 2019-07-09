import React, {Component} from 'react'
import {connect} from 'react-redux'
import {AppleSvg, AttachmentSvg, CurriculumSvg, DefaultUserIcon, PostSendIcon, UploadLogo} from 'src/images/icons'
import ProposalsActions from 'src/redux/actions/commonActions/proposalActions'
import {bindActionCreators} from 'redux'
import {BarLoader} from 'react-spinners'
import ResumeForm from '../../user/aboutMe/resume/ResumeForm'
import {getMessages} from 'src/redux/selectors/translateSelector'

class PostNewProposal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      isUpdating: null,
      id: null,
      sendResume: true,
      isEdit: false,
      focus: false,
    }
    this.changeDescription = this.changeDescription.bind(this)
    this.submit = this.submit.bind(this)
    this.dontSendResume = this.dontSendResume.bind(this)
    this.focus = this.focus.bind(this)
    this.blur = this.blur.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const {currentUser, proposals, loading} = nextProps
    const {isUpdating} = this.state

    if (isUpdating !== false && loading === false && !proposals.reduce((sum, pro) => [...sum, pro.proposal_identity.id], []).includes(currentUser && currentUser.id)) {
      this.setState({...this.state, isUpdating: false})
    }
    else if (isUpdating !== true && isUpdating !== true && proposals.reduce((sum, pro) => [...sum, pro.proposal_identity.id], []).includes(currentUser && currentUser.id)) {
      let proposal = null
      proposals.forEach(pro => pro.proposal_identity.id === currentUser.id ? proposal = {...pro} : null)
      this.setState({
        ...this.state,
        isUpdating: true,
        id: proposal.id,
        description: proposal ? proposal.proposal_description : '',
        sendResume: proposal && proposal.proposal_file,
      })
    }
  }

  changeDescription(e) {
    this.setState({...this.state, description: e.target.value})
  }

  focus() {
    this.setState({...this.state, focus: true})
  }

  blur() {
    this.setState({...this.state, focus: false})
  }

  dontSendResume() {
    this.setState({...this.state, sendResume: false})
  }

  _toggleEdit = () => {
    const {isEdit} = this.state
    this.setState({...this.state, isEdit: !isEdit})
  }

  submit() {
    const {actions, currentUser, postId, loading, showProposals} = this.props
    const {description, isUpdating, id, sendResume} = this.state
    if (loading === false && isUpdating !== null) {
      if (isUpdating === true) actions.updateProposal(
          {
            proposal_identity: currentUser.id,
            proposal_parent: postId,
            proposal_description: description,
            proposal_file: sendResume && (currentUser.related_cv || currentUser.related_catalog) ?
                currentUser.related_cv ? currentUser.related_cv.id : currentUser.related_catalog.id
                : null,
          }, id,
      )
      else actions.createProposal(
          description, currentUser.id, postId,
          sendResume && (currentUser.related_cv || currentUser.related_catalog) ?
              currentUser.related_cv ? currentUser.related_cv.id : currentUser.related_catalog.id
              : null,
      )
      setTimeout(() => showProposals(), 1000)
    }
  }

  render() {
    const {currentUser, loading, translate} = this.props
    const {isUpdating, description, sendResume, isEdit, focus} = this.state
    if (currentUser)
      if (isUpdating !== null) {
        return (
            <div className={focus ? 'proposal-phone proposal-cont' : 'proposal-cont'}>

              <div className='proposal-guide proposal-guide-send'>
                <div className='proposal-guide-first'>
                  <AppleSvg className='proposal-guide-logo'/>
                  <div className='proposal-guide-first-text'>صاحب پست می‌تواند سوابق شما را در پروفایل اینوین مشاهده کند. درصورت تمایل می‌توانید فایل رزومه خود را نیز در پاسخ ضمیمه کنید.</div>
                </div>
                <div className='proposal-guide-first'>
                  <AppleSvg className='proposal-guide-logo'/>
                  <div className='proposal-guide-first-text'>پاسخ ارسالی شما تنها برای صاحب پست قابل مشاهده خواهد بود.</div>
                </div>
              </div>

              {
                currentUser.profile_media ?
                    <img alt='profile' src={currentUser.profile_media.file} className='comment-owner'/>
                    :
                    <DefaultUserIcon className='comment-owner'/>
              }
              <div className={focus ? 'proposal-send-box proposal-send-box-phone' : 'proposal-send-box'}>
                <textarea value={description}
                          className={focus ? 'proposal-send-textarea proposal-send-textarea-phone' : 'proposal-send-textarea'}
                          placeholder='ارسال پیشنهاده ...'
                          onChange={this.changeDescription}
                          onFocus={this.focus}
                />
                <div className={focus ? 'proposal-send-profile proposal-send-phone' : 'proposal-send-profile'}>
                  {
                    currentUser.profile_media ?
                        <img alt='profile' src={currentUser.profile_media.file} className='proposal-owner'/>
                        :
                        <DefaultUserIcon className='proposal-owner'/>
                  }
                  <div className='proposal-send-profile-content'>
                    <div>{currentUser.first_name || currentUser.last_name ? currentUser.first_name + ' ' + currentUser.last_name : currentUser.nike_name || currentUser.official_name}</div>
                    <div className='proposal-send-profile-content-desc'>{currentUser.description || currentUser.biography}</div>
                  </div>
                </div>

                {
                  sendResume ?
                      currentUser.related_cv || currentUser.related_catalog ?
                          <div className={focus ? 'proposal-send-profile proposal-send-phone-second' : 'proposal-send-profile'}>
                            <div className='proposal-resume'>
                              <CurriculumSvg className='proposal-resume-logo'/>
                            </div>
                            <div className='proposal-send-profile-content'>
                              <div className='proposal-resume-observe'>
                                <span>مشاهده</span>
                                <span className='resume-close' onClick={this.dontSendResume}>✕</span>
                              </div>
                              <div className='proposal-resume-download'>
                                <a href={currentUser.related_cv ? currentUser.related_cv.file : currentUser.related_catalog.file}>
                                  <AttachmentSvg/>دانلود فایل {currentUser.related_cv ? 'رزومه' : 'کاتالوگ'}
                                </a>
                              </div>
                            </div>
                          </div>
                          :
                          <div className='proposal-resume-cont' onClick={this._toggleEdit}>
                            <div className='proposal-resume'>
                              <UploadLogo className='proposal-resume-logo'/>
                            </div>
                            <div className='proposal-send-profile-content'>
                              <div className='proposal-resume-not-exist'>شما فایل رزومه بارگزاری نکرده اید.</div>
                              <div className='proposal-resume-upload'><AttachmentSvg/>بارگزاری فایل رزومه</div>
                            </div>
                          </div>
                      : null
                }

                <div className={focus ? 'proposal-send-logo-phone' : ''} onClick={this.submit}>
                  <PostSendIcon className='proposal-send-btn'/>
                </div>
                <div className={focus ? 'proposal-remove-logo-phone' : 'display-none'} onClick={this.blur}>✕</div>
              </div>
              {loading === true && <div className='proposal-loading'><BarLoader color='#d8d9dc' size={35}/></div>}
              {isEdit && <ResumeForm toggleEdit={this._toggleEdit} translate={translate} owner={currentUser}/>}
            </div>
        )
      }
      else return <div className='proposal-loading-down'><BarLoader color='#d8d9dc' size={35}/></div>
    else return <div className='proposal-loading-down'>لطفا ابتدا عضو شوید!</div>
  }
}

const mapStateToProps = (state) => {
  const identityId = state.auth.client.identity.content
  const identities = state.identities.list
  const currentUser = identities[identityId]
  return {
    currentUser,
    translate: getMessages(state),
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    createProposal: ProposalsActions.createProposal,
    updateProposal: ProposalsActions.updateProposal,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostNewProposal)