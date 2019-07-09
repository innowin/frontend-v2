import React from 'react'
import {Link} from 'react-router-dom'
import {AppleSvg, AttachmentSvg, BookmarkSvg, DefaultUserIcon, Organization, UnBookmarkSvg, User as UserIcon} from '../../../images/icons'
import Moment from 'react-moment'
import {bindActionCreators} from 'redux'
import constants from 'src/consts/constants'
import ProposalsActions from 'src/redux/actions/commonActions/proposalActions'
import {connect} from 'react-redux'

const Proposals = (props) => {
  const {proposals} = props

  const Bookmark = (proposal) => {
    const {actions} = props
    actions.updateProposal(
        {
          proposal_identity: proposal.proposal_identity,
          proposal_parent: proposal.proposal_parent,
          proposal_bookmarked: true,
        },
        proposal.id,
        true,
    )
  }

  return (
      <div>
        <div className='post-proposal-title'>پیشنهاده ها</div>
        <div className='post-proposal-container'>

          {
            proposals.length > 0 && <div className='proposal-guide'>
              <div className='proposal-guide-first'>
                <AppleSvg className='proposal-guide-logo'/>
                <div className='proposal-guide-first-text'>
                  می‌توانید گزینه‌های مورد علاقه خود را با علامت
                  <UnBookmarkSvg className='post-proposal-bookmark-guide'/>
                  نشانه‌گذاری کنید
                </div>
              </div>
            </div>
          }
          {
            proposals.length > 0 ? proposals.map((proposal, index) =>
                    <div key={index} className='post-proposal-content'>
                      <Link to={`/${proposal.proposal_identity.identity_type}/${proposal.proposal_identity.id}`} className='post-proposal-profile link-post-decoration'>
                        {
                          proposal.proposal_identity.profile_media ?
                              <img alt='profile' src={proposal.proposal_identity.profile_media.file} className='comment-owner'/>
                              :
                              <DefaultUserIcon className='comment-owner'/>
                        }
                        <div className='post-proposal-content-profile'>
                          {
                            proposal.proposal_identity.first_name || proposal.proposal_identity.last_name
                                ? proposal.proposal_identity.first_name + ' ' + proposal.proposal_identity.last_name :
                                proposal.proposal_identity.nike_name || proposal.proposal_identity.official_name
                          }
                          <span>   </span>
                          <span className='proposal-send-profile-content-desc'>{proposal.proposal_identity.username}</span>
                          <span>   </span>
                          <div className='display-inline-block proposal-send-profile-content-desc'><Moment element='span' fromNow ago>{proposal.updated_time}</Moment><span> پیش</span></div>
                        </div>
                      </Link>
                      <div className='post-proposal-content-desc' style={{direction: new RegExp('^[A-Za-z]*$').test(proposal.proposal_description && proposal.proposal_description[0]) ? 'ltr' : 'rtl'}}>
                        {proposal.proposal_description}
                      </div>
                      <div className='post-proposal-footer'>
                        {
                          proposal.proposal_bookmarked ?
                              <BookmarkSvg className='post-proposal-bookmark' onClick={() => Bookmark(proposal)}/>
                              : <UnBookmarkSvg className='post-proposal-bookmark' onClick={() => Bookmark(proposal)}/>
                        }
                        {
                          proposal.proposal_file ?
                              <a href={proposal.proposal_file.file}><AttachmentSvg className='post-proposal-resume-icon'/></a>
                              : <AttachmentSvg className='post-proposal-not-resume-icon'/>
                        }
                        <Link to={`/${proposal.proposal_identity.identity_type}/${proposal.proposal_identity.id}`}>
                          {
                            proposal.proposal_identity.identity_type === constants.USER_TYPES.USER ?
                                <UserIcon className='post-proposal-user-icon'/>
                                : <Organization className='post-proposal-user-icon'/>
                          }
                        </Link>
                      </div>
                    </div>,
                )
                :
                <div className='post-proposal-content'>
                  پیشنهاده ای وجود ندارد!
                </div>
          }
        </div>
      </div>
  )
}


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    createProposal: ProposalsActions.createProposal,
    updateProposal: ProposalsActions.updateProposal,
  }, dispatch),
})

export default connect(null, mapDispatchToProps)(Proposals)