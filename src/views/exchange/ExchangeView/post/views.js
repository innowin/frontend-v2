import React, {Component} from "react"
import PropTypes from "prop-types"
import "moment/locale/fa"
import Moment from "react-moment"
import {DefaultUserIcon, ForwardIcon, SeeViewIcon, SupplyIcon, DemandIcon} from "src/images/icons"
import {VerifyWrapper} from "src/views/common/cards/Frames"
import {getFile} from "src/crud/media/media"
import cx from 'classnames'
import {setPostViewer} from "src/crud/post/postViewerCount"
import {getCommentsByParent} from "../../../../crud/comment"
import {getIdentity} from "../../../../crud/identity"
import {getOrganization} from "../../../../crud/organization/organization"
import {getUser} from "../../../../crud/user/user"
import {Product} from "src/views/product/ProductExplorerContent"
import {getProduct} from "../../../../crud/product/product"
import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {REST_REQUEST} from "src/consts/Events"
import {TOKEN} from 'src/consts/data'

class PostItemHeader extends Component {
  static propTypes = {
    name: PropTypes.string,
    post: PropTypes.object.isRequired,
    postIdentityFile: PropTypes.string,
  }

  render() {
    const {post, postIdentityFile} = this.props
    let {name} = this.props
    if (name === ' ') {
      name = "------"
    }
    const supplyIcon = post.post_type === 'supply'
    const demandIcon = post.post_type === 'demand'
    const postIcon = post.post_type === 'post'
    //TODO : mohsen handle EditIcon
    return (
      <div className="postHeaderBox">
        <div>
          <div>
            {
              (!postIdentityFile)?(<DefaultUserIcon className="default-icon"/>):(
                <img className="rounded-circle" src={postIdentityFile} alt=""/>)
            }
            <span className="mr-3">{name}</span>
          </div>
          <div>
            <Moment className="mr-3" element="span" fromNow ago>{post.created_time}</Moment>
            <span className="mr-1">پیش</span>
          </div>
        </div>
        <div className="mt-3 d-flex flex-row">
          {
            ((postIcon) && <i className="fa fa-share-alt ml-2 pt-1" aria-hidden="true"/>) ||
            ((supplyIcon) && <SupplyIcon height="22px" className="ml-2 supplyPad svgIcon"/>) ||
            ((demandIcon) && <DemandIcon height="24px" className="ml-2 svgIcon"/>)
          }
          {
            ((postIcon) && <span>پست</span>) ||
            ((supplyIcon) && <div><span>عرضه: </span>{post.post_title}</div>) ||
            ((demandIcon) && <div><span>تقاضا: </span>{post.post_title}</div>)
          }
        </div>
      </div>
    )
  }
}

class PostContent extends Component {

  static propTypes = {
    viewerCount: PropTypes.number.isRequired,
    addViewer: PropTypes.func.isRequired,
    postFile: PropTypes.string,
    description: PropTypes.string,
    product: PropTypes.object,
  }

  render() {
    const {addViewer, description, postFile, product} = this.props
    return ( 
      <div className="postContentBox">
        <div className={cx("descriptionOfPost", {"mt-3": postFile})}>
          {description}
        </div>

        {
          (product) ? (
            <Product product={product}/>
          ) : (
            <img alt="" src={postFile}/>
          )
        }
        
        <div className="menuOfPost d-flex flex-row justify-content-between mt-2">
          <SeeViewIcon height="15px" className="cursor-pointer" onClick={addViewer}/>
          <i className="fa fa-ellipsis-h cursor-pointer" aria-hidden="true"/>
        </div>
      </div>
    )
  }
}

class PostFooter extends Component {
  static propTypes = {
    lastCommentSenderName: PropTypes.string,
    lastCommentText: PropTypes.string,
    commentsCount: PropTypes.number.isRequired
  }

  render() {
    const {lastCommentSenderName, lastCommentText, commentsCount} = this.props
    return (
      <div className="postFooterBox">
        <div>
          <span className="ml-2">{commentsCount}</span>
          <ForwardIcon height="15px" className="mr-1"/>
        </div>
        {/* <div className="lastComment">
          {
            (lastCommentSenderName) ? (
              <span>{lastCommentSenderName + ": " + lastCommentText}</span>
            ) : (<span>بدون نظر</span>)
          }
        </div> */}
      </div>
    )
  }
}

class PostComment extends Component{
  constructor(props){
    super(props)
    this.state={sender:{}}
  }

