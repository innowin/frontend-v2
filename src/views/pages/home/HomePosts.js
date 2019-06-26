import * as React from 'react'
import {PureComponent} from 'react'
import constant from 'src/consts/constants'
import CreatePostNew from 'src/views/common/post/createPost/index'
import NewRightArrowSvg from 'src/images/common/new_right_arrow'
import PostActions from 'src/redux/actions/commonActions/postActions'
import * as PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {exchangePostsSelector} from 'src/redux/selectors/home/homePosts'
import isExchangeMember from 'src/helpers/isExchangeMember'
import {FrameCard, ListGroup} from 'src/views/common/cards/Frames'
import {Link} from 'react-router-dom'
import {Post} from 'src/views/common/post/Post'
import {RightArrow, DesertIcon, EditIcon, ChannelIcon} from 'src/images/icons'
import {BarLoader} from 'react-spinners'

class HomePosts extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    exchangeId: PropTypes.number,
    unSetExchangeId: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      activeScrollHeight: 0,
      offset: 10,
      scrollButton: false,
      showCreatePostSmall: false,
      hideTopBar: false,
      averageColor: [37, 53, 69],
    }
  }

  componentDidMount() {
    const {actions, exchangeId} = this.props
    const {filterPostsByPostParentLimitOffset} = actions
    if (exchangeId) {
      filterPostsByPostParentLimitOffset({postParentId: exchangeId, postType: null, limit: 10, offset: 0, postParentType: constant.POST_PARENT.EXCHANGE})
    }
  }

  componentWillReceiveProps(nextProps) {
    const {actions, exchangeId} = nextProps
    if (exchangeId && exchangeId !== this.props.exchangeId) {
      setTimeout(() => {
        this.setState({...this.state, activeScrollHeight: 0, offset: 10}, () => {
          const {filterPostsByPostParentLimitOffset} = actions
          filterPostsByPostParentLimitOffset({
            postParentId: exchangeId, postType: null, limit: 10, offset: 0, postParentType: constant.POST_PARENT.EXCHANGE,
          })
        })
      }, 500)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll)
  }

  onScroll = () => {
    if (Object.values(this.props.posts).length > 0) {
      const {offset} = this.state
      const {exchangeId, actions} = this.props
      const {filterPostsByPostParentLimitOffset} = actions
      const {activeScrollHeight} = this.state
      const scrollHeight = document.body ? document.body.scrollHeight : 0
      if (((window.innerHeight + window.scrollY) >= (scrollHeight - 250)) && (scrollHeight > activeScrollHeight)) {
        this.setState({...this.state, activeScrollHeight: scrollHeight, offset: offset + 10},
            () => {
              filterPostsByPostParentLimitOffset({
                postParentId: exchangeId,
                postType: null,
                postParentType: constant.POST_PARENT.EXCHANGE,
                limit: 10,
                offset: offset,
              })
            },
        )
      }
    }

    if (document.body.clientWidth <= 480) {
      if (window.scrollY > this.state.scrollY) this.setState({...this.state, hideTopBar: true, scrollY: window.scrollY})
      else this.setState({...this.state, hideTopBar: false, scrollY: window.scrollY})
      if (window.scrollY > 1000) this.setState({...this.state, scrollButton: true})
      else this.setState({...this.state, scrollButton: false})
    }
    else {
      if (window.scrollY > 400) this.setState({...this.state, scrollButton: true})
      else this.setState({...this.state, scrollButton: false})
    }
  }

  goUp = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }

  _showCreatePostSmall = () => {
    let {exchangePage} = this.props
    this.setState({...this.state, showCreatePostSmall: true}, exchangePage && window.scroll({
      top: 350,
      behavior: 'smooth',
    }))
  }

  _hideCreatePostSmall = () => {
    this.setState({...this.state, showCreatePostSmall: false})
  }

  render() {
    const {showCreatePostSmall, hideTopBar, averageColor} = this.state
    const {actions, className, exchangeId, posts, selectedExchange, unSetExchangeId, exchangePage, isLoading, identityMemberships, exchangeMemberships} = this.props
    const {deletePost, updatePost} = actions

    return (
        <div className={className}>
          {exchangeId &&
          <React.Fragment>
            {showCreatePostSmall
                ? <CreatePostNew
                    postParentId={exchangeId}
                    postParentType={constant.POST_PARENT.EXCHANGE}
                    postsCountInThisPage={posts.length}
                    className='create-post-small'
                    hideCreatePost={this._hideCreatePostSmall}
                />
                : <div>
                  {
                    exchangePage ?
                        isExchangeMember({exchangeId, identityMemberships, exchangeMemberships}) ?
                            <CreatePostNew
                                postParentId={exchangeId}
                                postParentType={constant.POST_PARENT.EXCHANGE}
                                postsCountInThisPage={posts.length}
                            /> : <div style={{marginBottom: '1.75%'}}/>
                        : <CreatePostNew
                            postParentId={exchangeId}
                            postParentType={constant.POST_PARENT.EXCHANGE}
                            postsCountInThisPage={posts.length}
                        />
                  }
                  <div style={{background: `rgba(${averageColor[0]}, ${averageColor[1]}, ${averageColor[2]})`}}
                       className={hideTopBar ? 'top-bar-entity show top-bar-entity-top' : 'top-bar-entity show'}>
                    <NewRightArrowSvg onClick={unSetExchangeId} className='back-button'/>
                    <Link to={'/exchange/' + exchangeId} className='profile-top-bar'>
                      {selectedExchange && selectedExchange.exchange_image
                          ?
                          <React.Fragment>
                            <img ref={e => this.headerImg = e} src={selectedExchange.exchange_image.file} alt='profile' className='profile-top-bar'/>
                            <canvas ref={e => this.headerCanvas = e} width={'auto'} height={'auto'} style={{display: 'none'}}>مرورگر شما این ویژگی
                              را پشتیبانی نمیکند
                            </canvas>
                          </React.Fragment>
                          : <ChannelIcon className='profile-top-bar default-profile-organ'/>
                      }
                    </Link>
                    <span className='organ-name'>
                          {selectedExchange && selectedExchange.name}
                        </span>
                  </div>

                  <FrameCard className={exchangePage ? '-frameCardPostEx border-top-0' : '-frameCardPost border-top-0'}>
                    <div className={isLoading === true ? 'home-posts-loading' : 'home-posts-loading home-posts-loading-hide'}>
                      <BarLoader color={'#d8d9dc'} size={50}/>
                    </div>
                    <ListGroup>
                      {
                        posts.length > 0 ? posts.map((post) => post &&
                            <Post
                                posts={posts}
                                post={post}
                                key={post.id}
                                deletePost={deletePost}
                                updatePost={updatePost}
                            />,
                            ) :
                            isLoading === false &&
                            <div className="empty-posts">
                              <DesertIcon width="100%" text="پستی بارگذاری نشده"/>
                            </div>
                      }
                    </ListGroup>
                  </FrameCard>
                  <div className={this.state.scrollButton ? 'go-up-logo-cont' : 'go-up-logo-cont-hide'} onClick={this.goUp}>
                    <RightArrow className='go-up-logo'/>
                  </div>

                  {
                    window.innerWidth <= 480 &&
                    <div className={this.state.scrollButton ? 'write-post-hide' : 'write-post'}
                         onClick={this._showCreatePostSmall}>
                      <EditIcon className='write-post-logo'/>
                    </div>
                  }
                </div>
            }
          </React.Fragment>
          }
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const exchangeId = ownProps.exchangeId
  const allExchange = state.exchanges.list
  const identityId = state.auth.client.identity.content
  const isLoading = (exchangeId && allExchange[exchangeId] && allExchange[exchangeId].posts && allExchange[exchangeId].posts.isLoading)
  return {
    posts: exchangePostsSelector(state, ownProps),
    isLoading,
    selectedExchange: allExchange[exchangeId],
    identityId,
    identityMemberships: state.identities.list[identityId] && state.identities.list[identityId].exchangeMemberships && state.identities.list[identityId].exchangeMemberships.content,
    exchangeMemberships: state.common.exchangeMembership.list,
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    filterPostsByPostParentLimitOffset: PostActions.filterPostsByPostParentLimitOffset,
    updatePost: PostActions.updatePost,
    deletePost: PostActions.deletePost,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(HomePosts)