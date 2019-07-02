import React, {Component} from 'react'
import {connect} from 'react-redux'
import {DefaultUserIcon, PostSendIcon} from 'src/images/icons'
import ProposalsActions from 'src/redux/actions/commonActions/proposalActions'
import {bindActionCreators} from 'redux'
import {BarLoader} from 'react-spinners'

class PostNewProposal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      isUpdating: null,
      id: null,
    }
    this.changeDescription = this.changeDescription.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const {currentUser, proposals, loading} = nextProps
    const {isUpdating} = this.state

    if (isUpdating !== false && loading === false && !proposals.reduce((sum, pro) => [...sum, pro.proposal_identity.id], []).includes(currentUser.id)) {
      this.setState({...this.state, isUpdating: false})
    }
    else if (isUpdating !== true && isUpdating !== true && proposals.reduce((sum, pro) => [...sum, pro.proposal_identity.id], []).includes(currentUser.id)) {
      let proposal = null
      proposals.forEach(pro => pro.proposal_identity.id === currentUser.id ? proposal = {...pro} : null)
      this.setState({...this.state, isUpdating: true, id: proposal.id, description: proposal ? proposal.proposal_description : ''})
    }
  }

  changeDescription(e) {
    this.setState({...this.state, description: e.target.value})
  }

  submit() {
    const {actions, currentUser, postId, loading, showProposals} = this.props
    const {description, isUpdating, id} = this.state
    if (loading === false && isUpdating !== null) {
      this.setState({...this.state, isUpdating: null, id: null}, () => {
        if (isUpdating === true) actions.updateProposal({proposal_identity: currentUser.id, proposal_description: description}, id)
        else actions.createProposal(description, currentUser.id, postId)
        setTimeout(() => showProposals(), 1000)
      })
    }
  }

  render() {
    const {currentUser, loading} = this.props
    const {isUpdating, description} = this.state
    if (isUpdating !== null) {
      return (
          <div className='proposal-cont'>
            {
              currentUser.profile_media ?
                  <img alt='profile' src={currentUser.profile_media.file} className='comment-owner'/>
                  :
                  <DefaultUserIcon className='comment-owner'/>
            }
            <div className='proposal-send-box'>
              <textarea value={description} className='proposal-send-textarea' placeholder='ارسال پیشنهاده ...' onChange={this.changeDescription}/>
              <div className='proposal-send-profile'>
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
              <div onClick={this.submit}>
                <PostSendIcon className='proposal-send-btn'/>
              </div>
            </div>
            {loading === true && <div className='proposal-loading'><BarLoader color='#d8d9dc' size={35}/></div>}
          </div>
      )
    }
    else return <div className='proposal-loading-down'><BarLoader color='#d8d9dc' size={35}/></div>
  }
}

const mapStateToProps = (state) => {
  const identityId = state.auth.client.identity.content
  const identities = state.identities.list
  const currentUser = identities[identityId]
  return {
    currentUser,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    createProposal: ProposalsActions.createProposal,
    updateProposal: ProposalsActions.updateProposal,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostNewProposal)