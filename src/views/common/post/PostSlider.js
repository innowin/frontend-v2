import React, {PureComponent} from 'react'
import * as PropTypes from 'prop-types'
import {MainLbarArrow} from 'src/images/icons'

class PostSlider extends PureComponent {
  static propTypes = {
    images: PropTypes.array,
    closeModal: PropTypes.func.isRequired,
    modalIsOpen: PropTypes.bool.isRequired,
    imageIndex: PropTypes.number.isRequired,
    rect: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedImage: 0,
    }
    this.keyUp = this.keyUp.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrevious = this.handlePrevious.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keyup', this.keyUp)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.imageIndex !== this.props.imageIndex) {
      this.setState({...this.state, selectedImage: nextProps.imageIndex})
    }
  }

  keyUp(e) {
    switch (e.code) {
      case 'ArrowRight':
        this.handleNext()
        break
      case 'ArrowLeft':
        this.handlePrevious()
        break
      default:
        this.props.closeModal()
    }
  }

  handleNext() {
    let {images} = this.props
    let {selectedImage} = this.state
    if (images[selectedImage + 1]) this.setState({...this.state, selectedImage: selectedImage + 1})
    else this.setState({...this.state, selectedImage: 0})
  }

  handlePrevious() {
    let {images} = this.props
    let {selectedImage} = this.state
    if (images[selectedImage - 1]) this.setState({...this.state, selectedImage: selectedImage - 1})
    else this.setState({...this.state, selectedImage: images.length - 1})
  }

  render() {
    let {modalIsOpen, closeModal, images} = this.props
    let {selectedImage} = this.state
    if (modalIsOpen)
      return (
          <React.Fragment>
            <div className={modalIsOpen ? 'post-slider-black-back' : 'post-slider-black-back-close'} onClick={closeModal}/>
            <div className={modalIsOpen ? 'post-slider-close-button' : 'post-slider-close-button-hide'} onClick={closeModal}>✕</div>
            {
              images && images.length > 1 &&
              <React.Fragment>
                <div className={modalIsOpen ? 'slider-left-arrow-container' : 'slider-arrow-hide'} onClick={this.handleNext}>
                  <MainLbarArrow className={modalIsOpen ? 'slider-left-arrow' : 'slider-arrow-hide'}/>
                </div>
                <div className={modalIsOpen ? 'slider-right-arrow-container' : 'slider-arrow-hide'} onClick={this.handlePrevious}>
                  <MainLbarArrow className={modalIsOpen ? 'slider-right-arrow' : 'slider-arrow-hide'}/>
                </div>
              </React.Fragment>
            }
            <div className={modalIsOpen ? 'post-slider-container' : 'post-slider-container-inactive'}>
              <img src={images[selectedImage] && images[selectedImage].file} alt="" className={images[selectedImage] && 'post-slider-image'}/>
            </div>
          </React.Fragment>
      )
    else return null
  }
}

export default PostSlider