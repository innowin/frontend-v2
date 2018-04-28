import React, {Component} from "react";
import PropTypes from "prop-types";
import "moment/locale/fa";
import Moment from "react-moment";
import {editIcon, defaultImg} from "src/images/icons";
import {VerifyWrapper} from "src/views/common/cards/Frames";
import {getFile} from "src/crud/media/media";
import {SupplyIcon, DemandIcon} from "src/images/icons";
import cx from 'classnames';
import {getPostViewerCount, setPostViewer} from "src/crud/post/postViewerCount";


export class PostItemWrapper extends Component {
  render() {
    return (
      <div className="-itemWrapperPost">
        {this.props.children}
      </div>
    )
  }
}

export class PostItemHeader extends Component {
  static propTypes = {
    name: PropTypes.string,
    username: PropTypes.string,
    post: PropTypes.object.isRequired,
    showEdit: PropTypes.func.isRequired,
  };

  render() {
    const {showEdit, username, post} = this.props;
    let {name} = this.props;
    if (name === ' ') {
      name = "------"
    }
    const supplyIcon = post.post_type === 'supply';
    const demandIcon = post.post_type === 'demand';
    const postIcon = post.post_type === 'post';
    return (
      <div className="-item-headerPost">
        <div className="-item-titlePost">
          <span className={cx("", {'-viewDemand-icon': demandIcon})}>
            {
              ((postIcon) && <i className="fa fa-share-alt" aria-hidden="true"/>) ||
              ((supplyIcon) && <SupplyIcon height="22px"/>) ||
              ((demandIcon) && <DemandIcon height="22px"/>)
            }
          </span>
          <span className="mr-2">{name}</span>
          <span className="mr-2 -green2">{username}</span>
          <Moment className="mr-3 -green2" element="span" fromNow ago>{post.created_time}</Moment>
          <span className="mr-1 -green2"> پیش</span>
        </div>
        <div className="-item-edit-btnPost">
          <div onClick={showEdit}>{editIcon}</div>
        </div>
      </div>
    )
  }
}

export class PostBody extends Component {
  static propTypes = {
    description: PropTypes.string
  };

  render() {
    return (
      <div className="-line-height">
        {this.props.description}
      </div>
    )
  }
}

export class PostFooter extends Component {
  static propTypes = {
    viewerCount: PropTypes.number.isRequired,
    addViewer: PropTypes.func.isRequired
  };

  render() {
    const {viewerCount, addViewer} = this.props;
    return (
      <div className="-item-footerPost">
        <div>
          <span className="ml-1">{viewerCount}</span>
          <i className="fa fa-eye" aria-hidden="true"/>
        </div>
        <div>
          <span className="ml-1">\</span>
          <i className="fa fa-share" aria-hidden="true"/>
        </div>
        <span>
          <i className="fa fa-ellipsis-h cursor-pointer" aria-hidden="true" onClick={addViewer}/>
        </span>
      </div>
    )
  }
}

export class PostView extends Component {
  static propTypes = {
    showEdit: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    postIdentityMediaId: PropTypes.number,
    postIdentityUsername: PropTypes.string.isRequired,
    postIdentityName: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {viewerCount: 0, postIdentity_File: null, isLoading: false, error: false}
  }

  _getViewerCount = () => {
    const postId = this.props.post.id;
    this.setState({...this.state, isLoading: true}, () => (
      getPostViewerCount(postId, (res) => this.setState({...this.state, viewerCount: res, isLoading: false}))
    ));
  };

  _addViewer = (e) => {
    e.preventDefault();
    const postId = this.props.post.id;
    setPostViewer(postId, () => this._getViewerCount())
  };

  componentDidMount() {
    const mediaId = this.props.postIdentityMediaId;
    this._getViewerCount();
    if (mediaId) {
      getFile(mediaId, (res) => this.setState({...this.state, postIdentity_File: res.file}))
    }
  };

  render() {
    const {showEdit, post, postIdentityUsername, postIdentityName} = this.props;
    const {viewerCount, isLoading, error, postIdentity_File} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <PostItemWrapper>
          <div className="-img-col">
            <img className="-item-imgPost rounded-circle" src={postIdentity_File || defaultImg} alt=""/>
          </div>
          <div className="-content-col">
            <PostItemHeader
              name={postIdentityName}
              username={postIdentityUsername}
              post={post}
              showEdit={showEdit}
            />
            <PostBody description={post.post_description}/>
            <PostFooter postId={post.id} viewerCount={viewerCount} addViewer={this._addViewer}/>
          </div>
        </PostItemWrapper>
      </VerifyWrapper>
    )
  }
}
