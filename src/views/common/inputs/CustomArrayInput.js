/*global __*/
import React, {Component} from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

export class CustomArrayInput extends Component {
  static defaultProps = {
    required: false
  };

  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.any),
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    inputComponent: PropTypes.func.isRequired,
    outputComponent: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {arrayValue: this.props.value || [], error: false};
  };

  handleAdd = () => {
    const inputComponent = this.refs.inputComponent;
    const error = inputComponent.validate();
    let arrayValue = this.state.arrayValue;
    if (!error) {
      const v = inputComponent.getValue();
      if (v) {
        arrayValue = [...arrayValue, v];
        inputComponent.reset();
      }
    }
    this.setState({arrayValue, error});
  };

  handleRemove = (index) => () => {
    let arrayValue = [...this.state.arrayValue];
    arrayValue.splice(index, 1);
    this.setState({arrayValue});
  };

  //TODO: mohammad change this to return this.state.arrayValue[0];
  getValue = () => {
    // return this.state.arrayValue;
    const inputComponent = this.refs.inputComponent;
    return inputComponent.getValue();
  };

  validateArray = (arrayValue) => {
    if (this.props.required) {
      if (arrayValue.length === 0) {
        return __('Required field');
        // TODO maybe need setState error.
      }
    }
  };

  validate = () => {
    const {arrayValue} = this.state;
    const error = this.validateArray(arrayValue);
    this.setState({error});
    return error;
  };


  render() {
    const InputComponent = this.props.inputComponent;
    const OutputComponent = this.props.outputComponent;
    const listValue = this.state.arrayValue.map((value, i) => {
      return <OutputComponent value={value} onRemove={this.handleRemove(i)} key={i}/>
    });
    return (
        <div className={cx("form-group", {'has-danger': this.state.error})}>
          {/*TO DO : keep-ltr*/}
          <label>{this.props.label}</label>
          {/*<InputComponent ref="inputComponent" onAdd={this.handleAdd}/>*/}
          <InputComponent ref="inputComponent"/>
          <div className="w-100">{listValue}</div>
          {this.state.error &&
          <div className="form-control-feedback">{this.state.error}</div>}
        </div>
    )
  }
}

