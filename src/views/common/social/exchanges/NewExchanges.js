import React from 'react'
import {Link} from 'react-router-dom'
import {Contacts, QuestionMark, Stream, ChannelIcon} from 'src/images/icons'

class NewExchanges extends React.Component {
  constructor(props: Props) {
    super(props)
    this.state = {
      buttonHover: false,
      followingOrgans: [],
      followingUsers: [],
      initialMembers: [],
      moreMembers: false,
      requested: false,
      viewType: 'member-square-user',
    }
    const self: any = this
    self.changeViewType = self.changeViewType.bind(self)
    self.getMembers = self.getMembers.bind(self)
  }

  changeViewType() {
    // if (this.state.viewType === 'member-square-user') {
    //   this.setState({...this.state, viewType: 'member-row'})
    // } else this.setState({...this.state, viewType: 'member-square-user'})
  }

  _onDeleteFollowing(exchange) {
    const {deleteExchangeMembership, userId} = this.props
    deleteExchangeMembership({exchangeMembershipId: exchange.membership_id, exchangeMembershipOwnerId: userId})
  }

  follow(exchangeId) {
    const {follow, clientId} = this.props
    follow({identityId: clientId, exchangeIdentity: exchangeId})
  }

  getMembers(exchange, index, followed) {
    const {id} = exchange
    return <div key={index} className={this.state.viewType}>
      <Link to={`/exchange/${id}`}>
        <div className={'member-picture-container'}>
          {
            exchange.exchange_image ?
                <img alt='exchange' src={exchange.exchange_image.file} width={'55px'} height={'55px'}
                     className='member-picture'/>
                : <ChannelIcon height={'55px'} width={'55px'} className="member-picture default-exchange"/>
          }
        </div>

        <div className='member-info-container'>
          <div className='member-name'>{exchange.name}</div>
          <div className='member-description'>{exchange.description}</div>
        </div>
      </Link>
      {
        followed[exchange.id] ?
            <div className="member-follow" onClick={() => this._onDeleteFollowing(exchange)}>
              <span className="member-following-button"> </span>
            </div>
            :
            <div className="member-follow" onClick={() => this.follow(exchange.id)}>
              <span className="member-follow-here"> </span>
            </div>
      }
    </div>
  }

  componentDidMount() {
    if (document.body.clientWidth > 480) window.scrollTo({top: 0})
  }

  render() {
    let {viewType} = this.state
    let {exchanges, translate, followed} = this.props

    return (
        <div className='members-frame'>
          <div className='members-header-right'>
            <Contacts width="22px" height="22px" containerClass='svg-container-info-view' svgClass='svg-info-view'/>
            <span>{translate['Joined exchanges']}</span>
          </div>
          <div className='members-header-left' style={{cursor: 'default'}} onClick={this.changeViewType}>
            {viewType === 'member-square-user' ?
                <Stream width="16px" height="16px" svgClass={'svg-info-view'}/> :
                <QuestionMark width="20px" height="20px" svgClass={'svg-info-view'}/>}
          </div>
          <div className='members-body'>
            {
              exchanges.map((p, index) => {
                return this.getMembers(p, index, followed)
              })
            }
            <div className='zero-height-member'/>
            <div className='zero-height-member'/>
          </div>
        </div>
    )
  }
}

export default NewExchanges