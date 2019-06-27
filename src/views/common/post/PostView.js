// @flow
import * as React from 'react'
import 'moment/locale/fa'
import CommentActions from 'src/redux/actions/commonActions/commentActions'
import connect from 'react-redux/es/connect/connect'
import constants from 'src/consts/constants'
import FontAwesome from 'react-fontawesome'
import PostActions from 'src/redux/actions/commonActions/postActions'
import PostCommentNew from './PostCommentNew'
import PostComments from './PostComments'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'
import PostImage from './PostImage'
import PostType from './PostType'
import ProductInfoView from '../contributions/ProductInfoView'
import * as PropTypes from 'prop-types'
import type {commentType} from 'src/consts/flowTypes/common/comment'
import type {identityType} from 'src/consts/flowTypes/user/basicInformation'
import type {postType} from 'src/consts/flowTypes/common/post'
import {bindActionCreators} from 'redux'
import {CategoryTitle} from 'src/views/common/cards/Frames'
import {Confirm} from '../cards/Confirm'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {Link} from 'react-router-dom'
import {userCommentsSelector} from 'src/redux/selectors/common/comment/postCommentsSelector'
import {userInstantCommentsSelector} from 'src/redux/selectors/common/comment/postInstantCommentSelector'
import likeActions from 'src/redux/actions/commonActions/likeActions'

type postExtendedViewProps = {
  actions: {
    getCommentsByParentId: Function,
    deleteComment: Function,
    deletePost: Function,
  },
  translate: { [string]: string },
  post: postType,
  postIdentity?: identityType | number,
  extendedView?: boolean,
  showEdit?: Function,
  comments?: Array<commentType>,
  instantViewComments?: Array<commentType>,
  postRelatedIdentityImage: string,
  commentParentType: string,
  postRelatedProduct: {},
  stateComments: { number: commentType },
}
type postViewState = {
  menuToggleTop: boolean,
  menuToggleBottom: boolean,
  confirm: boolean,
  showComment: boolean,
  commentOn: commentType,
  showMore: boolean,
  is_liked: boolean,
}

class PostView extends React.PureComponent<postExtendedViewProps, postViewState> {
  static propTypes = {
    post: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    postIdentity: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    extendedView: PropTypes.bool,
    showEdit: PropTypes.func,
    comments: PropTypes.array,
    instantViewComments: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.state = {
      menuToggleTop: false,
      confirm: false,
      showComment: false,
      commentOn: undefined,
      showMore: false,
      menuToggleBottom: false,
      linkTimer: false,
      is_liked: false,
    }

    const self: any = this
    self._cancelConfirm = this._cancelConfirm.bind(this)
    self._delete = this._delete.bind(this)
    self._handleClickOutMenuBoxBottom = this._handleClickOutMenuBoxBottom.bind(this)
    self._handleShowComment = this._handleShowComment.bind(this)
    self._handleLike = this._handleLike.bind(this)
    self._openMenuTop = this._openMenuTop.bind(this)
    self._openMenuBottom = this._openMenuBottom.bind(this)
    self._readMore = this._readMore.bind(this)
    self._showConfirm = this._showConfirm.bind(this)
    self.showMoreComment = this.showMoreComment.bind(this)
    self._delete = this._delete.bind(this)
    self.onLinkClick = this.onLinkClick.bind(this)
    self.onLinkDown = this.onLinkDown.bind(this)
  }

  postMenuId: string = 'sidebar-post-menu-box-'

