/*global __*/
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select-2'
import cx from 'classnames'


export class SelectComponent extends Component {

  static defaultProps = {
    multi: false,
    required: false,
    zIndex: 3
  };

  static propTypes = {
    options: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    multi: PropTypes.bool,
    required: PropTypes.bool,
    zIndex: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {value: this.props.value || this.props.defaultValue || '', error: false};
    this.handleChange = this.handleChange.bind(this)
  }

  getValue = () => {
    return this.state.value;
  };

  handleChange = (val) => {
    let value = val;
    if (this.props.multi) {
      value = val.map(
        (x) => {return x}
      );
    }
    this.setState({...this.state, value:value});
  };

  validateSelect = (value) => {
    if (this.props.required) {
      if (value !== '' && value !== undefined && value.length !== 0) {
        return false
      }
      return __('Required field');
    }
    return false
  };

  validate = () => {
    const {value} = this.state;
    const error = this.validateSelect(value);
    this.setState({error});
    return error;
  };


  render() {
    const {options, label, name, multi} = this.props;
    const {error, value} = this.state;
    const style = {
      zIndex: this.props.zIndex,
    };
    return (
      <div className={cx("col-12 form-group", {'has-danger': error})} style={style}>
        <label>{label}</label>
        <Select
          value={value}
          name={name}
          options={options}
          onChange={this.handleChange}
          multi={multi}
          placeholder={__('Select')}
          clearable={false}
        />
        {error && <div className="form-control-feedback">{error}</div>}
      </div>
    )
  }
}
