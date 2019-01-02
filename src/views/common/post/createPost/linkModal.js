import React, {Component} from "react"
import PropTypes from "prop-types"
import Link from "../../../../images/common/link_svg"


class LinkModal extends Component {
  static defaultProps = {
    linkModal: false,
  }
  static propTypes = {
    linkModal: PropTypes.bool,
    cancelFunc: PropTypes.func.isRequired,
    submitFunc: PropTypes.func.isRequired
  }

  componentDidUpdate() {
    const {linkModal} = this.props
    linkModal && this.link.focus()
  }


  render() {
    const {linkModal, cancelFunc, submitFunc} = this.props
    return (
      <div className={linkModal ? "post-component-footer-link-modal" : "post-component-footer-link-modal-hide"}>
        <div ref={e => this.linkModalRef = e} className='post-component-footer-link-modal-container'>
          <div className='post-component-footer-link-modal-container-title'>
            <Link className='post-component-footer-logos'/>
            افزودن لینک
          </div>
          <input type='text' className='post-component-footer-link-modal-container-input'
                 ref={e => this.link = e}/>
          <div className='post-component-footer-link-modal-container-buttons'>
            <button className='post-component-footer-link-modal-cancel-btn'
                    onClick={cancelFunc}>لغو
            </button>
            <button className='post-component-footer-link-modal-submit-btn'
                    onClick={() => submitFunc(this.link.value)}>ثبت
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default LinkModal