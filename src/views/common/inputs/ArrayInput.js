/*global __*/
import React, {Component} from 'react'
import cx from 'classnames'
import * as PropTypes from 'prop-types'

export class ArrayInput extends Component {
  static defaultProps = {
    customValidate: () => false,
    customValidateItem: () => false,
    required: false
  };

  static propTypes = {
    customValidate: PropTypes.func,
    customValidateItem: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.string),
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {arrayValue: this.props.value || [], inputValue: '', error: false};
  };

  handleChange = (event) => {
    const inputValue = event.target.value;
    const error = this.validateItem(inputValue, false);
    this.setState({inputValue, error})
  };

  handleClick = () => {
    this.handleAdd();
    this.refs.inputValue.focus();
  };

  validateItem = (value, final) => {
    return this.props.customValidateItem(value, final);
  };

  handleAdd = () => {
    const v = this.state.inputValue.trim();
    const error = this.validateItem(v, true);
    const arrayValue = this.state.arrayValue;
    if (!error && v !== '') {
      this.setState({arrayValue: [...arrayValue, v], inputValue: '', error});
    } else {
      this.setState({error});
    }
  };

  // TODO: mohammad change this to this.state.arrayValue
  getValue = () => {
    // return this.state.arrayValue;
    return this.state.inputValue;
  };

  validateArray = (arrayValue) => {
    if (arrayValue.length === 0) {
      if (this.props.required) {
        return __('Required field');
      } else {
        return false;
      }
    }
    return this.props.customValidate(arrayValue);
  };

  validate = () => {
    const {arrayValue} = this.state;
    const error = this.validateArray(arrayValue);
    this.setState({error});
    return error;
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleAdd();
    }
  };

  handleRemove = (index) => () => {
    let arrayValue = [...this.state.arrayValue];
    arrayValue.splice(index, 1);
    this.setState({arrayValue});
  };

  render() {
    const listValues = this.state.arrayValue.map((tag, i) => {
      return (
          <span key={i} className="badge badge-success mr-2 dir-rtl">
                {tag}
            <span className="badge-remove-btn mr-1" onClick={this.handleRemove(i)}>x</span>
                </span>
      )
    });
    return (
        <div className={cx("form-group", {'has-danger': this.state.error})}>
          {/*TODO keep-ltr */}
          <label>{this.props.label}</label>
          <div className="input-group">
            <input
                type="text"
                name={this.props.name}
                className="form-control"
                placeholder={this.props.placeholder}
                value={this.state.inputValue}
                ref="inputValue"
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
            />
            <span className="input-group-btn">
                     {/*<button className="btn btn-secondary" type="button" onClick={this.handleClick}>+</button>*/}
                </span>
          </div>
          <div className="w-100">{listValues}</div>
          {this.state.error &&
          <div className="form-control-feedback">{this.state.error}</div>}
        </div>
    )
  }
}