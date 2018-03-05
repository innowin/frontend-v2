import React, {Component} from "react";
import PropTypes from "prop-types";
import {Modal, Button, ModalBody, ModalHeader, ModalFooter} from "reactstrap"
import Slider from "react-slick"

class SimpleSlider extends React.Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    const {files} = this.props;
    return (
      <Slider {...settings}>
        {files.map((file) => {
          return (<div key={file} style={{backgroundImage: `url(${file})`,}}/>)
        })}
      </Slider>
    );
  }
}

export class PictureModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    files: PropTypes.array.isRequired,
    selectedFile: PropTypes.number,
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
    const {className, files, selectedFile} = this.props;
    return (
      <Modal isOpen={this.state.modal} className={className}>
        <ModalHeader toggle={this._handleToggleModal}>Modal title</ModalHeader>
        <ModalBody>
          <div className="-rBarProductImage d-flex flex-row mt-3">
          {files.map((file) => {
            return (<div key={file} style={{backgroundImage: `url(${file})`,}}/>)
          })}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={this._handleToggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}