import * as React from "react";
import constants from 'src/consts/constants'
import DefaultUserIcon from "../../../images/defaults/defaultUser_svg";
import FontAwesome from 'react-fontawesome'
import * as PropTypes from 'prop-types';
import SocialIcon from "../../../images/common/social_svg";
import {ItemHeader, ItemWrapper} from "../cards/Frames";
import {Link} from "react-router-dom";


type PropsFollowees = {
  edit: boolean,
  showEdit: Function,
  followees: [],
  deleteFollow: Function,
  translate: { [string]: string },
  userId: number,
}

export const Followees = (props: PropsFollowees) => {
  const {edit, showEdit, followees, translate, userId} = props
  const onDeleteFollowing = (followee) => {
    const {deleteFollow} = props
    const followId = followee.follow_id
    deleteFollow({followId, followOwnerId: userId})
  }

  return (
      <ItemWrapper icon={<SocialIcon/>}>
        <ItemHeader title={`${translate['Followings']} (${followees.length})`} showEdit={showEdit}/>
        <div className="members-wrapper">
          {
            followees.map((followee) => {
              const id = followee.identity_user || followee.identity_organization
              const url = followee.identity_user ? `/user/${id}` : `/organization/${id}`
              return (
                  <div className="member-wrapper">
                    <div className="image-wrapper">
                      <Link to={url}>
                        {
                          (!followee.img) ? (<DefaultUserIcon/>) : (
                              <img alt="" className="rounded-circle object-fit-cover" src={followee.img}/>)
                        }
                      </Link>
                    </div>
                    <div className="details">
                      <div className="text-section">
                        <div className="name">{followee.name}</div>
                      </div>
                      {(edit)
                          ? <FontAwesome name="trash" className='remove-follow pulse'
                                         onClick={() => onDeleteFollowing(followee)}/>
                          : <div className="follow-section">
                            {followee.follow_accepted
                                ? translate['Followed']
                                : translate['Wait for accept']}
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
Followees.propTypes = {
  edit: PropTypes.bool,
  showEdit: PropTypes.func.isRequired,
  followees: PropTypes.arrayOf(PropTypes.object.isRequired),
  deleteFollow: PropTypes.func.isRequired,
  translate: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
}