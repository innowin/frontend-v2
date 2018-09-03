//@flow
import * as React from "react"
import {ItemHeader, ItemWrapper} from "../../common/cards/Frames";
import SocialIcon from "../../../images/common/social_svg";
import {Link} from "react-router-dom";
import DefaultUserIcon from "../../../images/defaults/defaultUser_svg";
import PropTypes from "prop-types";

type PropsFollowers = {
  followers: [],
  translate: { [string]: string },
}

export const Followers = (props: PropsFollowers) => {
  const {followers, translate} = props
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
                      <div className="follow-section">{follower.accepted ? translate['Followed'] : ''}</div>
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
}