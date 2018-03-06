import React, {Component} from "react";
import PropTypes from "prop-types";
import {Modal, Button, ModalBody, ModalHeader, ModalFooter} from "reactstrap"
import Slider from "react-slick"

// const NextArrow = ({props}) => {
//   const {className, style, onClick} = props;
//   return (
//     <div
//       className={className}
//       style={{...style, display: 'block', background: 'red', height:'50px'}}
//       onClick={onClick}
//     />
//   );
// };
//
// const PrevArrow = ({props}) => {
//   const {className, style, onClick} = props;
//   return (
//     <div
//       className={className}
//       style={{...style, display: 'block', background: 'green', height:'50px'}}
//       onClick={onClick}
//     />
//   );
// };

class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      // nextArrow: <NextArrow props={{}}/>,
      // prevArrow: <PrevArrow props={{}}/>
    };
    const {files, selectedFileIndex} = this.props;
    return (
      <div>
        <Slider {...settings} className="-mySlider">
          <div><img src={files[selectedFileIndex]}/></div>
          {
            files.map((file, i) => {
              if (i !== selectedFileIndex) {
                return <div><img className="w-75 -rBarMainPicture" alt="Product icon" src={file}/></div>
              }
              return null;
            })
          }
        </Slider>
      </div>
    );
  }
}

export class PictureModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    files: PropTypes.array.isRequired,
    selectedFileIndex: PropTypes.number,
    toggleModal: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  static displayName = "PictureModal";

  constructor(props) {
    super(props);
    this.state = {modal: false};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, modal: nextProps.isOpen})
  }

  _handleToggleModal = (e) => {
    e.preventDefault();
    this.props.toggleModal();
  };

  render() {
    const {className, files, selectedFileIndex} = this.props;
    return (
      <Modal isOpen={this.state.modal} className={className}>
        <ModalHeader toggle={this._handleToggleModal}>Modal title</ModalHeader>
        <ModalBody>
          <SimpleSlider files={files} selectedFileIndex={selectedFileIndex}/>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this._handleToggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}