/*global __*/
import React, {Component} from "react";
import PropTypes from "prop-types";
import {defaultImg} from "src/images/icons";
import {NEW_VIEW, GET_VIEWS_COUNT} from "src/consts/Events";
import {SOCKET as socket} from "src/consts/URLS";
import {TOKEN} from "src/consts/data";
import {VerifyWrapper} from "src/views/common/cards/Frames";
import {getFile} from "../../../../crud/media/media";
import {PostItemWrapper, PostItemHeader, PostFooter, PostBody} from "../../../user/posts/Views";

export class PostExchangeView extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    postUser_mediaId: PropTypes.string,
    postUser_username: PropTypes.string.isRequired,
    postUser_name: PropTypes.string.isRequired,
    showEdit: PropTypes.func.isRequired,
    // product:PropTypes.object.isRequired,
    // productPictures: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {viewerCount: 0, postUser_File:null, isLoading: false, error: false};
  }

  _getViewerCount = () => {
    const postId = this.props.post.id;
    const id = `post-${postId}`;
    const emitting = () => {
      const newState = {...this.state, isLoading: true};
      this.setState(newState);
      socket.emit(GET_VIEWS_COUNT, {
        id: id,
        result: `${postId}-_getViewerCount-PostViewExchangeView`
      });
    };
    emitting();
    socket.on(`${postId}-_getViewerCount-PostViewExchangeView`, (res) => {
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
        result: `${id}_addViewerResult-PostViewExchangeView`
      });
    };
    emitting();
    socket.on(`${id}_addViewerResult-PostViewExchangeView`, (res) => {
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
        this.setState({...this.state, postUser_File: res.file})
      };
      return getFile(mediaId, mediaResult)
    }
  };

  componentDidMount() {
    this._getViewerCount();
    this._getFile(this.props.postUser_mediaId);
  };

  render() {
    const {showEdit, post, postUser_username, postUser_name, product} = this.props;
    const {viewerCount, isLoading, error, postUser_File} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <PostItemWrapper>
          <div className="-img-col">
            <img className="-item-imgPost rounded-circle" src={postUser_File || defaultImg} alt=""/>
          </div>
          <div className="-content-col">
            <PostItemHeader
              name={postUser_name}
              username={postUser_username}
              post={post}
              showEdit={showEdit}
            />
            <PostBody description={post.post_description}/>
            {/*<ProductContainer productId={post.post_product}/>*/}
            <PostFooter postId={post.id} viewerCount={viewerCount} addViewer={this._addViewer}/>
          </div>
        </PostItemWrapper>
      </VerifyWrapper>
    )
  }
}
