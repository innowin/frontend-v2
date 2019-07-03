import React from 'react'
import {Link} from 'react-router-dom'
import {AttachmentSvg, BookmarkSvg, DefaultUserIcon, Organization, UnBookmarkSvg, User as UserIcon} from '../../../images/icons'
import Moment from 'react-moment'
import constants from 'src/consts/constants'

const Proposals = (props) => {
  const {proposals} = props
  return (
      <div>
        <div className='post-proposal-title'>پیشنهاده ها</div>
        <div className='post-proposal-container'>
          {
            proposals.map((proposal, index) =>
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
                      proposal.bookmarked ? <BookmarkSvg className='post-proposal-bookmark'/> : <UnBookmarkSvg className='post-proposal-bookmark'/>
                    }
                    <AttachmentSvg className={proposal.proposal_file ? 'post-proposal-resume-icon' : 'post-proposal-not-resume-icon'}/>
                    {
                      proposal.proposal_identity.identity_type === constants.USER_TYPES.USER ?
                          <UserIcon className='post-proposal-user-icon'/>
                          : <Organization className='post-proposal-user-icon'/>
                    }
                  </div>
                </div>,
            )
          }
        </div>
      </div>
  )
}

export default Proposals