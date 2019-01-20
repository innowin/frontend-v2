import * as React from 'react'
import {PureComponent} from 'react'
import connect from 'react-redux/es/connect/connect'
import productActions from 'src/redux/actions/commonActions/productActions/productActions'
import RightArrowSvg from '../../../images/common/right_arrow_svg'
import Sidebar from './Sidebar'
import {bindActionCreators} from 'redux'
import {ClipLoader} from 'react-spinners'
import {getProducts} from 'src/redux/selectors/common/product/getAllProducts'
import Products from './Products'
import {makeCategorySelector} from '../../../redux/selectors/common/category/getCategoriesByParentId'

// import {getMessages} from 'src/redux/selectors/translateSelector'
// import {Helmet} from 'react-helmet'

type appProps =
    {|
      actions: { getAllproducts: Function },
      currentUserIdentity: number,
      currentUserType: string,
      currentUserId: number,
      allProducts: any,
      translate: Object,
      loading: boolean
    |}

type appState =
    {|
      offset: number,
      activeScrollHeight: number,
      scrollLoading: boolean,
      justFollowing: boolean,
      search: ?string,
      scrollButton: boolean
    |}

class Explore extends PureComponent <appProps, appState> {
  constructor(props) {
    super(props)
    this.state = {
      offset: 0,
      activeScrollHeight: 0,
      scrollLoading: false,
      search: null,
      scrollButton: false,
      isCollapsed: true,
      catLevel1: 0,
      catLevel2: 0,
      catLevel3: 0
    }
  }

  componentDidMount() {
    this.props.actions.getAllproducts(24, 0, null)
    window.addEventListener('scroll', this._onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onScroll)
  }

  _handleCat = (level, word) => {
    if (level === 1) {
      this.setState({...this.state, catLevel1: word})
    }
    else if (level === 2) {
      this.setState({...this.state, catLevel2: word})
    }
    else if (level === 3) {
      this.setState({...this.state, catLevel3: word})
    }
    console.log(level, word)
  }

  _onScroll = () => {
    if (Object.values(this.props.allProducts).length > 0) {
      let {activeScrollHeight} = this.state
      let scrollHeight = document.body ? document.body.scrollHeight : 0
      if (((window.innerHeight + window.scrollY) >= (scrollHeight - 250)) && (scrollHeight > activeScrollHeight)) {
        this.setState({
              ...this.state,
              activeScrollHeight: scrollHeight,
              scrollLoading: true,
              offset: this.state.offset + 24
            },
            () => this.props.actions.getAllproducts(24, this.state.offset, this.state.search))
      }
      if (window.scrollY > 1000)
        this.setState({...this.state, scrollButton: true})
      else this.setState({...this.state, scrollButton: false})
    }
  }

  _search = (search) => {
    this.setState({...this.state, search, offset: 0, activeScrollHeight: 0}, () => {
      this.props.actions.getAllproducts(24, 0, search)
    })
  }

  _goUp = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }

  _collapse = () => this.setState({...this.state, isCollapsed: true})

  _unCollapse = () => this.setState({...this.state, isCollapsed: false})

  render() {
    const {allProducts, loading} = this.props
    const {scrollButton, catLevel1, catLevel2, catLevel3, /*isCollapsed*/} = this.state

    return (
        <div className='all-exchanges-parent'>
          <Sidebar search={this._search}
                   handleCat={this._handleCat}
                   catLevel1={catLevel1}
                   catLevel2={catLevel2}
                   catLevel3={catLevel3}
          />
          <div className='all-exchanges-container'>
            <div className='product-explorer-title'>
              <div>
                <span>اینوین</span>
                <span> / </span>
                <span>محصولات</span>
              </div>
              <div>
                {/*<div onClick={this._collapse} style={{display: 'inline-block', padding: '0 10px', backgroundColor: 'blue'}}>?</div>*/}
                {/*<div onClick={this._unCollapse} style={{display: 'inline-block', padding: '0 10px', backgroundColor: 'yellow'}}>?</div>*/}
              </div>
            </div>
            <Products products={allProducts}
                      loading={loading}
                      catLevel1={catLevel1}
                      catLevel2={catLevel2}
                      catLevel3={catLevel3}
            />
            <div className={loading ? 'exchanges-explore-search-loading' : 'exchanges-explore-search-loading-hide'}><ClipLoader/></div>
          </div>
          <div className={scrollButton ? 'go-up-logo-cont' : 'go-up-logo-cont-hide'} onClick={this._goUp}>
            <RightArrowSvg className='go-up-logo'/>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  const categorySelector = makeCategorySelector()
  return {
    categories: categorySelector(state),
    allProducts: getProducts(state),
    loading: state.common.product.products.isLoading
    // translate: getMessages(state),
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getAllproducts: productActions.getAllProductInfo
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Explore)