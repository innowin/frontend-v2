import * as React from "react"
import {EventBanner} from "src/images/icons"
import {PureComponent} from "react"
import FahadEventModal from "./FahadEventModal"
import {getCategories} from "src/redux/actions/commonActions/categoryActions"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import ProductActions, {createProductAsContribution} from "src/redux/actions/commonActions/productActions"
import {getClientIdentity} from "src/redux/selectors/common/client/getClient"


class FahadEventCard extends PureComponent {
  constructor() {
    super()
    this.state = {
      modalIsOpen: false,
    }
  }

  componentDidMount(): void {
    this.props._getCategories()
    this.props._getProductsByIdentity({productOwnerId: this.props.clientIdentityId})
  }

  toggle = (e) => {
    e && e.stopPropagation()
    e && e.preventDefault()
    this.setState({...this.state, modalIsOpen: !this.state.modalIsOpen}, () => {
      this.state.modalIsOpen ? document.body.style.overflowY = "hidden" : document.body.style.overflowY = "auto"
    })
  }

  render() {
    let {_createProduct} = this.props
    let {modalIsOpen} = this.state
    return (
        <div className="event-card">
          <FahadEventModal modalIsOpen={modalIsOpen} toggle={this.toggle} _createProduct={_createProduct}/>
          <div className="close-button">✕</div>
          <div className="image"><EventBanner/></div>
          <div className="text">
            <div className="title">رویداد علمی شبکه همکاری نخبگان فحاد</div>
            <div className="description">برای ثبت نام در شبکهٔ همکاری نخبگان علمی فناوری از اینجا اقدام کنید.</div>
          </div>
          <div className="button event-opener" onClick={this.toggle}>ثبت نام رایگان</div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    clientIdentityId: getClientIdentity(state),
  }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
          _getCategories: getCategories,
          _createProduct: createProductAsContribution,
          _getProductsByIdentity: ProductActions.getProductsByIdentity,
        }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FahadEventCard)