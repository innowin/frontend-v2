import React, {Component} from "react";
import PropTypes from "prop-types";
import "moment/locale/fa";
import Moment from "react-moment";
import {editIcon, defaultImg} from "src/images/icons";
import {NEW_VIEW, GET_VIEWS_COUNT} from "src/consts/Events";
import {SOCKET as socket} from "src/consts/URLS";
import {TOKEN} from "src/consts/data";
import {VerifyWrapper} from "src/views/common/cards/Frames";
import {getFile} from "../../../crud/media/media";


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
    username: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    showEdit: PropTypes.func.isRequired,
  };

  render() {
    const {name, showEdit, username, post} = this.props;
    return (
      <div className="-item-headerPost">
        <div className="-item-titlePost">
          <span>
            {
              ((post.post_type === "post") && <i class="fa fa-share-alt" aria-hidden="true"></i>) ||
              ((post.post_type === "supply") && <i class="fa fa-cart-arrow-down" aria-hidden="true"></i>) ||
              ((post.post_type === "demand") && <i class="fa fa-shopping-cart" aria-hidden="true"></i>)
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
    description: PropTypes.string.isRequired
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
          <i class="fa fa-eye" aria-hidden="true"></i>
        </div>
        <div>
          <span className="ml-1">\</span>
          <i class="fa fa-share" aria-hidden="true"></i>
        </div>
        <span>
          <a href="#" onClick={addViewer}><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
        </span>
      </div>
    )
  }
}

export class PostView extends Component {
  static propTypes = {
    showEdit: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {viewerCount: 0, isLoading: false, error: false, profile_media_File:null};
    this._addViewer = this._addViewer.bind(this);
  }

  _getViewerCount = () => {
    const postId = this.props.post.id;
    const id = `post-${postId}`;
    const emitting = () => {
      const newState = {...this.state, isLoading: true};
      this.setState(newState);
      socket.emit(GET_VIEWS_COUNT, {
        id: id,
        result: `${postId}-_getViewerCount`
      });
    };
    emitting();
    socket.on(`${postId}-_getViewerCount`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, viewerCount: res, isLoading: false};
        this.setState(newState);
      }
    })
  };

  _addViewer = (e) => {
    e.preventDefault();
    const postId = this.props.post.id;
    const id = `post-${postId}`;
    const emitting = () => {
      const newState = {...this.state, isLoading: true};
      this.setState(newState);
      socket.emit(NEW_VIEW, {
        id: id,
        token: TOKEN,
        result: "_addViewer-result"
      });
    };
    emitting();
    socket.on("_addViewer-result", (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, isLoading: false};
        this.setState(newState)
      }
    });

    this._getViewerCount()
  };

  _getFile = (mediaId) => {
    if (mediaId) {
      const mediaResult = (res) => {
        this.setState({...this.state, profile_media_File: res.file})
      };
      return getFile(mediaId, mediaResult)
    }
  };

  componentDidMount() {
    this._getViewerCount();
    this._getFile(this.props.profile.profile_media);
  };

  componentWillUnmount() {
    const postId = this.props.post.id;
    socket.off(`${postId}-_getViewerCount`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, viewerCount: res, isLoading: false};
        this.setState(newState);
      }
    });
    socket.off("_addViewer-result", (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, isLoading: false};
        this.setState(newState)
      }
    });
  }

  render() {
    const {showEdit, post, user, profile_media_File, isLoading, error} = this.props;
    const {viewerCount} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <PostItemWrapper>
          <div className="-img-col">
            {/*// TODO mohsen: handle src of img*/}
            <img className="-item-imgPost rounded-circle" src={profile_media_File || defaultImg} alt=""/>
          </div>
          <div className="-content-col">
            <PostItemHeader
              name={user.first_name + " " + user.last_name}
              username={user.username}
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
