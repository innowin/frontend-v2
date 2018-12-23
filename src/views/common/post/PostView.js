// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import 'moment/locale/fa'

import {DefaultImage} from 'src/images/icons'
import {CategoryTitle, VerifyWrapper} from 'src/views/common/cards/Frames'
import connect from 'react-redux/es/connect/connect'
import {getMessages} from '../../../redux/selectors/translateSelector'
import {bindActionCreators} from 'redux'
import PostActions from '../../../redux/actions/commonActions/postActions'
import type {postType} from '../../../consts/flowTypes/common/post'
import type {paramType} from '../../../consts/flowTypes/paramType'
import constants from '../../../consts/constants'
import type {identityType} from '../../../consts/flowTypes/user/basicInformation'
import type {fileType} from '../../../consts/flowTypes/common/fileType'
import FileActions from '../../../redux/actions/commonActions/fileActions'
import CommentActions from '../../../redux/actions/commonActions/commentActions'
import {userCommentsSelector} from 'src/redux/selectors/common/comment/postCommentsSelector'
import type {commentType} from '../../../consts/flowTypes/common/comment'
import PostHeader from './PostHeader'
import PostType from './PostType'
import PostFooter from './PostFooter'
import PostComments from './PostComments'
import {Confirm} from '../cards/Confirm'
import ProductInfoView from '../contributions/ProductInfoView'
import PostCommentNew from './PostCommentNew'

type postExtendedViewProps = {
  actions: {
    setPostViewer: Function,
    getPostViewerCount: Function,
    getPost: Function,
    getFile: Function,
    getCommentsByParentId: Function,
    createComment: Function,
    deleteComment: Function,
    deletePost: Function,
  },
  match: {
    params: {
      id: string,
    },
    url: string,
  },
  translate: { [string]: string },
  post: postType,
  postRelatedIdentityImage?: fileType,
  postIdentity: identityType,
  param?: paramType,
  userImage?: fileType,
  userImageId: number,
  extendedView?: boolean,
  showEdit?: Function,
  comments?: Array<commentType>,
  commentParentType: string,
  fileList: [],
}
type postViewState = {
  menuToggle: boolean,
  confirm: boolean,
  pictureLoaded: null | boolean,
  showComment: boolean,
  commentOn: commentType,
}

class PostView extends React.Component<postExtendedViewProps, postViewState> {
  static propTypes = {
    post: PropTypes.object.isRequired,
    postIdentity: PropTypes.object.isRequired,
    param: PropTypes.object,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    postRelatedIdentityImage: PropTypes.object,
    userImage: PropTypes.object,
    extendedView: PropTypes.bool,
    showEdit: PropTypes.func,
    comments: PropTypes.array,
    fileList: PropTypes.array,
  }
  commentTextField: ?HTMLInputElement

  constructor(props) {
    super(props)
    this.state = {
      menuToggle: false,
      confirm: false,
      pictureLoaded: null,
      showComment: false,
      commentOn: undefined,
    }

    const self: any = this

    self.commentTextField = null
    self.handleRetry = this.handleRetry.bind(this)
    self._delete = this._delete.bind(this)
    self._showConfirm = this._showConfirm.bind(this)
    self._cancelConfirm = this._cancelConfirm.bind(this)
    self._openMenu = this._openMenu.bind(this)
    self._handleClickOutMenuBox = this._handleClickOutMenuBox.bind(this)
    self._handleShowComment = this._handleShowComment.bind(this)
  }

