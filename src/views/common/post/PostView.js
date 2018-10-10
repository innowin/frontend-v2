// @flow
import * as React from "react";
import PropTypes from "prop-types";
import "moment/locale/fa";
import Moment from "react-moment";

import {DefaultUserIcon} from "src/images/icons";
import {CategoryTitle, VerifyWrapper} from "src/views/common/cards/Frames";
import {SupplyIcon, DemandIcon} from "src/images/icons";
import connect from "react-redux/es/connect/connect";
import {getMessages} from "../../../redux/selectors/translateSelector";
import {bindActionCreators} from "redux"
import PostActions from "../../../redux/actions/commonActions/postActions";
import {Link} from "react-router-dom";
import type {postType} from "../../../consts/flowTypes/common/post";
import type {paramType} from "../../../consts/flowTypes/paramType";
import constants from "../../../consts/constants";
import type {identityType} from "../../../consts/flowTypes/user/basicInformation";
import type {fileType} from "../../../consts/flowTypes/common/fileType";
import PostSendIcon from "../../../images/common/postSend_svg";
import {EditIcon} from "../../../images/icons";
import CheckOwner from "../CheckOwner";
import FileActions from "../../../redux/actions/commonActions/fileActions";

type PostTypeProps = {
  post: postType,
  translate: { [string]: string }
}
const PostType = (props: PostTypeProps) => {
  const {post, translate} = props
  let supplyIcon, demandIcon, postIcon, postType = '', postTitle
  if (post) {
    supplyIcon = post.post_type === constants.POST.POST_TYPE.SUPPLY
    demandIcon = post.post_type === constants.POST.POST_TYPE.DEMAND
    postIcon = post.post_type === constants.POST.POST_TYPE.POST
    postTitle = post.post_title
    postType = translate['Type ' + post.post_type]
  }

  return (
      <div className='post-type-container'>
              <span>{
                ((postIcon) && <i className="fa fa-share-alt" aria-hidden="true"/>) ||
                ((supplyIcon) && <SupplyIcon height="19px"/>) ||
                ((demandIcon) && <DemandIcon height="22px"/>)}
                </span>
        <div className='post-type'>
          <span className='title-label'>{postType + ': '}</span>
          <span className='title'>{postTitle}</span>
        </div>
      </div>
  )
}

type PostHeaderProps = {
  post: postType,
  translate: { [string]: string },
  postRelatedIdentityImage: fileType,
  postIdentity: identityType,
  showEdit: Function,
  extendedView: boolean,
}
const PostHeader = (props: PostHeaderProps) => {
  const {post, translate, postRelatedIdentityImage, postIdentity, showEdit, extendedView} = props
  let createdTime

  let user = {}
  let organization = {}
  let name = ''
  let url = ''
  let paramId = ''
  if (post) {
    createdTime = post.created_time
    if (postIdentity && postIdentity.id) {
      user = postIdentity.identity_user
      organization = postIdentity.identity_organization
      paramId = (user && user.id) || (organization && organization.id)
      name = user ? ((user.first_name || user.last_name) ? user.first_name + ' ' + user.last_name : undefined)
          : (organization ? (organization.nike_name || organization.official_name || undefined) : undefined)
      url = user ? `/user/${user.id}` : `/organization/${organization.id}`
    }
  }

  return (
      <div className="-item-headerPost">
        <Link to={url} className='link-post'>
          <div className="-img-col">
            {!postRelatedIdentityImage
                ? (<DefaultUserIcon/>)
                : (<img className="rounded-circle" src={postRelatedIdentityImage.file} alt=""/>)
            }
          </div>
          <div className="-item-titlePost">
            <div>
              {name && <span className="post-name">{name}</span>}
              <span className="-green2 post-username">
                      {user ? user.username : (organization ? organization.username : '')}
                    </span>
            </div>
            <div className='post-date'>
              <Moment className="-green2" element="span" fromNow ago>{createdTime}</Moment>
              <span className="-green2"> {translate['Last']}</span>
            </div>
          </div>
        </Link>
        {!extendedView &&
        <CheckOwner id={paramId}>
          <div onClick={showEdit} className="-item-edit-btn -item-edit-btnPost pulse"><EditIcon/></div>
        </CheckOwner>
        }
      </div>
  )
}

type postFooterProps = {
  post: postType,
  extendedView: boolean,
  menuToggle: boolean,
  addView: Function,
  postIdentity: identityType,
  translate: { [string]: string },
}
const PostFooter = (props: postFooterProps) => {
  const {post, extendedView, menuToggle, addView, postIdentity, translate} = props
  let viewerCount
  let postUrl = ''
  let user = {}
  let organization = {}

  if (post) {
    viewerCount = post.viewerCount
    if (postIdentity && postIdentity.id) {
      user = postIdentity.identity_user
      postUrl = user
          ? `/user/${user.id}/Posts/${post.id}`
          : `/organization/${organization.id}/Posts/${post.id}`
    }
  }
  return (
      <div className="-item-footerPost">
        <div className='footer-part'>
        </div>
        <div className='post-details footer-part'>
          <div className='items'>
            <i className="post-menu-bottom fa fa-ellipsis-h cursor-pointer" aria-hidden="true"
               onClick={!extendedView && addView}/>
            {!extendedView && menuToggle ?
                <div className="menu-box-post pt-0 pb-0" id='sidebar-post-menu-box'>
                  <div>
                    <Link to={postUrl}>
                      <span>{translate['Show more']}</span>
                    </Link>
                  </div>
                </div>
                : ''
            }
          </div>
          <div className='items'>
            <span className="ml-1">{viewerCount}</span>
            <i className="fa fa-eye" aria-hidden="true"/>
          </div>
          <div className='items'>
            <span className="ml-1">\</span>
            <i className="fa fa-share" aria-hidden="true"/>
          </div>
        </div>
      </div>
  )
}