  componentDidMount() {
    const self: any = this
    const {extendedView, post, actions} = this.props

    if (self.text && post && post.post_description) {
      let showMore = false
      let is_liked = false

      const allWords = self.text.innerText.replace(/\n/g, ' ').split(' ')
      const mailExp = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')
      const urlExp = new RegExp('^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[A-Za-z0-9]+([\\-.][A-Za-z0-9]+)*\\.[A-Za-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$')
      // Phone Reg
      const first = new RegExp('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))')
      const second = new RegExp('([-]?[0-9]{3})')
      const third = new RegExp('([-]?[0-9]{3,4})')

      for (let i = 0; i < allWords.length; i++) {
        const word = allWords[i].trim()
        if (urlExp.test(word)) {
          word.includes('http://') || word.includes('https://') ?
              self.text.innerHTML = self.text.innerHTML.replace(new RegExp(word, 'g'), `<span style="color: blue;cursor: pointer;" title=${word} onclick="window.open('${word}', '_blank')">${word.length > 60 ? word.slice(0, 60) + '...' : word}</span>`)
              :
              self.text.innerHTML = self.text.innerHTML.replace(new RegExp(word, 'g'), `<span style="color: blue;cursor: pointer;" title=${word} onclick="window.open('http://${word}', '_blank')">${word.length > 60 ? word.slice(0, 60) + '...' : word}</span>`)
        }
        else if (word[0] === '@' && word.length >= 6 && !word.substring(1, word.length).includes('@')) {
          self.text.innerHTML = self.text.innerHTML.replace(new RegExp(word, 'g'), `<span style="color: blue;cursor: pointer;" title=${word} onclick="window.open('${word.slice(1, word.length)}')">${word}</span>`)
        }
        else if (word[0] === '#' && word.length >= 3 && !word.substring(1, word.length).includes('#')) {
          self.text.innerHTML = self.text.innerHTML.replace(new RegExp(word, 'g'), `<span style="color: blue;cursor: pointer;" title=${word} onclick="window.open('${word}')">${word}</span>`)
        }
        else if (mailExp.test(word)) {
          self.text.innerHTML = self.text.innerHTML.replace(new RegExp(word, 'g'), `<span style="color: blue;cursor: pointer;" title=${word} onclick="window.open('mailto:${word}', '_blank')">${word.length > 60 ? word.slice(0, 60) + '...' : word}</span>`)
        }
        else if (!isNaN(word.replace(/\\+/g, '')) && word.length > 4 && (first.test(word) || second.test(word) || third.test(word))) {
          // don't touch it !
          word.includes('+') ?
              self.text.innerHTML = self.text.innerHTML.replace(new RegExp(`\\${word}`, 'g'), `<span style="color: blue;cursor: pointer;" title=${word} onclick="window.open('tel:${word}', '_blank')">${word}</span>`)
              :
              self.text.innerHTML = self.text.innerHTML.replace(new RegExp(word, 'g'), `<span style="color: blue;cursor: pointer;" title=${word} onclick="window.open('tel:${word}', '_blank')">${word}</span>`)
        }
      }

      if (post.is_post_liked_by_logged_in_user !== undefined) {
        is_liked = post.is_post_liked_by_logged_in_user
      }
      if (extendedView) {
        const {getCommentsByParentId} = actions
        const {match} = this.props
        getCommentsByParentId({parentId: match.params.id, commentParentType: constants.COMMENT_PARENT.POST})
      }
      else if (self.text.clientHeight > 146) {
        if (new RegExp('^[A-Za-z]*$').test(post.post_description[0]) && document.body.clientWidth > 480) self.text.style.paddingRight = '62px'
        else self.text.style.paddingLeft = '62px'
        self.text.style.height = '139px'
        showMore = true
      }
      this.setState({...this.state, is_liked, showMore})
    }


    document.addEventListener('click', this._handleClickOutMenuBoxBottom)
    document.addEventListener('touchend', this._handleClickOutMenuBoxBottom)
  }

