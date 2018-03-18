import React, {Component} from "react";
import PropTypes from "prop-types";
import {Modal, Button, ModalBody, ModalFooter} from "reactstrap"
import ImageGallery from 'react-image-gallery';

class ProductViewImageGallery extends Component {
  render() {
    const {files} = this.props;
    let selectedFileIndex = this.props.selectedFileIndex;
    if (selectedFileIndex === -1) {
      selectedFileIndex = 0
    }
    const images = [];
    files.map((file) => {
      return images.push({
        original: file,
        thumbnail: file,
        originalClass: "-productViewOriginalClass",
        thumbnailClass: "-productViewThumbnailClass"
      });
    });
    const settings = {
      showPlayButton: false,
      showBullets: true,
      startIndex: selectedFileIndex,
    };
    return (
      <div dir="ltr" className="-productViewModal">
        <ImageGallery items={images} {...settings}/>
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
        <ModalBody className="-grey3">
          <ProductViewImageGallery files={files} selectedFileIndex={selectedFileIndex}/>
        </ModalBody>
        <ModalFooter className="-grey3 pt-0">
          <Button className="-grey4" onClick={this._handleToggleModal}>بستن</Button>
        </ModalFooter>
      </Modal>
    );
  }
}