import * as React from "react";
import constants from 'src/consts/constants'
import DefaultUserIcon from "../../../images/defaults/defaultUser_svg";
import FontAwesome from 'react-fontawesome'
import PropTypes from "prop-types";
import SocialIcon from "../../../images/common/social_svg";
import {ItemHeader, ItemWrapper} from "../../common/cards/Frames";
import {Link} from "react-router-dom";


type PropsFollowees = {
  edit: boolean,
  showEdit: Function,
  followees: [],
  deleteFollow: Function,
  translate: { [string]: string }
}

export const Followees = (props: PropsFollowees) => {
  const {edit, showEdit, followees, translate} = props
  const onDeleteFollowing = (followee) => {
    const {deleteFollow} = props
    const followId = followee.follow_id
    const followOwnerId = followee.identity_user || followee.identity_organization
    const followOwnerType = followee.identity_user ? constants.USER_TYPES.PERSON : constants.USER_TYPES.ORG
    deleteFollow({followId, followOwnerId, followOwnerType})
  }

  return (
      <ItemWrapper icon={<SocialIcon/>}>
        <ItemHeader title={`${translate['Followings']} (${followees.length})`} showEdit={showEdit}/>
        <div className="members-wrapper">
          {
            followees.map((followee) => {
              const id = followee.identity_user || followee.identity_organization
              return (
                  <div className="member-wrapper">
                    <div className="image-wrapper">
                      <Link to={`/user/${id}`}>
                        {
                          (!followee.img) ? (<DefaultUserIcon/>) : (
                              <img alt="" className="rounded-circle" src={followee.img}/>)
                        }
                      </Link>
                    </div>
                    <div className="details">
                      <div className="text-section">
                        <div className="name">{followee.name}</div>
                      </div>
                      {(edit) ?
                          <FontAwesome name="trash" className='remove-follow pulse' onClick={() => onDeleteFollowing(followee)}/>
                          : <div className="follow-section">{followee.accepted ? translate['Followed'] : ''}</div>}
                    </div>
                  </div>
              )
            })
          }
        </div>
      </ItemWrapper>
  )
}
Followees.propTypes = {
  edit: PropTypes.bool,
  showEdit: PropTypes.func.isRequired,
  followees: PropTypes.arrayOf(PropTypes.object.isRequired),
  deleteFollowing: PropTypes.func,
  translate: PropTypes.object.isRequired
}