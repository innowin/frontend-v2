/*global __*/
import React, {Component} from "react"
import PropTypes from 'prop-types'
import {getExchangePosts} from 'src/crud/exchange/post'
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {PostItemWrapper, PostView} from "./Views"
import {REST_REQUEST} from "src/consts/Events"
import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {TOKEN} from "src/consts/data"
import {ID} from "../../../consts/data";
import Masonry from 'react-masonry-component';

export class Post extends Component {

  static propTypes = {
    posts: PropTypes.array.isRequired,
    post: PropTypes.object.isRequired,
    updatePosts: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {edit: false, error: false, isLoading: false, user:{},productPictures:[], product:{}, profile:{}, post: this.props.post||{} };
  }

  _showEdit = () => {
    this.setState({edit: true});
  };

  _hideEdit = () => {
    this.setState({edit: false});
  };

  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error});
  };


  componentDidMount() {
    // TODO mohsen: handle get userId or organId from post

    // const {userId} = this.props;
    const userId = ID;
    const {post} = this.props;
    const emitting = () => {
      const newState = {...this.state, isLoading: true};
      this.setState(newState);
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/base/posts/${post.post_product}/`,
          result: `post-Product-get/${post.post_product}`,
          token: TOKEN
        }
      );
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/users/${userId}/`,
          result: `user-Posts-get/${userId}`,
          token: TOKEN
        }
      );
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/users/profiles/?profile_user=${userId}`,
          result: `profileUser-Posts-get/${userId}`,
          token: TOKEN
        }
      );
    };

    emitting();

    socket.on(`user-Posts-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, user: res, isLoading: false};
        this.setState(newState);
      }
    });

    socket.on(`post-Product-get/${post.post_product}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, product: res, isLoading: false};
        this.setState(newState)
        this.getProductPictures(post.post_product);
      }
    });

    socket.on(`profileUser-Posts-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, profile: res[0], isLoading: false};
        this.setState(newState);
      }
    });

  }

  getProductPictures(productId){
    socket.emit(REST_REQUEST,
      {
        method: "get",
        url: `${url}/products/pictures/?picture_product=${productId}`,
        result: `product-pictures-get/${productId}`,
        token: TOKEN
      }
    );

    socket.on(`product-pictures-get/${productId}`,(res)=>{
      if(res.detail){
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState)
      }else {
        const newState = {...this.state, productPictures: res, isLoading: false};
        this.setState(newState);
      }
    })
  }

  componentWillUnmount() {
    const {userId} = this.props;
    // TODO mohsen: complete by socket.off of update and delete requests
    socket.off(`user-Posts-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, user: res, isLoading: false};
        this.setState(newState);
      }

    });

    socket.off(`profileUser-Posts-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, profile: res[0], isLoading: false};
        this.setState(newState);
      }
    });

  }

  render() {
    const {post, isLoading, error, user, profile, product, productPictures} = this.state;
    return (
        <PostView post={post} user={user} profile={profile}/>
    )
  }
}

class Posts extends Component {

  constructor(props) {
    super(props);
    this.state = {createForm: false, edit: false, isLoading: false, error: null, posts: [], user: {}, profile: {}};
  }

  _showCreateForm = () => {
    this.setState({createForm: true});
  };

  _hideCreateForm = () => {
    this.setState({createForm: false});
  };


  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error});
  };

  _getExchangePosts = (exchangeId) => {
    this.setState({...this.state, isLoading: true});
    getExchangePosts(exchangeId ,(res)=>{
      this.setState({...this.state,posts:res,isLoading:false })
    })
  };

  componentDidMount() {
    this._getExchangePosts(this.props.exchangeId);
  };

  componentWillUnmount() {
    const {exchangeId} = this.props;
    // TODO mohsen: complete by socket.off of update and delete requests
    socket.off(`exchangePosts-Posts-get/${exchangeId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, posts: res, isLoading: false};
        this.setState(newState);
      }
    });
  }

  render() {
    const {createForm, isLoading, error} = this.state;
    const posts = [...new Set(this.state.posts)];
    
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <CategoryTitle
          title={__('Post')}
          showCreateForm={this._showCreateForm}
          createForm={createForm}
        />
        <FrameCard className="-frameCardPost">
          <ListGroup>
              {
                posts.map((post) => (
                  <Post
                    posts={posts}
                    post={post}
                    updatePosts={this._updatePosts}
                    key={post.id}
                  />
                ))
              }
            </ListGroup>
        </FrameCard>
      </VerifyWrapper>
    )
  }
}

export default Posts;