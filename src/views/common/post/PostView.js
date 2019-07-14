import React from 'react'
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
import {bindActionCreators} from 'redux'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {Link} from 'react-router-dom'
import {CommentsSelector} from 'src/redux/selectors/common/comment/CommentsSelector'
import likeActions from 'src/redux/actions/commonActions/likeActions'
import makeProductSelectorById from 'src/redux/selectors/common/product/getProductById'
import ProposalsActions from 'src/redux/actions/commonActions/proposalActions'
import PostNewProposal from './PostNewProposal'
import {ProposalsSelector} from 'src/redux/selectors/common/proposal/proposalSelector'
import Proposals from './Proposals'

class PostView extends React.PureComponent {
  static propTypes = {
    post: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    postIdentity: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    extendedView: PropTypes.bool,
    showEdit: PropTypes.func,
    comments: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.state = {
      menuToggleTop: false,
      showComment: false,
      commentOn: null,
      menuToggleBottom: false,
      linkTimer: false,
      showProposalSend: false,
      showMore: false,
    }
    this._readMore = this._readMore.bind(this)
    this._handleClickOutMenuBoxBottom = this._handleClickOutMenuBoxBottom.bind(this)
    this._handleShowComment = this._handleShowComment.bind(this)
    this._handleLike = this._handleLike.bind(this)
    this._delete = this._delete.bind(this)
    this.handleShowProposals = this.handleShowProposals.bind(this)
    this._openMenuTop = this._openMenuTop.bind(this)
    this._openMenuBottom = this._openMenuBottom.bind(this)
    this.showMoreComment = this.showMoreComment.bind(this)
    this._delete = this._delete.bind(this)
    this.onLinkClick = this.onLinkClick.bind(this)
    this.onLinkDown = this.onLinkDown.bind(this)
    this._setCommentOn = this._setCommentOn.bind(this)
    this._removeCommentOn = this._removeCommentOn.bind(this)
  }

  postMenuId = 'sidebar-post-menu-box-'