  componentDidMount() {
    const self: any = this

    const {extendedView, post} = this.props
    if (post && post.post_picture) {
      const {post, extendedView, fileList} = this.props
      let postPicture, postPictureId
      if (post) {
        postPicture = post.post_picture
        postPictureId = post.post_picture
      }
      let picture = new Image()
      picture.src = (!extendedView ? (postPicture ? postPicture.file : '') : (postPictureId ? (fileList[postPictureId] ? fileList[postPictureId].file : '') : ''))
      picture.onload = () => {
        this.setState({...this.state, pictureLoaded: true})
      }
      picture.onerror = () => {
        this.setState({...this.state, pictureLoaded: false})
      }
    }
    if (extendedView) {
      const {actions, match} = this.props
      const {params, url} = match
      const {getPost, getPostViewerCount, setPostViewer, getCommentsByParentId} = actions
      const postId = +params.id
      const isUser = !url.includes('org')
      const postOwnerType = isUser ? constants.USER_TYPES.PERSON : constants.USER_TYPES.ORG
      const spliced = url.split('/')
      const postOwnerId = +spliced[2]

      getPost({postId, postOwnerType, postOwnerId})
      // setPostViewer(postId, getPostViewerCount)
      getCommentsByParentId({parentId: postId, commentParentType: constants.COMMENT_PARENT.POST})
    } else {
      this._getViewerCount()
    }

    if (self.text) {
      let allWords = self.text.innerText.replace(/\n/g, ' ')
      allWords = allWords.split(' ')

      let mailExp = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')

      let urlExp = new RegExp('^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[A-Za-z0-9]+([\\-\\.]{1}[A-Za-z0-9]+)*\\.[A-Za-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$')

      // Phone Reg
      let first = new RegExp('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))')
      let second = new RegExp('([-\s\.]?[0-9]{3})')
      let third = new RegExp('([-\s\.]?[0-9]{3,4})')

      for (let i = 0; i < allWords.length; i++) {
        let word = allWords[i].trim()
        if (urlExp.test(word)) {
          word.includes('http://') || word.includes('https://') ?
              self.text.innerHTML = self.text.innerHTML.replace(new RegExp(word, 'g'), `<a title=` + word + ` target=_blank href=` + word + `>${word.length > 60 ? '...' + word.substring(0, 60) : word} </a>`)
              :
              self.text.innerHTML = self.text.innerHTML.replace(new RegExp(word, 'g'), `<a title=` + word + ` target=_blank href=http://` + word + `>${word.length > 60 ? '...' + word.substring(0, 60) : word}</a>`)
        } else if (word[0] === '@' && word.length >= 6 && !word.substring(1, word.length).includes('@')) {
          self.text.innerHTML = self.text.innerHTML.replace(new RegExp(word, 'g'), `<a href=` + word.slice(1, word.length) + `>${word.length > 60 ? '...' + word.substring(0, 60) : word}</a>`)
        } else if (word[0] === '#' && word.length >= 3 && !word.substring(1, word.length).includes('#')) {
          self.text.innerHTML = self.text.innerHTML.replace(new RegExp(word, 'g'), `<a href=` + word + `>${word.length > 60 ? '...' + word.substring(0, 60) : word}</a>`)
        } else if (mailExp.test(word)) {
          self.text.innerHTML = self.text.innerHTML.replace(new RegExp(word, 'g'), `<a href=mailto:` + word + `>${word.length > 60 ? '...' + word.substring(0, 60) : word}</a>`)
        } else if (!isNaN(word.replace(/\\+/g, '')) && word.length > 4 && (first.test(word) || second.test(word) || third.test(word))) {
          word.includes('+') ?
              self.text.innerHTML = self.text.innerHTML.replace(new RegExp(`\\${word}`, 'g'), `<a href=tel:` + word + `>${word.length > 60 ? '...' + word.substring(0, 60) : word}</a>`)
              :
              self.text.innerHTML = self.text.innerHTML.replace(new RegExp(word, 'g'), `<a href=tel:` + word + `>${word.length > 60 ? '...' + word.substring(0, 60) : word}</a>`)
        }
      }
    }

    document.addEventListener('click', this._handleClickOutMenuBox)
  }

  componentDidUpdate(prevProps) {
    const self: any = this
    const {userImageId, actions} = this.props
    const {getFile} = actions
    if (!prevProps.userImageId && prevProps.userImageId !== userImageId) {
      getFile(userImageId)
    }
  }

  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    if (this.props.post !== nextProps.post) {
      const {post, extendedView, fileList} = nextProps
      if (post && post.post_picture) {
        let postPicture, postPictureId
        if (post) {
          postPicture = post.post_picture
          postPictureId = post.post_picture
        }
        let picture = new Image()
        picture.src = (!extendedView ? (postPicture ? postPicture.file : '') : (postPictureId ? (fileList[postPictureId] ? fileList[postPictureId].file : '') : ''))
        picture.onload = () => {
          this.setState({...this.state, pictureLoaded: true})
        }
        picture.onerror = () => {
          this.setState({...this.state, pictureLoaded: false})
        }
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleClickOutMenuBox)
  }

  _openMenu(e) {
    e.preventDefault()
    const {post, actions} = this.props
    const {setPostViewer, getPostViewerCount} = actions
    const postId = post.id
    // setPostViewer(postId, getPostViewerCount)
    this.setState({...this.state, menuToggle: !this.state.menuToggle})
  }

  _handleShowComment = () => {
    let {showComment} = this.state
    this.setState({...this.state, showComment: !showComment, commentOn: undefined})
  }

  _handleClickOutMenuBox(e: any) {
    if (!e.target.closest('#sidebar-post-menu-box') && !e.target.closest('.post-menu-bottom')) {
      this.setState({...this.state, menuToggle: false})
    }
  }

  _getViewerCount = () => {
    const {post, actions} = this.props
    const {getPostViewerCount} = actions
    const postId = post.id
    // getPostViewerCount(postId)
  }

  createComment = (commentTextField) => {
    if (commentTextField && commentTextField.value) {
      const {actions, post, commentParentType} = this.props
      const {createComment} = actions
      const formValues = {text: commentTextField.value, comment_parent: post.id}
      createComment({formValues, parentId: post.id, commentParentType})
      commentTextField.value = ''
    }
  }

  _setCommentOn = (comment) => {
    this.setState({...this.state, commentOn: comment, showComment: true})
  }

  _showConfirm() {
    this.setState({...this.state, confirm: true})
  }

  _cancelConfirm() {
    this.setState({...this.state, confirm: false})
  }

  _delete() {
    const {actions, post} = this.props
    const {deletePost} = actions
    const postParent = post.post_parent
    const postIdentityUserId = post.post_identity.identity_user && post.post_identity.identity_user.id
    const postIdentityOrganId = post.post_identity.identity_organization && post.post_identity.identity_organization.id
    const postParentType = (postParent && postParent.child_name) || null
    const postParentId = (postParent && postParent.id) || null
    const postOwnerId = postIdentityUserId || postIdentityOrganId
    const postOwnerType = postIdentityUserId ? constants.USER_TYPES.PERSON : constants.USER_TYPES.ORG
    deletePost({postId: post.id, postOwnerId, postOwnerType, postParentId, postParentType})
  }

  deleteComment = (comment) => {
    const {actions, post, commentParentType} = this.props
    const {deleteComment} = actions
    deleteComment({commentId: comment.id, parentId: post.id, commentParentType})
  }

  handleRetry() {
    this.setState({...this.state, pictureLoaded: null}, () => {
      const {post} = this.props
      if (post && post.post_picture) {
        let picture = new Image()
        picture.src = post.post_picture.file
        picture.onload = () => {
          this.setState({...this.state, pictureLoaded: true})
        }
        picture.onerror = () => {
          this.setState({...this.state, pictureLoaded: false})
        }
      }
    })
  }

