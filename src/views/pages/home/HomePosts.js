import * as React from 'react'
import constant from 'src/consts/constants'
import CreatePostNew from 'src/views/common/post/createPost/index'
import NewRightArrowSvg from 'src/images/common/new_right_arrow'
import PostActions from 'src/redux/actions/commonActions/postActions'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {exchangePostsSelector} from 'src/redux/selectors/home/homePosts'
import {FrameCard, ListGroup, VerifyWrapper} from 'src/views/common/cards/Frames'
import {Link} from 'react-router-dom'
import {Post} from 'src/views/common/post/Post'
import {PureComponent} from 'react'
import {RightArrow, DesertIcon, EditIcon, ChannelIcon} from 'src/images/icons'
import {ClipLoader} from 'react-spinners'


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
      offset: 0,
      scrollButton: false,
      showCreatePostSmall: false,
      hideTopBar: false,
      averageColor: [37, 53, 69],
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', this._onScroll)
    const {actions, exchangeId} = this.props
    const {filterPostsByPostParentLimitOffset} = actions
    const limit = 100
    const offset = 0
    if (exchangeId) {
      filterPostsByPostParentLimitOffset({
        postParentId: exchangeId, postType: null, limit, offset, postParentType: constant.POST_PARENT.EXCHANGE,
      })
    }
  }

  componentDidUpdate(prevProps, prevState, ss) {
    const {actions, exchangeId} = this.props
    const {filterPostsByPostParentLimitOffset} = actions
    const limit = 100
    const offset = 0
    if (exchangeId && exchangeId !== prevProps.exchangeId) {
      filterPostsByPostParentLimitOffset({
        postParentId: exchangeId, postType: null, limit, offset, postParentType: constant.POST_PARENT.EXCHANGE,
      })
    }
    if (this.headerImg && this.headerCanvas && exchangeId && prevProps.exchangeId !== exchangeId) {
      this.headerImg.onload = () => {
        console.log('Header Img Loaded')
        let can = this.headerCanvas
        let canCtx = can.getContext('2d')
        let img = this.headerImg
        let imgRect = img.getBoundingClientRect()
        let newImg = new Image()
        newImg.src = img.src
        let imageData
        newImg.onload = (e) => {
          can.width = e.path[0].width
          can.height = e.path[0].height
          canCtx.drawImage(img, 0, 0)
          try {
            console.log('Header Img Data Success')
            imageData = canCtx.getImageData(0, 0, imgRect.width, imgRect.height)
            console.log(imageData.data)
          }
          catch (e) {
            console.log('Header Img Error Catch')
            console.log(e)
            imageData = {data: [37, 53, 69, 255]}
          }

          let rPlate = 0, gPlate = 0, bPlate = 0, counter = 0
          for (let i = 0; i < imageData.data.length + 4; i += 4) {
            if (imageData.data[i + 3] === 255) {
              counter++
              rPlate += imageData.data[i]
              gPlate += imageData.data[i + 1]
              bPlate += imageData.data[i + 2]
            }
          }
          rPlate = ~~(rPlate / counter)
          gPlate = ~~(gPlate / counter)
          bPlate = ~~(bPlate / counter)

          counter !== 0 ?
              this.setState({...this.state, averageColor: [rPlate, gPlate, bPlate]}) : this.setState({...this.state, averageColor: [37, 53, 69]})
        }
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onScroll)
  }

  _onScroll = () => {
    const {offset, activeScrollHeight} = this.state
    const {posts, exchangeId, filterPostsByPostParentLimitOffset} = this.props
    const limit = 100
    const scrollHeight = document.body.scrollHeight
    if (exchangeId
        && posts.length > (limit - 1)
        && (~~(window.innerHeight + window.scrollY) >= (scrollHeight - 500))
        && (scrollHeight > activeScrollHeight)) {
      const newOffset = offset + 100
      this.setState({...this.state, offset: newOffset, activeScrollHeight: scrollHeight, scrollLoading: true},
          () => filterPostsByPostParentLimitOffset({
            postParentId: exchangeId,
            postType: null,
            postParentType: constant.POST_PARENT.EXCHANGE,
            limit,
            offset: newOffset,
          }),
      )
    }

    if (window.innerWidth > 480) {
      if (window.scrollY > 1000)
        this.setState({...this.state, scrollButton: true})
      else this.setState({...this.state, scrollButton: false})
    }
    else {
      if (window.scrollY > 400)
        this.setState({...this.state, scrollButton: true})
      else this.setState({...this.state, scrollButton: false})
    }

    if (document.body.clientWidth <= 480) {
      if (window.scrollY > this.state.scrollY) {
        this.setState({...this.state, hideTopBar: true, scrollY: window.scrollY})
      }
      else {
        this.setState({...this.state, hideTopBar: false, scrollY: window.scrollY})
      }
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
    const {actions, className, exchangeId, posts, selectedExchange, unSetExchangeId, exchangePage, isLoading} = this.props
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
                  <CreatePostNew
                      postParentId={exchangeId}
                      postParentType={constant.POST_PARENT.EXCHANGE}
                      postsCountInThisPage={posts.length}
                  />

                  <div style={{background: `rgba(${averageColor[0]}, ${averageColor[1]}, ${averageColor[2]})`}}
                       className={hideTopBar ? 'top-bar-entity show top-bar-entity-top' : 'top-bar-entity show'}>
                    <NewRightArrowSvg onClick={unSetExchangeId} className='back-button'/>
                    <Link to={'/exchange/' + exchangeId} className='profile-top-bar'>
                      {selectedExchange.exchange_image
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
                          {selectedExchange.name}
                        </span>
                  </div>

                  <FrameCard className={exchangePage ? '-frameCardPostEx border-top-0' : '-frameCardPost border-top-0'}>
                    {isLoading === true && <div className='text-center'><ClipLoader/></div>}
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
  const isLoading = (exchangeId && allExchange[exchangeId] && allExchange[exchangeId].posts && allExchange[exchangeId].posts.isLoading)
  return {
    posts: exchangePostsSelector(state, ownProps),
    isLoading,
    selectedExchange: allExchange[exchangeId],
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