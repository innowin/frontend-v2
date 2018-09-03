import {ItemHeader, ItemWrapper} from "../../common/cards/Frames";
import PropTypes from "prop-types";
import * as React from "react";
import SocialIcon from "../../../images/common/social_svg";
import {Link} from "react-router-dom";
import DefaultUserIcon from "../../../images/defaults/defaultUser_svg";


type PropsFollowees = {
  edit: boolean,
  showEdit: Function,
  followees: [],
  deleteFollowing: Function,
  translate: { [string]: string }
}

export const Followees = (props: PropsFollowees) => {
  const {edit, showEdit, followees, deleteFollowing, translate} = props

  const onDeleteFollowing = () => {
    const {deleteFollowing, following, index} = props
    deleteFollowing(following.follow_follower, index)
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
                          <button onClick={onDeleteFollowing}
                                  className="d-block btn btn-outline-danger btn-sm mb-auto ">{translate['Delete']}
                          </button> : <div className="follow-section">{followee.accepted ? translate['Followed'] : ''}</div>}
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