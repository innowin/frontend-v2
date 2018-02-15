import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {editIcon, defaultImg} from "src/images/icons";


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
    postType: PropTypes.object.isRequired,
    showEdit: PropTypes.func.isRequired,
  };

  render() {
    const {name, showEdit, username, postType} = this.props;
    return (
      <div className="-item-headerPost">
        <div className="-item-titlePost">
          <span>
            {
              ((postType === "post") && <i className="fa fa-share-alt" aria-hidden="true"></i>) ||
              ((postType === "supply") && <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>) ||
              ((postType === "demand") && <i className="fa fa-shopping-cart" aria-hidden="true"></i>)
            }
          </span>
          <span className="mr-2">{name}</span>
          <span className="mr-2 -green2">{username}</span>
          {/*TODO mohsen: moment time below*/}
          <span className="mr-3 -green2">{"۴۱ دقیقه پیش"}</span>
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
  description : PropTypes.string.isRequired
  };

  render(){
    return(
      <div className="-line-height">
        {this.props.description}
      </div>
    )
  }
}

export class PostFooter extends Component {
  static propTypes = {
    postViewerNumber : PropTypes.number.isRequired
  };

  render(){
    return(
      <div className="-item-footerPost">
        <div>
          <span className="ml-1">{this.props.postViewerNumber}</span>
          <i class="fa fa-eye" aria-hidden="true"></i>
        </div>
        <div>
          <span className="ml-1">\</span>
          <i class="fa fa-share" aria-hidden="true"></i>
        </div>
        <div>
          <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
        </div>
      </div>
    )
  }
}

export class PostView extends Component {
  static propTypes = {
    showEdit: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    organization: PropTypes.object.isRequired,
  };

  render() {
    const {showEdit, post, organization} = this.props; 
    return (
      <PostItemWrapper>
        <div className="-img-col">
          {/*// TODO mohsen: handle src of img*/}
          <img className="-item-imgPost" src={organization.organization_logo || defaultImg}/>
        </div>
        <div className="-content-col">
          <PostItemHeader
            name={organization.official_name}
            username={organization.username}
            postType={post.post_type}
            showEdit={showEdit}
          />
          <PostBody description={post.post_description}/>
          {/*TODO mohsen: handle viewerNumber of post*/}
          <PostFooter postViewerNumber={10}/>
        </div>

      </PostItemWrapper>
    )
  }
}
