import React, {PureComponent} from 'react'
import constants from 'src/consts/constants'
import PostActions from 'src/redux/actions/commonActions/postActions'
import {bindActionCreators} from 'redux'
import {getClientIdentity} from 'src/redux/selectors/common/client/getClient'
import connect from 'react-redux/es/connect/connect'
import CommentActions from 'src/redux/actions/commonActions/commentActions'
import ProposalsActions from 'src/redux/actions/commonActions/proposalActions'
import {Post} from './Post'

class ExtendedPostView extends PureComponent {

  componentDidMount() {
    const {match, clientIdentity, actions} = this.props
    const {getCommentsByParentId, getPost, getProposals} = actions
    getCommentsByParentId({parentId: match.params.id, commentParentType: constants.COMMENT_PARENT.POST})
    getProposals(match.params.id)
    getPost({postId: match.params.id, token: !clientIdentity})
  }

  render() {
    const {post, actions, location} = this.props
    if (post && post.id) return <Post post={post} updatePost={actions.updatePost} deletePost={actions.deletePost} extendedView={true} location={location}/>
    else return null
  }
}

const mapStateToProps = (state, ownProps) => ({
  clientIdentity: getClientIdentity(state),
  post: state.common.post.list[ownProps.match.params.id],
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updatePost: PostActions.updatePost,
    deletePost: PostActions.deletePost,
    getPost: PostActions.getPost,
    getCommentsByParentId: CommentActions.getCommentsByParentId,
    getProposals: ProposalsActions.getProposalsByPostId,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExtendedPostView)