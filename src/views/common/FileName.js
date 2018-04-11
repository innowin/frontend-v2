import React, {Component} from 'react'
import PropTypes from 'prop-types'

export class FileName extends Component {
  static defaultProps = {
    className: ''
  };

  static propTypes = {
    fileName: PropTypes.string.isRequired,
    className: PropTypes.string
  };

  render() {
    const {fileName, className} = this.props;
    const parts = fileName.split('.');
    const ext = parts.pop();
    const name_ = parts.join('.').trim();
    const length = name_.length;
    const name = (length>17) ? (
      name_.substring(0,10) + "..." + name_.substring(length-4, length)) :(name_);
    // TODO keep ltr
    return (
      <div className={"filename-wrapper " + className}>
        <span className="filename-name">{name}</span>
        <span className="filename-ext">{"." + ext}</span>
      </div>
    )
  }
}
