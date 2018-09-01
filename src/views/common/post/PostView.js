import React, {Component} from "react";
import PropTypes from "prop-types";
import "moment/locale/fa";
import Moment from "react-moment";
import {EditIcon, DefaultUserIcon} from "src/images/icons";
import {VerifyWrapper} from "src/views/common/cards/Frames";
import {SupplyIcon, DemandIcon} from "src/images/icons";
import {getPostViewerCount, setPostViewer} from "src/crud/post/postViewerCount";

export class PostView extends Component {
  static propTypes = {
    showEdit: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    postIdentityImg: PropTypes.string,
    postIdentityUsername: PropTypes.string.isRequired,
    postIdentityName: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {viewerCount: 0, isLoading: false, error: false}
  }

  _getViewerCount = () => {
    const postId = this.props.post.id;
    this.setState({...this.state, isLoading: true}, () => (
        getPostViewerCount(postId, (res) => this.setState({...this.state, viewerCount: res, isLoading: false}))
    ))
  }

  _addViewer = (e) => {
    e.preventDefault();
    const postId = this.props.post.id;
    setPostViewer(postId, () => this._getViewerCount())
  };

  componentDidMount() {
    this._getViewerCount();
  };

  render() {
    const {showEdit, post, postIdentityUsername, postIdentityImg} = this.props;
    const {viewerCount, isLoading, error} = this.state;

    let {postIdentityName} = this.props;
    if (postIdentityName === ' ') {
      postIdentityName = "------"
    }
    const supplyIcon = post.post_type === 'supply';
    const demandIcon = post.post_type === 'demand';
    const postIcon = post.post_type === 'post';

    return (
        <VerifyWrapper isLoading={isLoading} error={error}>
          <div className="-itemWrapperPost">
            <div className="-img-col">
              {
                (!postIdentityImg) ? (<DefaultUserIcon/>) : (
                    <img className="rounded-circle" src={postIdentityImg} alt=""/>)
              }
            </div>
            <div className="-content-col">
              <div className="-item-headerPost">
                <div className="-item-titlePost">
                  <span>
                    {
                      ((postIcon) && <i className="fa fa-share-alt" aria-hidden="true"/>) ||
                      ((supplyIcon) && <SupplyIcon height="22px"/>) ||
                      ((demandIcon) && <DemandIcon height="24px"/>)
                    }
                  </span>
                  <span className="mr-2">{postIdentityName}</span>
                  <span className="mr-2 -green2">{postIdentityUsername}</span>
                  <Moment className="mr-3 -green2" element="span" fromNow ago>{post.created_time}</Moment>
                  <span className="mr-1 -green2"> پیش</span>
                </div>
                <div onClick={showEdit} className="-item-edit-btnPost"><EditIcon/></div>
              </div>

              <div className="-line-height">
                {post.post_description}
              </div>

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
                  <i className="fa fa-ellipsis-h cursor-pointer" aria-hidden="true" onClick={this._addViewer}/>
                </span>
              </div>
            </div>
          </div>
        </VerifyWrapper>
    )
  }
}