type postAddCommentProps = {
  userImage: fileType,
}
const PostAddComment = (props: postAddCommentProps) => {
  const {userImage} = props

  return (
      <div className='add-comment'>
        <div className="-img-col">
          {!userImage
              ? (<DefaultUserIcon/>)
              : (<img className="rounded-circle" src={userImage.file} alt=""/>)
          }
        </div>
        <input className='add-comment-text-field' placeholder='فرستادن دیدگاه'/>
        <PostSendIcon className='send-comment pulse'/>
      </div>
  )
}

type postExtendedViewProps = {
  actions: {
    setPostViewer: Function,
    getPostViewerCount: Function,
    getPost: Function,
    getFile: Function,
  },
  match: {
    params: {
      id: string,
    },
    url: string,
  },
  translate: { [string]: string },
  post: postType,
  postRelatedIdentityImage: fileType,
  postIdentity: identityType,
  param: paramType,
  userImage: fileType,
  userImageId: number,
  extendedView: boolean,
  showEdit: Function,
}
type postViewState = {
  menuToggle: boolean,
}

class PostView extends React.Component<postExtendedViewProps, postViewState> {
  static propTypes = {
    post: PropTypes.object.isRequired,
    postIdentity: PropTypes.object.isRequired,
    param: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    postRelatedIdentityImage: PropTypes.object.isRequired,
    userImage: PropTypes.object.isRequired,
    extendedView: PropTypes.bool.isRequired,
    showEdit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {menuToggle: false}
  }

  componentDidMount() {
    const {extendedView} = this.props
    if (extendedView) {
      const {actions, match} = this.props
      const {params, url} = match
      const {getPost, getPostViewerCount, setPostViewer} = actions
      const postId = +params.id

      const isUser = !url.includes('org')
      const postOwnerType = isUser ? constants.USER_TYPES.PERSON : constants.USER_TYPES.ORG
      const spliced = url.split('/')
      const postOwnerId = +spliced[2]

      getPost({postId, postOwnerType, postOwnerId})
      setPostViewer(postId, getPostViewerCount)
    }
    else {
      this._getViewerCount()
      document.addEventListener('click', this._handleClickOutMenuBox)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {userImageId, actions} = this.props
    const {getFile} = actions
    if(!prevProps.userImageId && prevProps.userImageId !== userImageId) {
      getFile(userImageId)
    }
  }

  componentWillUnmount() {
    const {extendedView} = this.props
    if (!extendedView) {
      (document.removeEventListener: Function)('click', this._handleClickOutMenuBox)
    }
  }

  _addViewer = (e) => {
    e.preventDefault()
    const {post, actions} = this.props
    const {setPostViewer, getPostViewerCount} = actions
    const postId = post.id
    setPostViewer(postId, getPostViewerCount)

    this.setState({...this.state, menuToggle: !this.state.menuToggle})
  }

  _handleClickOutMenuBox = (e: any) => {
    if (!e.target.closest('#sidebar-post-menu-box') && !e.target.closest('.post-menu-bottom')) {
      this.setState({...this.state, menuToggle: false})
    }
  }

  _getViewerCount = () => {
    const {post, actions} = this.props
    const {getPostViewerCount} = actions
    const postId = post.id
    getPostViewerCount(postId)
  }

  render() {
    const {post, translate, postIdentity, postRelatedIdentityImage, userImage, extendedView, showEdit} = this.props
    const {menuToggle} = this.state
    let postDescription
    if (post) {
      postDescription = post.post_description
    }

    return (
        <VerifyWrapper isLoading={false} error={false}>
          {extendedView &&
          <CategoryTitle
              title={translate['Single post']}
          />
          }
          <div className="-itemWrapperPost">
            {
              post.post_type !== constants.POST.POST_TYPE.POST &&
              <PostType translate={translate} post={post}/>
            }
            <PostHeader post={post} translate={translate} postIdentity={postIdentity}
                        postRelatedIdentityImage={postRelatedIdentityImage} showEdit={showEdit}
                        extendedView={extendedView}/>
            <div className="post-content">
              {postDescription}
            </div>
            <PostFooter post={post} postIdentity={postIdentity} translate={translate} extendedView={extendedView}
                        menuToggle={menuToggle} addView={this._addViewer}
            />
            {extendedView &&
            <PostAddComment userImage={userImage}/>
            }
          </div>
        </VerifyWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {extendedView} = ownProps
  if (extendedView) {
    const {params} = ownProps.match
    const postId = +params.id
    const post = state.common.post.list[postId]
    const postIdentity = post && post.post_identity
    const postImageId = post && post.post_related_identity_image
    const prevUserImageId = (state.auth.organization && state.auth.organization.organization_logo) || state.auth.client.profile.profile_media

    return {
      translate: getMessages(state),
      param: state.param,
      post: post,
      postIdentity: state.identities.list[postIdentity],
      postRelatedIdentityImage: state.common.file.list[postImageId],
      userImageId: prevUserImageId,
      userImage: state.common.file.list[prevUserImageId],
    }
  }
  else {
    const {post} = ownProps
    const postIdentity = post && post.post_identity
    return {
      postIdentity: postIdentity,
      postRelatedIdentityImage: post.post_related_identity_image,
      translate: getMessages(state),
    }
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getPostViewerCount: PostActions.getPostViewerCount,
    setPostViewer: PostActions.setPostViewer,
    getPost: PostActions.getPost,
    getFile: FileActions.getFile,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(PostView)
