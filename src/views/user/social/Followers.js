//@flow
import * as React from "react"
import {ItemHeader, ItemWrapper} from "../../common/cards/Frames";
import SocialIcon from "../../../images/common/social_svg";
import {Link} from "react-router-dom";
import DefaultUserIcon from "../../../images/defaults/defaultUser_svg";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import constants from "../../../consts/constants";

type PropsFollowers = {
  followers: [],
  translate: { [string]: string },
  followees: [],
  deleteFollow: Function,
  updateFollow: Function,
  createFollow: Function,
  identityId: number,
  userId: number,
}

export const Followers = (props: PropsFollowers) => {
  const {followers, translate, followees} = props
  const followeeIds = followees.map(followee => followee.id)

  const onDeleteFollow = (follower) => {
    const {deleteFollow, userId} = props
    const followId = follower.follow_id
    const followOwnerId = userId
    const followOwnerType = follower.identity_user ? constants.USER_TYPES.PERSON : constants.USER_TYPES.ORG
    deleteFollow({followId, followOwnerId, followOwnerType})
  }

  const onAcceptFollow = (follower) => {
    const {updateFollow, identityId, userId} = props
    const followId = follower.follow_id
    const followOwnerId = userId
    const formValues = {follow_follower: follower.id, follow_followed: identityId, follow_accepted: true}
    console.log(follower, 'follower')
    updateFollow({followId, formValues, followOwnerId})
  }

  const onCreateFollow = (follower) => {
    const {createFollow, identityId, userId} = props
    const followOwnerId = userId
    const followOwnerType = follower.identity_user ? constants.USER_TYPES.PERSON : constants.USER_TYPES.ORG
    const formValues = {follow_follower: identityId, follow_followed: follower.id}
    createFollow({formValues, followOwnerId, followOwnerType})
  }

  return (
      <ItemWrapper icon={<SocialIcon/>}>
        <ItemHeader title={`${translate['Followers']} (${followers.length})`}/>
        <div className="members-wrapper">
          {
            followers.map((follower) => {
              const id = follower.identity_user || follower.identity_organization
              return (
                  <div className="member-wrapper">
                    <div className="image-wrapper">
                      <Link to={`/user/${id}`}>
                        {
                          (!follower.img) ? (<DefaultUserIcon/>) : (
                              <img alt="" className="rounded-circle" src={follower.img}/>)
                        }
                      </Link>
                    </div>
                    <div className="details">
                      <div className="text-section">
                        <div className="name">{follower.name}</div>
                      </div>
                      {!follower.accepted
                          ?
                          <div>
                            <FontAwesome name="times-circle" className='reject-follower pulse' onClick={() => onDeleteFollow(follower)}/>
                            <FontAwesome name="check-circle" className='accept-follower pulse' onClick={() => onAcceptFollow(follower)}/>
                          </div>
                          : <div className="follow-section">{translate['Followed']}</div>
                      }
                      {!followeeIds.includes(follower.id) &&
                      <div>
                        <FontAwesome name="plus-circle" className='follow pulse' onClick={() => onCreateFollow(follower)}/>
                      </div>
                      }
                    </div>
                  </div>
              )
            })
          }
        </div>
      </ItemWrapper>
  )
}

Followers.propTypes = {
  followers: PropTypes.array.isRequired,
  translate: PropTypes.object.isRequired,
  followees: PropTypes.array.isRequired,
  deleteFollow: PropTypes.func.isRequired,
  updateFollow: PropTypes.func.isRequired,
  identityId: PropTypes.number.isRequired,
  createFollow: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
}