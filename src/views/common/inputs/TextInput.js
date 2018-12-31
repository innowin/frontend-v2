/*global __*/
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

export class TextInput extends Component {
  static defaultProps = {
    customValidate: () => false,
    required: false,
    className: ''
  };

  static propTypes = {
    customValidate: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {value: this.props.value || '', error: false};
  };

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({value, error: this.validateText(value)})
  };

  handleBlur = () => {
    this.validate()
  };

  getValue = () => {
    return this.state.value;
  };


  validateText = (value, final) => {
    if (value === '') {
      if (this.props.required) {
        return __('Required field');
      } else {
        return false;
      }
    }
    return this.props.customValidate(value, final);
  };

  validate = () => {
    const {value} = this.state;
    const error = this.validateText(value, true);
    this.setState({error});
    return error;
  };

  render() {
    const {label, name, className} = this.props;
    const {error, value} = this.state;
    return (
      <div className={cx("col-12 form-group", {'has-danger': error}) + ' ' + className}>
        <label>{label}</label>
        <input
          type="text"
          name={name}
          className="form-control"
          value={value}
          ref="TextInput"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          dir="auto"
        />
        {error && <div className="form-control-feedback">{error}</div>}
      </div>
    )
  }
}

