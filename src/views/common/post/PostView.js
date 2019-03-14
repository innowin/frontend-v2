// @flow
import * as React from 'react'
import 'moment/locale/fa'
import CommentActions from 'src/redux/actions/commonActions/commentActions'
import connect from 'react-redux/es/connect/connect'
import constants from 'src/consts/constants'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import PostActions from 'src/redux/actions/commonActions/postActions'
import PostCommentNew from './PostCommentNew'
import PostComments from './PostComments'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'
import PostImage from './PostImage'
import PostType from './PostType'
import ProductInfoView from '../contributions/ProductInfoView'
import PropTypes from 'prop-types'
import type {commentType} from 'src/consts/flowTypes/common/comment'
import type {identityType} from 'src/consts/flowTypes/user/basicInformation'
import type {paramType} from 'src/consts/flowTypes/paramType'
import type {postType} from 'src/consts/flowTypes/common/post'
import {bindActionCreators} from 'redux'
import {CategoryTitle, VerifyWrapper} from 'src/views/common/cards/Frames'
import {Confirm} from '../cards/Confirm'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {userCommentsSelector} from 'src/redux/selectors/common/comment/postCommentsSelector'
import FontAwesome from 'react-fontawesome'

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
  postRelatedProduct: {},
}
type postViewState = {
  menuToggleTop: boolean,
  menuToggleBottom: boolean,
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
    fileList: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      menuToggleTop: false,
      confirm: false,
      showComment: false,
      commentOn: undefined,
      showMore: false,
      descriptionHeight: null,
      menuToggleBottom: false,
      getInDidMount: false,
    }

    const self: any = this

    self._cancelConfirm = this._cancelConfirm.bind(this)
    self._delete = this._delete.bind(this)
    self._handleClickOutMenuBoxTop = this._handleClickOutMenuBoxTop.bind(this)
    self._handleClickOutMenuBoxBottom = this._handleClickOutMenuBoxBottom.bind(this)
    self._handleShowComment = this._handleShowComment.bind(this)
    self._openMenuTop = this._openMenuTop.bind(this)
    self._openMenuBottom = this._openMenuBottom.bind(this)
    self._readMore = this._readMore.bind(this)
    self._showConfirm = this._showConfirm.bind(this)

  }

  postMenuId: string = 'sidebar-post-menu-box-'

  componentWillMount(): void {
    let {extendedView, post, match, actions} = this.props
    let {getFileByFileRelatedParentId, getPost, getCommentsByParentId} = actions

    document.addEventListener('click', this._handleClickOutMenuBoxTop)
    document.addEventListener('touchend', this._handleClickOutMenuBoxTop)
    document.addEventListener('click', this._handleClickOutMenuBoxBottom)
    document.addEventListener('touchend', this._handleClickOutMenuBoxBottom)

    if (extendedView) {
      const {params, url} = match
      const postId = +params.id
      const isUser = !url.includes('org')
      const postOwnerType = isUser ? constants.USER_TYPES.USER : constants.USER_TYPES.ORG
      const spliced = url.split('/')
      const postOwnerId = +spliced[2]

      getCommentsByParentId({parentId: postId, commentParentType: constants.COMMENT_PARENT.POST})
      getFileByFileRelatedParentId({fileRelatedParentId: postId, fileParentType: constants.FILE_PARENT.POST})
      getPost({postId, postOwnerType, postOwnerId})
    }

    if (post && post.id && !extendedView)
      getFileByFileRelatedParentId({fileRelatedParentId: post.id, fileParentType: constants.FILE_PARENT.POST})
    else this.setState({...this.state, getInDidMount: true})
  }

  componentDidMount() {
    let self: any = this

    if (!this.props.extendedView) {
      let {post, actions} = this.props
      if (this.state.getInDidMount) {
        let {getFileByFileRelatedParentId} = actions
        getFileByFileRelatedParentId({fileRelatedParentId: post.id, fileParentType: constants.FILE_PARENT.POST})
      }
      if (self.text && self.text.clientHeight > 74) {
        let height = self.text.clientHeight
        if (post.post_description && new RegExp('^[A-Za-z]*$').test(post.post_description[0])) {
          self.text.style.paddingRight = '60px'
        }
        else self.text.style.paddingLeft = '60px'
        self.text.style.height = '68px'
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
        }
        else if (word[0] === '@' && word.length >= 6 && !word.substring(1, word.length).includes('@')) {
          self.text.innerHTML = self.text.innerHTML.replace(new RegExp(word, 'g'), `<a href=` + word.slice(1, word.length) + `>${word.length > 60 ? '...' + word.substring(0, 60) : word}</a>`)
        }
        else if (word[0] === '#' && word.length >= 3 && !word.substring(1, word.length).includes('#')) {
          self.text.innerHTML = self.text.innerHTML.replace(new RegExp(word, 'g'), `<a href=` + word + `>${word.length > 60 ? '...' + word.substring(0, 60) : word}</a>`)
        }
        else if (mailExp.test(word)) {
          self.text.innerHTML = self.text.innerHTML.replace(new RegExp(word, 'g'), `<a href=mailto:` + word + `>${word.length > 60 ? '...' + word.substring(0, 60) : word}</a>`)
        }
        else if (!isNaN(word.replace(/\\+/g, '')) && word.length > 4 && (first.test(word) || second.test(word) || third.test(word))) {
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
        }
        else self.text.style.paddingLeft = '60px'
        self.text.style.height = '68px'
        showMore = true
      }

      this.setState({...this.state, showMore, descriptionHeight: height})
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleClickOutMenuBoxTop)
    document.removeEventListener('click', this._handleClickOutMenuBoxBottom)
    document.removeEventListener('touchend', this._handleClickOutMenuBoxTop)
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

  _handleShowComment = () => {
    let {showComment} = this.state
    this.setState({...this.state, showComment: !showComment, commentOn: undefined})
  }

  _handleClickOutMenuBoxTop(e: any) {
    if (!e.target.closest('#' + this.postMenuId + 'top') && !e.target.closest('.post-menu-bottom')) {
      this.setState({...this.state, menuToggleTop: false})
    }
  }

  _handleClickOutMenuBoxBottom(e: any) {
    if (!e.target.closest('#' + this.postMenuId + 'bottom') && !e.target.closest('.post-menu-bottom')) {
      this.setState({...this.state, menuToggleBottom: false})
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

  _delete = () => {
    const {actions, post} = this.props
    const {deletePost} = actions
    const postParent = post.post_parent
    const postRelatedIdentity = post.post_related_identity
    const postOwnerId = postRelatedIdentity.id
    const postParentType = (postParent && postParent.child_name) || null
    const postParentId = (postParent && postParent.id) || null
    const postOwnerType = postRelatedIdentity.identity_type
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
      commentParentType, postRelatedProduct,
    } = this.props

    const {menuToggleBottom, menuToggleTop, confirm, showComment, commentOn} = this.state
    let postDescription = '', postIdentityUserId, postIdentityOrganId, postOwnerId = 0, postFilesArray

    if (post) {
      postDescription = post.post_description
      postIdentityUserId = post.post_related_identity.identity_user && post.post_related_identity.identity_user.id
      postIdentityOrganId = post.post_related_identity.identity_organization && post.post_related_identity.identity_organization.id
      postOwnerId = postIdentityUserId || postIdentityOrganId
      postFilesArray = post.post_files_array
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
                              extendedView={extendedView} openMenu={this._openMenuTop} deletePost={this._delete}
                              menuToggle={menuToggleTop}
                              postMenuId={this.postMenuId + 'top'}
                  />
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
                            extendedView={extendedView}
                            menuToggle={menuToggleBottom} openMenu={this._openMenuBottom}
                            deletePost={this._delete}
                            showComment={this._handleShowComment}
                            showEdit={showEdit}
                            postMenuId={this.postMenuId + 'bottom'}
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
    const postIdentity = post && post.post_related_identity
    const postRelatedProductId = post && post.post_related_product
    let postRelatedProduct = postRelatedProductId && state.common.product.products.list[postRelatedProductId]
    const productIdentity = postRelatedProduct ?
        postRelatedProduct.product_owner.id ?
            state.identities.list[postRelatedProduct.product_owner.id] :
            state.identities.list[postRelatedProduct.product_owner] : null
    postRelatedProduct = postRelatedProduct && {...postRelatedProduct, product_owner: productIdentity}
    return {
      translate: getMessages(state),
      param: state.param,
      post: post,
      postRelatedIdentityImage: post.post_related_identity.profile_media,
      postRelatedProduct,
      postIdentity: state.identities.list[postIdentity],
      comments: userCommentsSelector(state, ownProps),
      fileList: state.common.file.list,
    }
  }
  else {
    const {post} = ownProps
    const postIdentity = post && post.post_related_identity
    const postRelatedProductId = post && post.post_related_product && post.post_related_product.id
    let postRelatedProduct = postRelatedProductId && state.common.product.products.list[postRelatedProductId]
    postRelatedProduct = postRelatedProduct && {...postRelatedProduct, product_owner: postIdentity}
    return {
      postIdentity: postIdentity,
      postRelatedProduct,
      postRelatedIdentityImage: post.post_related_identity ? post.post_related_identity.profile_media : null,
      translate: getMessages(state),
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
    getFileByFileRelatedParentId: FileActions.getFileByFileRelatedParentId,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(PostView)
