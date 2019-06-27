/*global __*/
import React, {PureComponent} from 'react'
import * as PropTypes from 'prop-types'
import Select from 'react-select'
import cx from 'classnames'


export class SelectComponent extends PureComponent {

  static defaultProps = {
    multi: false,
    required: false,
    zIndex: 3,
    className:''
  };

  static propTypes = {
    options: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    handleOnSelect: PropTypes.func,
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
    zIndex: PropTypes.number,
    className:PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {value: this.props.value || this.props.defaultValue || '', error: false}
  }

  getValue = () => {
    return this.state.value;
  };

  handleChange = (val) => {
    const {handleOnSelect} = this.props
    let value = val.value;
    if (this.props.multi) {
      value = val.map(
        (x) => {return x.value}
      );
    }
    this.setState({...this.state, value:value});
    if(handleOnSelect){
      this.props.handleOnSelect(value)
    }
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
    const {options, label, name, multi, className} = this.props;
    const {error, value} = this.state;
    const style = {
      zIndex: this.props.zIndex,
    };
    return (
      <div className={cx(className, {'has-danger': error})} style={style}>
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
