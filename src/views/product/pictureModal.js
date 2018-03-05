import React, {Component} from "react";
import PropTypes from "prop-types";
import {Modal, Button, ModalBody, ModalHeader, ModalFooter} from "reactstrap";

export class PictureModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    files: PropTypes.array.isRequired,
    selectedFile: PropTypes.number,
    toggleModal: PropTypes.func.isRequired,
    className: PropTypes.string
  };

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
      <Modal isOpen={this.state.modal} toggle={this._handleToggleModal} className={className}>
        <ModalHeader toggle={this._handleToggleModal}>Modal title</ModalHeader>
        <ModalBody>
          {files.map((file, i) => {
            if (0 < i && i < 4) {
              return (<div key={file} style={{backgroundImage: `url(${file})`,}}/>)
            }
            return null
          })}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this._handleToggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}