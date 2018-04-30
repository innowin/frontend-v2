import React, {Component} from "react";
import PropTypes from "prop-types";
import "moment/locale/fa";
import Moment from "react-moment";
import {editIcon, defaultImg} from "src/images/icons";
import {VerifyWrapper} from "src/views/common/cards/Frames";
import {getFile} from "src/crud/media/media";
import {SupplyIcon, DemandIcon} from "src/images/icons";
import cx from 'classnames';
import {setPostViewer} from "src/crud/post/postViewerCount";


class PostItemHeader extends Component {
  static propTypes = {
    name: PropTypes.string,
    post: PropTypes.object.isRequired,
    postIdentityFile: PropTypes.string,
    showEdit: PropTypes.func.isRequired,
    description: PropTypes.string
  };

  render() {
    const {showEdit, post, postIdentityFile, description} = this.props;
    let {name} = this.props;
    if (name === ' ') {
      name = "------"
    }
    const supplyIcon = post.post_type === 'supply';
    const demandIcon = post.post_type === 'demand';
    const postIcon = post.post_type === 'post';
    //TODO : mohsen handle editIcon
    return (
      <div className="-headerBox">
        <div>
          <div>
            <img className="rounded-circle" src={postIdentityFile || defaultImg} alt=""/>
            <span className="mr-2">{name}</span>
          </div>
          <div>
            <Moment className="mr-3 -green2" element="span" fromNow ago>{post.created_time}</Moment>
            <span className="mr-1 -green2">پیش</span>
          </div>
          {/*<div onClick={showEdit} className="-item-edit-btnPost">{editIcon}</div>*/}
        </div>
        <div className={cx("mt-3", {'-viewDemand-icon': demandIcon})}>
          {
            ((postIcon) && <i className="fa fa-share-alt" aria-hidden="true"/>) ||
            ((supplyIcon) && <SupplyIcon height="22px"/>) ||
            ((demandIcon) && <DemandIcon height="22px"/>)
          }
          {
            ((postIcon) && <span>پست</span>) ||
            ((supplyIcon) && <span>عرضه:</span>) ||
            ((demandIcon) && <span>تقاضا:</span>)
          }
        </div>
        <div className="-line-height mt-3">
          {description}
        </div>
      </div>
    )
  }
}

class PostShare extends Component {
  static propTypes = {
    viewerCount: PropTypes.number.isRequired,
    addViewer: PropTypes.func.isRequired
  };

  render() {
    const {addViewer} = this.props;
    return (
      <div className="shareBox">
        <i className="fa fa-share-square-o"/>
        <i className="fa fa-ellipsis-h cursor-pointer" aria-hidden="true" onClick={addViewer}/>
      </div>
    )
  }
}

export class ExchangePostView extends Component {
  static propTypes = {
    showEdit: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    postIdentityMediaId: PropTypes.number,
    postIdentityName: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {viewerCount: 0, postIdentity_File: null, isLoading: false, error: false}
  }

  _addViewer = (e) => {
    e.preventDefault();
    const postId = this.props.post.id;
    setPostViewer(postId)
  };

  componentDidMount() {
    const mediaId = this.props.postIdentityMediaId;
    if (mediaId) {
      getFile(mediaId, (res) => this.setState({...this.state, postIdentity_File: res.file}))
    }
  };

  render() {
    const {showEdit, post, postIdentityName} = this.props;
    const {viewerCount, isLoading, error, postIdentity_File} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <div className="-exchangePostView">
          <PostItemHeader
            name={postIdentityName}
            post={post}
            postIdentityFile={postIdentity_File}
            showEdit={showEdit}
            description={post.post_description}
          />
          <PostShare postId={post.id} viewerCount={viewerCount} addViewer={this._addViewer}/>
        </div>
      </VerifyWrapper>
    )
  }
}