  componentDidMount() {
    const {extendedView, post, actions} = this.props

    if (extendedView) {
      const {getCommentsByParentId, getPost, getProposals} = actions
      const {match, ownerId, location, clientIdentity, postIdentity} = this.props
      getCommentsByParentId({parentId: match.params.id, commentParentType: constants.COMMENT_PARENT.POST})
      getProposals(match.params.id)
      getPost({postId: match.params.id, postOwnerId: ownerId})
      setTimeout(() => {
        if (this.post && document.body.clientWidth < 480) {
          const rect = this.post.getBoundingClientRect()
          window.scroll({
            top: window.scrollY + rect.top - 40,
            behavior: 'smooth',
          })
        }
        if (clientIdentity && postIdentity && (clientIdentity !== postIdentity.id) && location.pathname.includes('/Proposal')) {
          this.handleShowProposals()
        }
      }, 500)
    }
    else if (post && post.post_description && this.text && this.text.clientHeight > 146) {
      if (!new RegExp('^[A-Za-z]*$').test(post.post_description[0])) this.text.style.paddingLeft = '62px'
      this.text.style.height = '139px'
      this.setState({...this.state, showMore: true})
    }

    setTimeout(() => {
      if (post && this.text && post.post_description) {
        const allWords = this.text.innerText.replace(/\n/g, ' ').split(' ')
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
                this.text.innerHTML = this.text.innerHTML.replace(new RegExp(word, 'g'), `<span style="color: blue;cursor: pointer;" title=${word} onclick="window.open('${word}', '_blank')">${word.length > 60 ? word.slice(0, 60) + '...' : word}</span>`)
                :
                this.text.innerHTML = this.text.innerHTML.replace(new RegExp(word, 'g'), `<span style="color: blue;cursor: pointer;" title=${word} onclick="window.open('http://${word}', '_blank')">${word.length > 60 ? word.slice(0, 60) + '...' : word}</span>`)
          }
          else if (word[0] === '@' && word.length >= 6 && !word.substring(1, word.length).includes('@')) {
            this.text.innerHTML = this.text.innerHTML.replace(new RegExp(word, 'g'), `<span style="color: blue;cursor: pointer;" title=${word} onclick="window.open('${word.slice(1, word.length)}')">${word}</span>`)
          }
          else if (word[0] === '#' && word.length >= 3 && !word.substring(1, word.length).includes('#')) {
            this.text.innerHTML = this.text.innerHTML.replace(new RegExp(word, 'g'), `<span style="color: blue;cursor: pointer;" title=${word} onclick="window.open('${word}')">${word}</span>`)
          }
          else if (mailExp.test(word)) {
            this.text.innerHTML = this.text.innerHTML.replace(new RegExp(word, 'g'), `<span style="color: blue;cursor: pointer;" title=${word} onclick="window.open('mailto:${word}', '_blank')">${word.length > 60 ? word.slice(0, 60) + '...' : word}</span>`)
          }
          else if (!isNaN(word.replace(/\\+/g, '')) && word.length > 4 && (first.test(word) || second.test(word) || third.test(word))) {
            // don't touch it !
            word.includes('+') ?
                this.text.innerHTML = this.text.innerHTML.replace(new RegExp(`\\${word}`, 'g'), `<span style="color: blue;cursor: pointer;" title=${word} onclick="window.open('tel:${word}', '_blank')">${word}</span>`)
                :
                this.text.innerHTML = this.text.innerHTML.replace(new RegExp(word, 'g'), `<span style="color: blue;cursor: pointer;" title=${word} onclick="window.open('tel:${word}', '_blank')">${word}</span>`)
          }
        }
      }
    }, 300)

    document.addEventListener('click', this._handleClickOutMenuBoxBottom)
    document.addEventListener('touchend', this._handleClickOutMenuBoxBottom)
  }

  componentWillReceiveProps(nextProps) {
    const {post, comments, actions} = nextProps
    if (post && comments && this.props.comments && this.props.comments.length > comments.length && comments.length < 3) {
      const {getCommentsByParentId} = actions
      getCommentsByParentId({parentId: post.id, commentParentType: constants.COMMENT_PARENT.POST, limit: 3})
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
    const {extendedView, comments, actions, post} = this.props
    const {getCommentsByParentId} = actions
    let {showComment} = this.state
    this.setState({...this.state, showProposalSend: false, showComment: !showComment, commentOn: null})

    if (!extendedView && (!comments || (comments && comments.length < 3))) {
      getCommentsByParentId({parentId: post.id, commentParentType: constants.COMMENT_PARENT.POST, limit: 3})
    }
  }

  handleShowProposals() {
    const {showProposalSend} = this.state
    this.setState({...this.state, showComment: false, showProposalSend: !showProposalSend}, () => {
      if (!showProposalSend) {
        const {actions, post} = this.props
        actions.getProposals(post.id)
      }
    })
  }

  _handleLike() {
    const {actions, clientIdentity, post} = this.props
    const {createLike} = actions
    post && clientIdentity && createLike({like_parent: post.id, like_sender: clientIdentity})
  }

  _handleClickOutMenuBoxBottom(e) {
    if (this.state.menuToggleBottom === true && !e.target.closest('#' + this.postMenuId + 'bottom') && !e.target.closest('.post-menu-bottom')) {
      this.setState({...this.state, menuToggleBottom: false})
    }
    if (this.state.menuToggleTop === true && !e.target.closest('#' + this.postMenuId + 'top') && !e.target.closest('.post-menu-bottom')) {
      this.setState({...this.state, menuToggleTop: false})
    }
  }

  _setCommentOn(comment) {
    this.setState({...this.state, commentOn: comment, showComment: true})
  }

  _removeCommentOn() {
    this.setState({...this.state, commentOn: null})
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
      this.text.style.height = 'auto'
      this.text.style.paddingLeft = '0'
    })
  }

  showMoreComment() {
    const {extendedView, comments, actions, post} = this.props
    const {getCommentsByParentId} = actions
    if (!extendedView && comments && comments.length !== 0) {
      getCommentsByParentId({
        parentId: post.id,
        commentParentType: constants.COMMENT_PARENT.POST,
        limit: 10,
        offset: comments.length,
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
    if (this.props.postIdentity && this.props.post && this.props.post.id) {
      const {
        post, translate, postIdentity, postRelatedIdentityImage, postRelatedProduct,
        clientIdentity, extendedView, showEdit, comments, proposalLoading, proposals,
      } = this.props
      const {menuToggleBottom, menuToggleTop, showComment, commentOn, showProposalSend} = this.state
      const postDescription = post.post_description && post.post_description.trim()
      const postOwnerId = postIdentity && postIdentity.id
      const postFilesArray = post.post_files_array

      return (
          <div ref={e => this.post = e} className='-itemWrapperPost'>
            <div className={extendedView ? 'post-view-container' : ''}>
              {
                post.post_type !== constants.POST.POST_TYPE.POST &&
                <PostType translate={translate}
                          post={post}
                          postIdentity={postIdentity}
                          clientIdentity={clientIdentity}
                          showProposals={this.handleShowProposals}
                />
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
                  !extendedView ?
                      <Link className='link-post-decoration'
                            onMouseDown={this.onLinkDown}
                            onClick={this.onLinkClick}
                            to={postIdentity.identity_type === 'user' ? `/user/${postOwnerId}/Posts/${post.id}` : `/organization/${postOwnerId}/Posts/${post.id}`}>
                        <div ref={e => this.text = e} className='post-content'
                             style={{paddingTop: '10px', paddingBottom: '10px', direction: new RegExp('^[A-Za-z]*$').test(postDescription && postDescription[0]) ? 'ltr' : 'rtl'}}>
                          {postDescription}
                        </div>
                      </Link>
                      :
                      <div ref={e => this.text = e} className='post-content'
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
              {
                postRelatedProduct &&
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
              <PostFooter post={post}
                          postIdentity={postIdentity}
                          translate={translate}
                          extendedView={extendedView}
                          clientIdentity={clientIdentity}
                          menuToggle={menuToggleBottom}
                          openMenu={this._openMenuBottom}
                          deletePost={this._delete}
                          showComment={this._handleShowComment}
                          showProposals={this.handleShowProposals}
                          handleLike={this._handleLike}
                          showEdit={showEdit}
                          postMenuId={this.postMenuId + 'bottom'}
              />

              {
                showComment ?
                    <PostCommentNew post={post}
                                    commentOn={commentOn}
                                    removeCommentOn={this._removeCommentOn}
                                    comments={comments}
                                    extendedView={extendedView}

                    />
                    :
                    showProposalSend &&
                    <PostNewProposal postId={post.id}
                                     proposals={proposals}
                                     loading={proposalLoading}
                                     showProposals={this.handleShowProposals}
                    />
              }

              {
                comments && comments.length > 0 && (showComment || extendedView) &&
                <React.Fragment>
                  {
                    !extendedView && post.comments_count !== comments.length &&
                    <div onClick={this.showMoreComment} className='show-more-comment'>{translate['Show More Comments']}</div>
                  }
                  <PostComments comments={comments}
                                translate={translate}
                                replyComment={this._setCommentOn}
                                deleteComment={this.deleteComment}
                  />
                </React.Fragment>
              }
            </div>

            {
              proposals && clientIdentity === postIdentity.id && extendedView &&
              <Proposals proposals={proposals}/>
            }

          </div>
      )
    }
    else return null
  }
}

const mapStateToProps = (state, ownProps) => {
  const clientIdentity = state.auth.client.identity.content
  const post = ownProps.post || state.common.post.list[ownProps.match.params.id]
  const postIdentity = post && state.identities.list[post.post_related_identity]
  const postRelatedIdentityImage = postIdentity && postIdentity.profile_media && postIdentity.profile_media.file
  const postRelatedProduct = post && post.post_related_product ? makeProductSelectorById()(state, post.post_related_product) : null
  return {
    post,
    postIdentity,
    clientIdentity,
    postRelatedProduct,
    postRelatedIdentityImage,
    comments: CommentsSelector(state, ownProps),
    proposals: ProposalsSelector(state, ownProps),
    proposalLoading: post && state.common.post.list[post.id] && state.common.post.list[post.id].proposals && state.common.post.list[post.id].proposals.loading,
    translate: getMessages(state),
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getPost: PostActions.getPost,
    deletePost: PostActions.deletePost,
    getCommentsByParentId: CommentActions.getCommentsByParentId,
    deleteComment: CommentActions.deleteComment,
    createLike: likeActions.createLike,
    getProposals: ProposalsActions.getProposalsByPostId,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(PostView)
