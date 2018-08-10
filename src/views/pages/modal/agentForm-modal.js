import React, { Component } from "react"
import PropTypes from "prop-types"
import LabelTag from "../../common/tag-label.js"
import {AgentSvgIcon, TipsIcon} from "src/images/icons"
class AgentForm extends Component {
  static propTypes = {
    hide: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
  }
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.hide();
    }
  }
  render() {
    return (
      <div className={this.props.active  ? "modal-page" : "modal-page hide" } tabIndex="-1" role="dialog" ref={this.setWrapperRef}>
        <div className="agent-from-title"><div className="agent-form-title-container"><AgentSvgIcon className="agent-form-agent-icon"/><span className="agent-from-title-text"> درخواست ارتقاء به کارگزار</span></div></div>

        <div className="modal-bottom">
          <label className="label float-right">شرحی از سوابق کاری خود را بنویسید</label>
          <textarea type="text" className="form-control gray-text-input job-description"/>

          <label className="label float-right mt-2">ویرایش برچسب ها</label>
          <input type="text " className="form-control gray-text-input"/>
          <div className="modal-labels">
            <LabelTag
              name="تست"
              number="2"
            />
            <LabelTag
              name="تست"
              number="2"
            />
            <LabelTag
              name="تست"
              number="2"
            />
          </div>
          
        </div>
        <div className="modal-footers">
          <div className = "row">
            <div className="col">
              <button onClick={this.props.hide} className="modal-button link float-right">
                لغو
              </button>
            </div>
            <div className="col">
              <button className="modal-button primary float-left">
                ارسال
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
export default AgentForm
