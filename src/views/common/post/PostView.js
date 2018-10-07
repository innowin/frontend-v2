import React, {Component} from "react";
import PropTypes from "prop-types";
import "moment/locale/fa";
import Moment from "react-moment";
import {EditIcon, DefaultUserIcon} from "src/images/icons";
import {VerifyWrapper} from "src/views/common/cards/Frames";
import {SupplyIcon, DemandIcon} from "src/images/icons";
import connect from "react-redux/es/connect/connect";
import {getMessages} from "../../../redux/selectors/translateSelector";
import {bindActionCreators} from "redux"
import PostActions from "../../../redux/actions/commonActions/postActions";
import CheckOwner from '../CheckOwner'
import {Link} from "react-router-dom";

class PostView extends Component {
  static propTypes = {
    showEdit: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    param: PropTypes.object.isRequired,
  }

  _getViewerCount = () => {
    const {post, actions} = this.props
    const {getPostViewerCount} = actions
    const postId = post.id
    getPostViewerCount(postId)
  }

  _addViewer = (e) => {
    e.preventDefault()
    const {post, actions} = this.props
    const {setPostViewer, getPostViewerCount} = actions
    const postId = post.id
    setPostViewer(postId, getPostViewerCount)
  }

  componentDidMount() {
    this._getViewerCount()
  }

  render() {
    const {showEdit, post, translate} = this.props
    const {post_identity, viewerCount, post_related_identity_image} = this.props.post
    const supplyIcon = post.post_type === 'supply'
    const demandIcon = post.post_type === 'demand'
    const postIcon = post.post_type === 'post'
    let user = {}
    let organization = {}
    let paramId = ''
    let name = ''
    let url = ''
    if (post_identity.id) {
      user = post_identity.identity_user
      organization = post_identity.identity_organization
      paramId = (user && user.id) || (organization && organization.id)
      name = user ? ((user.first_name || user.last_name) ? user.first_name + ' ' + user.last_name : undefined)
        : (organization ? (organization.nike_name || organization.official_name || undefined) : undefined)
      url = user ? `/user/${user.id}` : `/organization/${organization.id}`
    }
    return (
        <VerifyWrapper isLoading={false} error={false}>
          <div className="-itemWrapperPost">
            <div className="-item-headerPost">
              <Link to={url} className='link-post'>
                <div className="-img-col">
                  {!post_related_identity_image
                      ? (<DefaultUserIcon/>)
                      : (<img className="rounded-circle" src={post_related_identity_image.file} alt=""/>)
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
                    <Moment className="-green2" element="span" fromNow ago>{post.created_time}</Moment>
                    <span className="-green2"> {translate['Last']}</span>
                  </div>
                </div>
              </Link>
              <CheckOwner id={paramId}>
                <div onClick={showEdit} className="-item-edit-btn -item-edit-btnPost pulse"><EditIcon/></div>
              </CheckOwner>
            </div>
            <div className="post-content">
              {post.post_description}
            </div>
            <div className="-item-footerPost">
              <div className='footer-part'>
                <span>{
                  ((postIcon) && <i className="fa fa-share-alt" aria-hidden="true"/>) ||
                  ((supplyIcon) && <SupplyIcon height="19px"/>) ||
                  ((demandIcon) && <DemandIcon height="22px"/>)}
                </span>
              </div>
              <div className='post-details footer-part'>
                <div>
                  <i className="fa fa-ellipsis-h cursor-pointer" aria-hidden="true" onClick={this._addViewer}/>
                </div>
                <div>
                  <span className="ml-1">{viewerCount}</span>
                  <i className="fa fa-eye" aria-hidden="true"/>
                </div>
                <div>
                  <span className="ml-1">\</span>
                  <i className="fa fa-share" aria-hidden="true"/>
                </div>
              </div>
            </div>
          </div>
        </VerifyWrapper>
    )
  }
}

const mapStateToProps = state => {
  return {
    translate: getMessages(state),
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getPostViewerCount: PostActions.getPostViewerCount,
    setPostViewer: PostActions.setPostViewer
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(PostView)