  render() {
    const self: any = this
    const {post, translate, postIdentity, postRelatedIdentityImage, userImage, extendedView, showEdit, comments, fileList, commentParentType} = this.props
    const {menuToggle, confirm, pictureLoaded, showComment, commentOn} = this.state
    let postDescription, postPicture, postPictureId, postIdentityUserId, postIdentityOrganId, postOwnerId = 0
    if (post) {
      postDescription = post.post_description
      postPicture = post.post_picture
      postPictureId = post.post_picture
      postIdentityUserId = post.post_identity.identity_user && post.post_identity.identity_user.id
      postIdentityOrganId = post.post_identity.identity_organization && post.post_identity.identity_organization.id
      postOwnerId = postIdentityUserId || postIdentityOrganId
    }
    const postImageUrl = (!extendedView ? (postPicture ? postPicture.file : null) : (postPictureId ? (fileList[postPictureId] ? fileList[postPictureId].file : null) : null))

    // if (postPicture && pictureLoaded) {
    //   this.picture.className = 'post-image-container-effect'
    // }

    return (
        confirm
            ? <div className={extendedView ? 'post-view-container remove-post-container' : 'remove-post-container'}>
              <Confirm cancelRemoving={this._cancelConfirm} remove={this._delete}/>
            </div>
            : post ?
            <VerifyWrapper isLoading={false} error={false} className="-itemWrapperPost">
              {extendedView &&
              <CategoryTitle
                  title={translate['Single post']}
              />
              }
              <div className={extendedView && 'post-view-container'}>
                {
                  post.post_type !== constants.POST.POST_TYPE.POST &&
                  <PostType translate={translate} post={post}/>
                }
                <PostHeader post={post} translate={translate} postIdentity={postIdentity}
                            postRelatedIdentityImage={postRelatedIdentityImage} showEdit={showEdit}
                            extendedView={extendedView}/>
                <div className="post-content"
                     style={new RegExp('^[A-Za-z]*$').test(postDescription[0]) ? {direction: 'ltr'} : {direction: 'rtl'}}
                     ref={e => self.text = e}>
                  {postDescription}
                </div>

                {
                  postImageUrl ?
                      <div className={'post-image-container'}>
                        <div className={pictureLoaded === true ? 'post-image-loading-effect' : 'post-image-loading'}>
                          <DefaultImage className='default-image'/>
                          {
                            pictureLoaded === false ?
                                <div className='post-retry-image'>
                                  مشکل در بارگذاری عکس.
                                  <span className='post-retry-image-click'
                                        onClick={this.handleRetry}> تلاش مجدد </span>
                                </div>
                                :
                                <div className='bright-line'/>
                          }
                        </div>
                        <img src={postImageUrl} width={'100%'} alt='عکس پست'
                             className={pictureLoaded === true ? 'post-image-effect' : 'post-image'}/>
                      </div>
                      : null
                }

                {post && post.post_related_product &&
                <div className='post-view-product-container'>
                  <ProductInfoView product={post.post_related_product} ownerId={postOwnerId}
                                   translate={translate}/>
                </div>
                }


                <PostFooter post={post} postIdentity={postIdentity} translate={translate} extendedView={extendedView}
                            menuToggle={menuToggle} openMenu={this._openMenu}
                            deletePost={this._showConfirm}
                            showComment={this._handleShowComment}
                            showEdit={showEdit}
                />
                {/*{
                 <div className='add-comment'>
                 <div className="-img-col">
                 {!userImage
                 ? (<DefaultUserIcon/>)
                 : (<img className="rounded-circle object-fit-cover" src={userImage.file} alt=""/>)
                 }
                 </div>
                 <input className='add-comment-text-field' placeholder={translate["Send comment"]}
                 ref={c => this.commentTextField = c} onClick={() => this.handleClickTextField.bind(this)}/>
                 <button onClick={() => this.createComment(this.commentTextField)} className='send-comment pulse'>
                 <PostSendIcon/>
                 </button>
                 </div>
                 }*/}

                {
                  showComment ? <PostCommentNew
                      commentParentType={commentParentType}
                      post={post}
                      handleShowComment={this._handleShowComment}
                      commentOn={commentOn}/> : null
                }

                {extendedView && comments && comments.length > 0 &&
                <PostComments comments={comments} translate={translate}
                              replyComment={(comment) => this._setCommentOn(comment)}
                              deleteComment={this.deleteComment}/>
                }
              </div>
            </VerifyWrapper>
            : ''

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
      comments: userCommentsSelector(state, ownProps),
      fileList: state.common.file.list,
    }
  } else {
    const {post} = ownProps
    const postIdentity = post && post.post_identity
    const prevUserImageId = (state.auth.organization && state.auth.organization.organization_logo) || state.auth.client.profile.profile_media
    return {
      postIdentity: postIdentity,
      postRelatedIdentityImage: post.post_related_identity_image,
      translate: getMessages(state),
      // userImageId: prevUserImageId,
      userImage: state.common.file.list[prevUserImageId],
    }
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getPostViewerCount: PostActions.getPostViewerCount,
    setPostViewer: PostActions.setPostViewer,
    getPost: PostActions.getPost,
    deletePost: PostActions.deletePost,
    getFile: FileActions.getFile,
    getCommentsByParentId: CommentActions.getCommentsByParentId,
    createComment: CommentActions.createComment,
    deleteComment: CommentActions.deleteComment,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(PostView)
