//@flow
import * as React from "react"
import {ItemHeader, ItemWrapper} from "../cards/Frames";
import SocialIcon from "../../../images/common/social_svg";
import {Link} from "react-router-dom";
import DefaultUserIcon from "../../../images/defaults/defaultUser_svg";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import CheckOwner from "../CheckOwner";

type PropsFollowers = {
  followers: [],
  translate: { [string]: string },
  followees: [],
  deleteFollow: Function,
  updateFollow: Function,
  createFollow: Function,
  identityId: number,
  userId: number,
  identityType: string,
  paramId: number,
}

export const Followers = (props: PropsFollowers) => {
  const {followers, translate, followees, identityType, paramId} = props
  const followeeIds = followees.map(followee => followee.id)

  const onDeleteFollow = (follower) => {
    const {deleteFollow, userId} = props
    const followId = follower.follow_id
    deleteFollow({followId, followOwnerId: userId, followOwnerType: identityType})
  }

  const onAcceptFollow = (follower) => {
    const {updateFollow, userId, identityType} = props
    const followId = follower.follow_id
    const formValues = {follow_accepted: true}
    updateFollow({followId, formValues, followOwnerId: userId, followOwnerType: identityType})
  }

  const onCreateFollow = (follower) => {
    const {createFollow, identityId, userId, identityType} = props
    const followOwnerId = userId
    const formValues = {follow_follower: identityId, follow_followed: follower.id}
    createFollow({formValues, followOwnerId, followOwnerType: identityType})
  }

  return (
      <ItemWrapper icon={<SocialIcon/>}>
        <ItemHeader title={`${translate['Followers']} (${followers.length})`}/>
        <div className="members-wrapper">
          {
            followers.map((follower) => {
              const id = follower.identity_user || follower.identity_organization
              const url = follower.identity_user ? `/user/${id}` : `/organization/${id}`
              return (
                  <div className="member-wrapper">
                    <div className="image-wrapper">
                      <Link to={url}>
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
                      {!follower.follow_accepted
                          ?

                          <CheckOwner id={paramId}>
                            <FontAwesome name="times-circle" className='reject-follower pulse'
                                         onClick={() => onDeleteFollow(follower)}/>
                            <FontAwesome name="check-circle" className='accept-follower pulse'
                                         onClick={() => onAcceptFollow(follower)}/>
                          </CheckOwner>
                          : <div className="follow-section">{translate['Followed']}</div>
                      }
                      {!followeeIds.includes(follower.id) &&
                      <CheckOwner id={paramId}>
                        <FontAwesome name="plus-circle" className='follow pulse'
                                     onClick={() => onCreateFollow(follower)}/>
                      </CheckOwner>
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
  identityType: PropTypes.string.isRequired,
  createFollow: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  paramId: PropTypes.number.isRequired,
}