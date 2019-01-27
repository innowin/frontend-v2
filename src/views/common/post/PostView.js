// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import 'moment/locale/fa'

import {CategoryTitle, VerifyWrapper} from 'src/views/common/cards/Frames'
import connect from 'react-redux/es/connect/connect'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {bindActionCreators} from 'redux'
import PostActions from 'src/redux/actions/commonActions/postActions'
import type {postType} from 'src/consts/flowTypes/common/post'
import type {paramType} from 'src/consts/flowTypes/paramType'
import constants from 'src/consts/constants'
import type {identityType} from 'src/consts/flowTypes/user/basicInformation'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import CommentActions from 'src/redux/actions/commonActions/commentActions'
import {userCommentsSelector} from 'src/redux/selectors/common/comment/postCommentsSelector'
import type {commentType} from 'src/consts/flowTypes/common/comment'
import PostHeader from './PostHeader'
import PostType from './PostType'
import PostFooter from './PostFooter'
import PostComments from './PostComments'
import {Confirm} from '../cards/Confirm'
import ProductInfoView from '../contributions/ProductInfoView'
import PostCommentNew from './PostCommentNew'
import PostImage from './PostImage'

type postExtendedViewProps = {
  actions: {
    getPost: Function,
    getFile: Function,
    getCommentsByParentId: Function,
    createComment: Function,
    deleteComment: Function,
    deletePost: Function,
    getFileByFileRelatedParentId: Function,
  },
  match: {
    params: {
      id: string,
    },
    url: string,
  },
  translate: { [string]: string },
  post: postType,
  postRelatedIdentityImage: string,
  postIdentity?: identityType | number,
  param?: paramType,
  extendedView?: boolean,
  showEdit?: Function,
  comments?: Array<commentType>,
  commentParentType: string,
  fileList: {},
}
type postViewState = {
  menuToggle: boolean,
  confirm: boolean,
  showComment: boolean,
  commentOn: commentType,
  showMore: boolean,
  descriptionHeight: ?number,
  getInDidMount: boolean,
}

class PostView extends React.Component<postExtendedViewProps, postViewState> {
  static propTypes = {
    post: PropTypes.object.isRequired,
    param: PropTypes.object,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    postIdentity: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    postRelatedIdentityImage: PropTypes.string,
    extendedView: PropTypes.bool,
    showEdit: PropTypes.func,
    comments: PropTypes.array,
    fileList: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      menuToggle: false,
      confirm: false,
      showComment: false,
      commentOn: undefined,
      showMore: false,
      descriptionHeight: null,

      getInDidMount: false
    }

    const self: any = this

