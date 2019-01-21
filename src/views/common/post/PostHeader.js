// @flow
import * as React from "react"
import PropTypes from "prop-types"
import Moment from "react-moment"
import {Link} from "react-router-dom"

import DefaultUserIcon from "../../../images/defaults/defaultUser_svg"
// import CheckOwner from "../CheckOwner"
// import {EditIcon} from "../../../images/icons"
import type {postType} from "../../../consts/flowTypes/common/post"
import type {fileType} from "../../../consts/flowTypes/common/fileType"
import type {identityType} from "../../../consts/flowTypes/user/basicInformation"

type PostHeaderProps = {
  post: postType,
  translate: { [string]: string },
  postRelatedIdentityImage?: fileType | number,
  postIdentity?: identityType | number,
  showEdit?: Function,
  extendedView?: boolean,
}
type PostHeaderStates = {
  profileLoaded: boolean,
}

class PostHeader extends React.Component<PostHeaderProps, PostHeaderStates> {

  constructor(props: PostHeaderProps) {
    super(props)
    this.state = {
      profileLoaded: false
    }
  }

  componentDidMount() {
    if (this.props.postRelatedIdentityImage) {
      let profile = new Image()
      profile.src = this.props.postRelatedIdentityImage.file
      profile.onload = () => {
        this.setState({profileLoaded: true})
      }
    }
  }

  render() {
    const {
      post,
      translate,
      postRelatedIdentityImage,
      postIdentity,
      // showEdit,
      // extendedView
    } = this.props
    let createdTime

    let user = {}
    let organization = {}
    let name = ""
    let url = ""
    // let paramId = ""
    if (post) {
      createdTime = post.created_time
      if (postIdentity && postIdentity.id) {
        user = postIdentity.identity_user
        organization = postIdentity.identity_organization
        // paramId = (user && user.id) || (organization && organization.id)
        name = user ? ((user.first_name || user.last_name) ? user.first_name + " " + user.last_name : undefined)
            : (organization ? (organization.nike_name || organization.official_name || undefined) : undefined)
        url = user ? `/user/${user.id}` : `/organization/${organization.id}`
      }
    }

    return (
        <div className="-item-headerPost">
          <Link to={url} className='link-post'>
            <div className="-img-col">
              {postRelatedIdentityImage /*&& this.state.profileLoaded*/ ? <img className="rounded-circle covered-img" src={postRelatedIdentityImage.file} alt=""/>
                  : <DefaultUserIcon className="rounded-circle covered-svg"/>
              }
            </div>
            <div className="-item-titlePost">
              <div>
                {name && <span className="post-name">{name}</span>}
                <span className="-green2 post-username">
                      {user ? user.username : (organization ? organization.username : "")}
                    </span>
              </div>
              <div className='post-date'>
                <Moment className="-green2" element="span" fromNow ago>{createdTime}</Moment>
                <span className="-green2"> {translate["Last"]}</span>
              </div>
            </div>
          </Link>
          {/*{!extendedView &&*/}
          {/*<CheckOwner id={paramId}>*/}
          {/*<div onClick={showEdit} className="-item-edit-btn -item-edit-btnPost pulse"><EditIcon/></div>*/}
          {/*</CheckOwner>*/}
          {/*}*/}
        </div>
    )
  }
}

PostHeader.propTypes = {
  post: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired,
  postIdentity: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  postRelatedIdentityImage: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  showEdit: PropTypes.func,
  extendedView: PropTypes.bool,
}

export default PostHeader