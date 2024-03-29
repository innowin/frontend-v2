import React, {Component} from "react"
import PropTypes from "prop-types"
// import {CSSTransition, TransitionGroup} from "react-transition-group"
import {MainLbarArrow} from "src/images/icons"

class PostSlider extends Component {
  static propTypes = {
    images: PropTypes.array,
    closeModal: PropTypes.func.isRequired,
    modalIsOpen: PropTypes.bool.isRequired,
    imageIndex: PropTypes.number.isRequired,
    rect: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedImage: 0
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot): void {
    if (prevProps.imageIndex !== this.props.imageIndex) {
      this.setState({...this.state, selectedImage: this.props.imageIndex})
    }
  }

  handleNext() {
    let {images} = this.props
    let {selectedImage} = this.state
    if (images[selectedImage + 1]) {
      this.setState({...this.state, selectedImage: selectedImage + 1})
    }
    else {
      this.setState({...this.state, selectedImage: 0})
    }
  }

  handlePrevious() {
    let {images} = this.props
    let {selectedImage} = this.state
    if (images[selectedImage - 1]) {
      this.setState({...this.state, selectedImage: selectedImage - 1})
    }
    else {
      this.setState({...this.state, selectedImage: images.length - 1})
    }
  }

  renderSlider() {
    let {images, rect, modalIsOpen} = this.props
    let {selectedImage} = this.state
    if (rect)
      return (
          <div className={modalIsOpen ? "post-slider-container" : "post-slider-container-inactive"}
               style={!modalIsOpen ?
                   rect && {
                     width: rect.width + "px",
                     height: rect.height + "px",
                     top: rect.top + "px",
                     left: rect.left + "px"
                   } : null}>
            <img src={images[selectedImage] && images[selectedImage].file} alt="" className={images[selectedImage] && "post-slider-image"}/>
          </div>
      )
  }

  render() {
    let {modalIsOpen, closeModal, images} = this.props
    return (
        <React.Fragment>
          <div className={modalIsOpen ? "post-slider-black-back" : "post-slider-black-back-close"} onClick={() => closeModal()}/>
          <div className={modalIsOpen ? "post-slider-close-button" : "post-slider-close-button-hide"} onClick={() => closeModal()}>✕</div>
          {
            images && images.length > 1 &&
            <React.Fragment>
              <div className={modalIsOpen ? "slider-left-arrow-container" : "slider-arrow-hide"} onClick={() => this.handleNext()}>
                <MainLbarArrow className={modalIsOpen ? "slider-left-arrow" : "slider-arrow-hide"}/>
              </div>
              <div className={modalIsOpen ? "slider-right-arrow-container" : "slider-arrow-hide"} onClick={() => this.handlePrevious()}>
                <MainLbarArrow className={modalIsOpen ? "slider-right-arrow" : "slider-arrow-hide"}/>
              </div>
            </React.Fragment>
          }
          {this.renderSlider()}
          {/*<TransitionGroup>*/}
          {/*{*/}
          {/*modalIsOpen ?*/}
          {/*<CSSTransition key={Math.random()} exit={true} timeout={300} classNames='scale'>*/}
          {/*{this.renderSlider(images)}*/}
          {/*</CSSTransition>*/}
          {/*: null*/}
          {/*}*/}
          {/*</TransitionGroup>*/}
        </React.Fragment>
    )
  }
}

export default PostSlider