  componentDidMount(){
    let {comment_sender} = this.props.comment
    this.setState({...this.state, isLoading:true, error:false})
    this._getCommentSender(comment_sender).then(res=>{
      this.setState({...this.state, sender:res, error:res, isLoading:false})
    }).catch(err=>{
      this.setState({...this.state, error:false, isLoading:false})
    })
  }

  _getCommentSender(senderId){
    return new Promise((resolve, reject)=>{
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/users/${senderId}`,
          result: `get-comment-sender/${senderId}`,
          token: TOKEN,
        }
      )
      socket.on(`get-comment-sender/${senderId}`,(res)=>{
        socket.off(`get-comment-sender/${senderId}`)
        if(res.detail){
          reject(res.detail)
        }else{
          resolve(res)
        }
      })
    })
  }

  render(){
    let {sender} = this.state
    let {comment} = this.props
    return (
      <div>
        <div className="-exchange-post-comment-title">
          <div className="-comment-sender-name">
            {sender.first_name ?sender.first_name + ' '+ sender.last_name : "----"}
          </div>
          <div className="-comment-sender-username">
            {sender.username}@
          </div>
          <div className="-comment-date">
            <Moment className="mr-3" element="span" fromNow ago>{comment.created_time}</Moment>
            <span className="mr-1">پیش</span>
            
          </div>
        </div>
        <div className="-exchange-post-comment-text">
          {comment.text}
        </div>
      </div>
    )
  }
}

class PostComments extends Component{
  static propTypes = {
    comments: PropTypes.array.isRequired,
  }

  render(){
    let commentsView = this.props.comments.map((val,index)=>{
      return <PostComment
        comment = {val}
        key = {index}
      />
    })
    return (
    <div className="exchangePostComments">
      {commentsView}
    </div>
    )
  }
}

export class ExchangePostView extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    postIdentityMediaId: PropTypes.number,
    postIdentityName: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      viewerCount: 0,
      postIdentity_File: null,
      postFile: null,
      product: null,
      postComments: [],
      lastCommentSenderName: '',
      lastCommentText: '',
      commentsCount: 0,
      isLoading: false,
      error: false
    }
  }

  _addViewer = (e) => {
    e.preventDefault()
    const postId = this.props.post.id
    setPostViewer(postId)
  }

  _getLastComment = (postComments) => {
    if (postComments.length > 0) {
      const handleResult = (identity) => {
        const userId = identity.identity_user
        const organId = identity.identity_organization
        if (userId) {
          getUser(userId, (res) =>
            this.setState({
              ...this.state,
              lastCommentSenderName: res.first_name + ' ' + res.last_name,
              lastCommentText: postComments[0].text,
              isLoading: false
            }))
        }
        if (organId) {
          getOrganization(organId, (res) => {
            this.setState({
              ...this.state,
              lastCommentSenderName: res.nike_name || res.official_name,
              lastCommentText: postComments[0].text,
              isLoading: false
            })
          })
        }
      }
      getIdentity(postComments[0].comment_sender, handleResult)
    } else {
      this.setState({...this.state, isLoading: false})
    }
  }

  componentDidMount() {
    const {postIdentityMediaId, post} = this.props
    if (postIdentityMediaId) {
      getFile(postIdentityMediaId, (res) => this.setState({...this.state, postIdentity_File: res.file}))
    }
    if (post.post_picture) {
      getFile(post.post_picture, (res) => this.setState({...this.state, postFile: res.file}))
    }
    if (post.post_related_product) {
      this.setState({...this.state, isLoading: true}, () =>
        getProduct(post.post_related_product, (res) => this.setState({...this.state, product: res, isLoading: false}))
      )
    }
    this.setState({...this.state, isLoading: true}, () =>
      getCommentsByParent(post.id, (res) => {
        this.setState({...this.state, postComments: res, commentsCount: res.length}, () => this._getLastComment(res))
      })
    )
  }

  render() {
    const {post, postIdentityName, comments} = this.props
    const {viewerCount, isLoading, error, postIdentity_File, postFile, lastCommentSenderName, lastCommentText, commentsCount, product} = this.state
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <div className="-exchangePostView">
          <PostItemHeader
            name={postIdentityName}
            post={post}
            postIdentityFile={postIdentity_File}
          />
          <PostContent postId={post.id}
                       viewerCount={viewerCount}
                       addViewer={this._addViewer}
                       description={post.post_description}
                       postFile={postFile}
                       product={product}
          />
          <PostFooter lastCommentSenderName={lastCommentSenderName}
                      lastCommentText={lastCommentText}
                      commentsCount={commentsCount}
          />
          <PostComments
            comments={comments}
          />
        </div>
      </VerifyWrapper>
    )
  }
}