  componentWillReceiveProps(nextProps) {
    const {post, extendedView, instantViewComments, actions} = nextProps
    if (post) {
      if (post !== this.props.post && post.is_post_liked_by_logged_in_user !== undefined) {
        this.setState({...this.state, is_liked: post.is_post_liked_by_logged_in_user})
      }
      if (!extendedView && post.post_description && post.post_description.length !== this.props.post.post_description.length) {
        const self: any = this
        self.text.style.height = 'auto'
        this.setState({...this.state, showMore: false})
      }
      if (instantViewComments && this.props.instantViewComments && this.props.instantViewComments.length > instantViewComments.length && instantViewComments.length < 3) {
        const {getCommentsByParentId} = actions
        getCommentsByParentId({parentId: post.id, commentParentType: constants.COMMENT_PARENT.POST, limit: 3})
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleClickOutMenuBoxBottom)
    document.removeEventListener('touchend', this._handleClickOutMenuBoxBottom)
  }

  _openMenuTop(e) {
    e.preventDefault()
    this.setState({...this.state, menuToggleTop: !this.state.menuToggleTop})
  }

  _openMenuBottom(e) {
    e.preventDefault()
    this.setState({...this.state, menuToggleBottom: !this.state.menuToggleBottom})
  }

  _handleShowComment() {
    const {extendedView, instantViewComments, actions, post} = this.props
    const {getCommentsByParentId} = actions
    let {showComment} = this.state
    this.setState({...this.state, showComment: !showComment, commentOn: undefined})

    if (!extendedView && (!instantViewComments || (instantViewComments && instantViewComments.length < 3))) {
      getCommentsByParentId({parentId: post.id, commentParentType: constants.COMMENT_PARENT.POST, limit: 3})
    }
  }

  _handleLike() {
    const {actions, clientIdentity, post} = this.props
    const {is_liked} = this.state
    const {createLike} = actions

    createLike({like_parent: post && post.id, like_sender: clientIdentity})
    this.setState({...this.state, is_liked: !is_liked})
  }

  _handleClickOutMenuBoxBottom(e: any) {
    if (this.state.menuToggleBottom === true && !e.target.closest('#' + this.postMenuId + 'bottom') && !e.target.closest('.post-menu-bottom')) {
      this.setState({...this.state, menuToggleBottom: false})
    }
    if (this.state.menuToggleTop === true && !e.target.closest('#' + this.postMenuId + 'top') && !e.target.closest('.post-menu-bottom')) {
      this.setState({...this.state, menuToggleTop: false})
    }
  }

  _setCommentOn = (comment) => {
    this.setState({...this.state, commentOn: comment, showComment: true})
  }
  _removeCommentOn = () => {
    this.setState({...this.state, commentOn: undefined})
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
    const postRelatedIdentity = post.post_related_identity
    const postOwnerId = postRelatedIdentity.id
    const postParentType = (postParent && postParent.child_name) || null
    const postParentId = (postParent && postParent.id) || null
    deletePost({postId: post.id, postOwnerId, postParentId, postParentType})
  }

  deleteComment = (comment) => {
    const {actions, post} = this.props
    const {deleteComment} = actions
    deleteComment({commentId: comment.id, parentId: post.id, commentParentType: constants.COMMENT_PARENT.POST})
  }

  _readMore() {
    this.setState({...this.state, showMore: false}, () => {
      const self: any = this
      self.text.style.height = 'auto'
      if (document.body.clientWidth > 480) {
        self.text.style.paddingRight = '0'
        self.text.style.paddingLeft = '0'
      }
      else self.text.style.paddingLeft = '0'
    })
  }

  showMoreComment() {
    const {extendedView, instantViewComments, actions, post} = this.props
    const {getCommentsByParentId} = actions
    if (!extendedView && instantViewComments && instantViewComments.length !== 0) {
      getCommentsByParentId({
        parentId: post.id,
        commentParentType: constants.COMMENT_PARENT.POST,
        limit: 10,
        offset: instantViewComments.length,
      })
    }
  }

  onLinkClick(e) {
    const {linkTimer} = this.state
    if (linkTimer) {
      e.preventDefault()
      this.setState({...this.state, linkTimer: false})
    }
  }

  onLinkDown() {
    setTimeout(() => {
      this.setState({...this.state, linkTimer: true})
    }, 400)
  }

  render() {
    const self: any = this

    const {
      post, translate, postIdentity, postRelatedIdentityImage, extendedView, showEdit, comments,
      instantViewComments, commentParentType, postRelatedProduct, clientIdentity, stateComments,
    } = this.props

    const {menuToggleBottom, menuToggleTop, confirm, showComment, commentOn, is_liked} = this.state
    const postDescription = post && post.post_description && post.post_description.trim()
    const postOwnerId = postIdentity && postIdentity.id
    const postFilesArray = post && post.post_files_array

    return (
        confirm
            ? <div className={extendedView ? 'post-view-container remove-post-container' : 'remove-post-container'}>
              <Confirm cancelRemoving={this._cancelConfirm} remove={this._delete}/>
            </div>
            : post ?
            <div className='-itemWrapperPost'>
              {extendedView && <CategoryTitle title={translate['Single post']}/>}
              <div className={extendedView ? 'post-view-container' : undefined}>
                {
                  post.post_type !== constants.POST.POST_TYPE.POST &&
                  <PostType translate={translate} post={post}/>
                }
                <div className='post-view-relative'>
                  <PostHeader post={post}
                              translate={translate}
                              postIdentity={postIdentity}
                              postRelatedIdentityImage={postRelatedIdentityImage}
                              showEdit={showEdit}
                              extendedView={extendedView}
                              openMenu={this._openMenuTop}
                              deletePost={this._delete}
                              menuToggle={menuToggleTop}
                              postMenuId={this.postMenuId + 'top'}
                              clientIdentity={clientIdentity}
                  />
                  {
                    !extendedView || !postIdentity ?
                        <Link className='link-post-decoration'
                              onMouseDown={this.onLinkDown}
                              onClick={this.onLinkClick}
                              to={postIdentity && postIdentity.identity_type === 'user' ? `/user/${postOwnerId}/Posts/${post.id}` : `/organization/${postOwnerId}/Posts/${post.id}`}>
                          <div ref={e => self.text = e} className='post-content'
                               style={{paddingTop: '10px', paddingBottom: '10px', direction: new RegExp('^[A-Za-z]*$').test(postDescription && postDescription[0]) ? 'ltr' : 'rtl'}}>
                            {postDescription}
                          </div>
                        </Link>
                        :
                        <div ref={e => self.text = e} className='post-content'
                             style={{paddingTop: '10px', paddingBottom: '10px', direction: new RegExp('^[A-Za-z]*$').test(postDescription && postDescription[0]) ? 'ltr' : 'rtl'}}>
                          {postDescription}
                        </div>
                  }

                  <div className={this.state.showMore ? 'post-content-more' : 'post-content-more-hide'}
                       style={new RegExp('^[A-Za-z]*$').test(postDescription && postDescription[0]) ?
                           {right: '10px'} :
                           {left: '10px'}}
                       onClick={this._readMore}>
                    ادامه
                    <div className='post-content-more-sign'>«</div>
                  </div>
                </div>

                <PostImage translate={translate} extendedView={extendedView} post={post}/>
                {post && post.post_related_product &&
                <div className='post-view-product-container'>
                  <ProductInfoView product={postRelatedProduct}
                                   ownerId={postOwnerId}
                                   translate={translate}/>
                </div>
                }
                {
                  postFilesArray && postFilesArray.map(file =>
                      file.type === constants.CREATE_FILE_TYPES.FILE &&
                      <a key={'post file' + file.id} className='get-file pulse' href={file.file}>
                        <FontAwesome name='download'/> {translate['Get file']}
                      </a>,
                  )
                }
                <PostFooter post={post} postIdentity={postIdentity} translate={translate}
                            extendedView={extendedView} clientIdentity={clientIdentity}
                            menuToggle={menuToggleBottom} openMenu={this._openMenuBottom}
                            deletePost={this._delete}
                            showComment={this._handleShowComment}
                            handleLike={this._handleLike}
                            is_liked={is_liked}
                            showEdit={showEdit}
                            postMenuId={this.postMenuId + 'bottom'}
                />

                {showComment &&
                <PostCommentNew
                    commentParentType={commentParentType}
                    post={post}
                    commentOn={commentOn}
                    removeCommentOn={this._removeCommentOn}
                    instantViewComments={instantViewComments}
                    extendedView={extendedView}/>
                }

                {showComment && !extendedView && instantViewComments && instantViewComments.length > 0 &&
                <React.Fragment>
                  {
                    post.comments_count !== instantViewComments.length &&
                    <div onClick={this.showMoreComment} className='show-more-comment'>{translate['Show More Comments']}</div>
                  }
                  <PostComments comments={instantViewComments}
                                stateComments={stateComments}
                                translate={translate}
                                replyComment={(comment) => this._setCommentOn(comment)}
                                deleteComment={this.deleteComment}
                  />
                </React.Fragment>
                }

                {
                  extendedView && comments && comments.length > 0 &&
                  <PostComments comments={comments}
                                stateComments={stateComments}
                                translate={translate}
                                replyComment={(comment) => this._setCommentOn(comment)}
                                deleteComment={this.deleteComment}
                  />
                }
              </div>
            </div>
            : null
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const clientIdentity = state.auth.client.identity.content
  const post = ownProps.post || state.common.post.list[ownProps.match.params.id]
  const postIdentity = post && state.identities.list[post.post_related_identity]
  const postRelatedIdentityImage = postIdentity && postIdentity.profile_media && postIdentity.profile_media.file
  const postRelatedProduct = post ? post.post_related_product && {
    ...state.common.product.products.list[post.post_related_product.id ? post.post_related_product.id : post.post_related_product],
    product_owner: postIdentity,
  } : {}
  return {
    post,
    postIdentity,
    clientIdentity,
    postRelatedProduct,
    postRelatedIdentityImage,
    comments: userCommentsSelector(state, ownProps),
    stateComments: state.common.comment.list,
    translate: getMessages(state),
    instantViewComments: userInstantCommentsSelector(state, ownProps),
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    deletePost: PostActions.deletePost,
    getCommentsByParentId: CommentActions.getCommentsByParentId,
    deleteComment: CommentActions.deleteComment,
    createLike: likeActions.createLike,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(PostView)