    self._cancelConfirm = this._cancelConfirm.bind(this)
    self._delete = this._delete.bind(this)
    self._handleClickOutMenuBox = this._handleClickOutMenuBox.bind(this)
    self._handleShowComment = this._handleShowComment.bind(this)
    self._openMenu = this._openMenu.bind(this)
    self._readMore = this._readMore.bind(this)
    self._showConfirm = this._showConfirm.bind(this)
  }

  componentWillMount(): void {
    let {extendedView, post, match, actions} = this.props
    let {getFileByFileRelatedParentId, getPost, getCommentsByParentId} = actions

    document.addEventListener('click', this._handleClickOutMenuBox)

    if (extendedView) {
      const {params, url} = match
      const postId = +params.id
      const isUser = !url.includes('org')
      const postOwnerType = isUser ? constants.USER_TYPES.PERSON : constants.USER_TYPES.ORG
      const spliced = url.split('/')
      const postOwnerId = +spliced[2]

      getPost({postId, postOwnerType, postOwnerId})
      getCommentsByParentId({parentId: postId, commentParentType: constants.COMMENT_PARENT.POST})
      getFileByFileRelatedParentId({fileRelatedParentId: postId, fileParentType: constants.FILE_PARENT.POST})
    }

    if (post && post.id && !extendedView)
      getFileByFileRelatedParentId({fileRelatedParentId: post.id, fileParentType: constants.FILE_PARENT.POST})
    else this.setState({...this.state, getInDidMount: true})
  }

  componentDidMount() {
    let self: any = this

    if (!this.props.extendedView) {
      let {post, actions} = this.props
      // let showMore = false
      // let height = null
      if (this.state.getInDidMount) {
        let {getFileByFileRelatedParentId} = actions
        getFileByFileRelatedParentId({fileRelatedParentId: post.id, fileParentType: constants.FILE_PARENT.POST})
      }
      if (self.text && self.text.clientHeight > 74) {
        let height = self.text.clientHeight
        if (post.post_description && new RegExp('^[A-Za-z]*$').test(post.post_description[0])) {
          self.text.style.paddingRight = '60px'
        } else self.text.style.paddingLeft = '60px'
        self.text.style.height = '68px'
        // showMore = true
        this.setState({...this.state, showMore: true, descriptionHeight: height})
      }
    }

    if (self.text) {
      let allWords = self.text.innerText.replace(/\n/g, ' ')
      allWords = allWords.split(' ')

      let mailExp = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')

      let urlExp = new RegExp('^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[A-Za-z0-9]+([\\-.][A-Za-z0-9]+)*\\.[A-Za-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$')

      // Phone Reg
      let first = new RegExp('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))')
      let second = new RegExp('([-]?[0-9]{3})')
      let third = new RegExp('([-]?[0-9]{3,4})')

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
          // don't touch it !
          word.includes('+') ?
              self.text.innerHTML = self.text.innerHTML.replace(new RegExp(`\\${word}`, 'g'), `<a href=tel:` + word + `>${word.length > 60 ? '...' + word.substring(0, 60) : word}</a>`)
              :
              self.text.innerHTML = self.text.innerHTML.replace(new RegExp(word, 'g'), `<a href=tel:` + word + `>${word.length > 60 ? '...' + word.substring(0, 60) : word}</a>`)
        }
      }
    }
  }

  componentDidUpdate(prevProps, prevState, ss) {
    const {post} = this.props
    const self: any = this
    let showMore = false
    let height = null

    if (post && post.post_description !== prevProps.post.post_description) {
      if (self.text.clientHeight > 74) {
        height = self.text.clientHeight
        if (post.post_description && new RegExp('^[A-Za-z]*$').test(post.post_description[0])) {
          self.text.style.paddingRight = '60px'
        } else self.text.style.paddingLeft = '60px'
        self.text.style.height = '68px'
        showMore = true
      }

      this.setState({...this.state, showMore, descriptionHeight: height})
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleClickOutMenuBox)
  }

  _openMenu(e) {
    e.preventDefault()
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

  _readMore() {
    this.setState({...this.state, showMore: false}, () => {
      const {descriptionHeight} = this.state
      const self: any = this
      self.text.style.height = descriptionHeight && descriptionHeight + 'px'
      self.text.style.paddingRight = '0'
      self.text.style.paddingLeft = '0'
    })
  }

  render() {
    const self: any = this

    const {
      post, translate, postIdentity, postRelatedIdentityImage, extendedView, showEdit, comments, fileList,
      commentParentType
    } = this.props
    const {menuToggle, confirm, showComment, commentOn} = this.state
    let postDescription = '', postIdentityUserId, postIdentityOrganId, postOwnerId = 0

    if (post) {
      postDescription = post.post_description
      postIdentityUserId = post.post_identity.identity_user && post.post_identity.identity_user.id
      postIdentityOrganId = post.post_identity.identity_organization && post.post_identity.identity_organization.id
      postOwnerId = postIdentityUserId || postIdentityOrganId
    }

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
              <div className={extendedView ? 'post-view-container' : undefined}>
                {
                  post.post_type !== constants.POST.POST_TYPE.POST &&
                  <PostType translate={translate} post={post}/>
                }
                <div className='post-view-relative'>
                  <PostHeader post={post} translate={translate} postIdentity={postIdentity}
                              postRelatedIdentityImage={postRelatedIdentityImage} showEdit={showEdit}
                              extendedView={extendedView}/>
                  <div className='post-content'
                       style={new RegExp('^[A-Za-z]*$').test(postDescription && postDescription[0]) ? {direction: 'ltr'} : {direction: 'rtl'}}
                       ref={e => self.text = e}>
                    {postDescription}
                  </div>
                  <div className={this.state.showMore ? 'post-content-more' : 'post-content-more-hide'}
                       style={new RegExp('^[A-Za-z]*$').test(postDescription && postDescription[0]) ?
                           {right: '10px'} :
                           {left: '10px'}}
                       onClick={this._readMore}>
                    ادامه
                    <div className='post-content-more-sign'>«</div>
                  </div>
                </div>

                <PostImage translate={translate} extendedView={extendedView} fileList={fileList} post={post}/>
                {post && post.post_related_product &&
                <div className='post-view-product-container'>
                  <ProductInfoView product={post.post_related_product}
                                   ownerId={postOwnerId}
                                   translate={translate}/>
                </div>
                }
                <PostFooter post={post} postIdentity={postIdentity} translate={translate}
                            extendedView={extendedView}
                            menuToggle={menuToggle} openMenu={this._openMenu}
                            deletePost={this._delete}
                            showComment={this._handleShowComment}
                            showEdit={showEdit}
                />

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
    return {
      translate: getMessages(state),
      param: state.param,
      post: post,
      postRelatedIdentityImage: post.post_identity_image,
      postIdentity: state.identities.list[postIdentity],
      comments: userCommentsSelector(state, ownProps),
      fileList: state.common.file.list
    }
  } else {
    const {post} = ownProps
    const postIdentity = post && post.post_identity
    return {
      postIdentity: postIdentity,
      postRelatedIdentityImage: post.post_identity_image,
      translate: getMessages(state)
    }
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getPost: PostActions.getPost,
    deletePost: PostActions.deletePost,
    getFile: FileActions.getFile,
    getCommentsByParentId: CommentActions.getCommentsByParentId,
    createComment: CommentActions.createComment,
    deleteComment: CommentActions.deleteComment,
    getFileByFileRelatedParentId: FileActions.getFileByFileRelatedParentId
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(PostView)
