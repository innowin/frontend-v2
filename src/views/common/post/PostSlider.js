import React, {Component} from "react"
import PropTypes from "prop-types"
import {CSSTransition, TransitionGroup} from "react-transition-group"
import Toast from "../components/ToastContainer"

class PostSlider extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    closeModal: PropTypes.func.isRequired,
    modalIsOpen: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedImage: 0
    }
  }

  componentDidUpdate() {
  }

  renderSlider(images) {
    let {selectedImage} = this.state
    let {rect} = this.props
    return (
        <div className="post-slider-container"
             style={rect && {width: rect.width + "px", height: rect.height + "px", top: rect.top + "px", left: rect.left + "px"}}>
          <div className="post-slider-image-con">
            <img src={images[selectedImage].file} alt="" className="post-slider-image"/>
          </div>
          <div className="post-slider-footer">
            <div className="post-slider-images-con">
              {
                images.map(p =>
                    <div className="post-slider-footer-images-con">
                      <img src={p.file} alt="" className="post-slider-footer-images">

                      </img>
                    </div>)
              }
            </div>
          </div>
        </div>
    )
  }

  render() {
    let {images, modalIsOpen, closeModal} = this.props
    return (
        <React.Fragment>
          <div className={modalIsOpen ? "post-slider-black-back" : "post-slider-black-back-close"} onClick={() => closeModal()}/>
          <TransitionGroup>
            {
              modalIsOpen ?
                  <CSSTransition key={Math.random()} exit={true} timeout={300} classNames='scale'>
                    {this.renderSlider(images)}
                  </CSSTransition>
                  : null
            }
          </TransitionGroup>
        </React.Fragment>
    )
  }
}

export default PostSlider