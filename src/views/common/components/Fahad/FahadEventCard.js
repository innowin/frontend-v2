import * as React from "react"
import {EventBanner} from "src/images/icons"
import {PureComponent} from "react"
import FahadEventModal from "./FahadEventModal"
import {getCategories} from "src/redux/actions/commonActions/categoryActions"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {createProductAsContribution} from "src/redux/actions/commonActions/productActions"


class FahadEventCard extends PureComponent {
  constructor() {
    super()
    this.state = {
      modalIsOpen: false,
    }
  }

  componentDidMount(): void {
    this.props._getCategories()
  }

  toggle = (e) => {
    e && e.stopPropagation()
    e && e.preventDefault()
    this.setState({...this.state, modalIsOpen: !this.state.modalIsOpen}, () => {
      this.state.modalIsOpen ? document.body.style.overflowY = "hidden" : document.body.style.overflowY = "auto"
    })
  }

  render = () => (
      <div className="event-card">
        <FahadEventModal modalIsOpen={this.state.modalIsOpen} toggle={this.toggle} _createProduct={this.props._createProduct}/>
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

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
          _getCategories: getCategories,
          _createProduct: createProductAsContribution,
        }, dispatch)

export default connect(null, mapDispatchToProps)(FahadEventCard)