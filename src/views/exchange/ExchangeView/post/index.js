/*global __*/
import React, {Component} from "react"
import PropTypes from 'prop-types'
import {getExchangePosts} from 'src/crud/post/exchangePost'
import {VerifyWrapper} from "src/views/common/cards/Frames"
import HomeCreatePost from "../../../pages/home/CreatPostHome"
import {SupplyIcon, DemandIcon, NoFilterIcon} from "../../../../images/icons"
import {deletePost, updatePost} from "src/crud/post/post"
import {getProfile} from "../../../../crud/user/profile"
import {getPost} from '../../../../crud/post/post'
import {getUser} from "../../../../crud/user/user"
import {getIdentity} from "../../../../crud/identity"
import {getOrganization} from "../../../../crud/organization/organization"
import {getProduct} from '../../../../crud/product/product'
import {getExchangePostComment} from '../../../../crud/exchange/exchange'
import {PostEditForm} from "src/views/common/post/Forms"
import {ExchangePostView} from "./views"
import Masonry from "react-masonry-css"
import cx from 'classnames' 
import {PostItemWrapper} from "../../../common/post/View"
import {IDENTITY_ID} from "../../../../consts/data"

export class ExchangePost extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired,
    updatePosts: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      post: {},
      postIdentity_name: '',
      postIdentity_mediaId: null,
      productPictures: [],
      product: {},
      edit: false,
      error: false,
      isLoading: true,
      comments:[]
    };
  }

  _hideEdit = () => {
    this.setState({edit: false});
  };

  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error});
  };

  _updateView = (res) => {
    this.setState({...this.state, post: res})
  };

  _update = (formValues, postId) => {
    this.setState({...this.state, isLoading: true}, () =>
      updatePost(formValues, postId, this._updateView, this._hideEdit, this._handleErrorLoading));
  };

  _delete = () => {
    this.setState({...this.state, isLoading: true}, () =>
      deletePost(this.props.posts, this.props.post, this.props.updatePosts, this._hideEdit, this._handleErrorLoading))
  };

  _getIdentityDetails = (post_identity) => {
    const handleResult = (identity) => {
      const userId = identity.identity_user;
      const organId = identity.identity_organization;
      if (userId) {
        getUser(userId, (res) =>
          this.setState({
              ...this.state,
              postIdentity_name: res.first_name + ' ' + res.last_name
            }
          ));
        getProfile(userId, (res) => {
          this.setState({
            ...this.state,
            postIdentity_mediaId: res.profile_media,
            isLoading: false
          })
        });
      }
      if (organId) {
        getOrganization(organId, (res) => {
          this.setState({
            ...this.state,
            postIdentity_name: res.nike_name || res.official_name,
            postIdentity_mediaId: res.organization_logo,
            isLoading: false
          })
        });
      }
    };
    getIdentity(post_identity, handleResult)
  };

  componentDidMount() {
    const {postId, exchangeId} = this.props.match.params;
    this.setState({isLoading:true, error:null});
    
    getPost(postId).then(post=>{
      this.setState({...this.state,post:post})
      this._getIdentityDetails(post.post_identity);

      getExchangePostComment(post.id).then(comments=>{
        this.setState({...this.state, comments:comments, isLoading:false})
      }).catch(err=>{
        this.setState({...this.state, isLoading:false, error:err})
      })
      
    }).catch(err=>{
      this.setState({isLoading:false, error:err});
    })
    
  }
 
  render() {
    const {post, postIdentity_name, postIdentity_mediaId, edit, comments, isLoading, error} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        {edit ?
          <PostItemWrapper>
            <PostEditForm
              post={post}
              hideEdit={this._hideEdit}
              deleteFunc={this._delete}
              updateFunc={this._update}
            />
          </PostItemWrapper>
          :
          <ExchangePostView post={post}
            comments={comments}
            postIdentityName={postIdentity_name}
            postIdentityMediaId={postIdentity_mediaId}
          />
        }
      </VerifyWrapper>
    )
  }
}

export default ExchangePost;