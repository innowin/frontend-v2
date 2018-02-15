/*global __ */
import React, {Component} from 'react'
import {updateCareer} from '../../../crud/user/career'
import PropTypes from 'prop-types'
import {Confirm} from "../../common/cards/Confirm";
import {TextInput} from '../../common/inputs/TextInput'
import {DateInput} from '../../common/inputs/DateInput'
import {SelectComponent} from '../../common/SelectComponent';
import {ID} from '../../../consts/data'

export default class CareerForm extends Component {
	constructor(props){
		super(props);
		this.state={edit:false}
	}
	static propTypes={
		career: PropTypes.object.isRequired,
		hideEdit: PropTypes.func.isRequired,
	}

	_getValues = () => {
    return {
			name:this.nameInput.getValue(),
      position: this.positionInput.getValue(),
      to_date: this.toDateInput.getValue(),
			from_date: this.fromDateInput.getValue(),

    }
	};

	_formValidate = () => {
    let result = true;
    const validates = [
			this.nameInput.validate(),
      this.positionInput.validate(),
      this.fromDateInput.validate(),
      this.toDateInput.validate()
    ];
    for (let i = 0; i < validates.length; i++) {
      if (validates[i]) {
        result = false;
        break;
      }
    }
    return result
	};

	//TODO amir : complete career form correct date format (??)
	render(){
		const {onSubmit, hideEdit} = this.props;
		const career = this.props.career || {};
		const options = [
      {value: 'WITHOUT_CONFIRM', label: 'بدون تایید'},
      {value: 'WAIT_FOR_CONFIRM', label: 'منتظر تایید'},
			{value: 'CONFIRMED', label: 'تایید'},
			{value: 'UNCONFIRMED', label: 'تایید نشده'}
    ];
			return (
				<form onSubmit={onSubmit}>
					<div className="row">
						<TextInput
							label={__('Name')}
							value={career.name}
							name="name"
							ref={nameInput => {this.nameInput = nameInput}}
						/>
						<TextInput
							label={__('Position')}
							value={career.position}
							name="position"
							ref={positionInput => {this.positionInput = positionInput}}
						/>
						<DateInput
							name="from_date"
							label={__('From date')}
							value={career.fromDate}
							ref={fromDateInput => {this.fromDateInput = fromDateInput}}
							showDay={true}
						/>
						<DateInput
							label={__('To date')}
							value={career.toDate}
							name="to_date"
							ref={toDateInput => {this.toDateInput = toDateInput}}
							showDay={true}
						/>
						<SelectComponent
							name="status"
							label={__('Status') + ": "}
							options={options}
							required
							value={career.status}
							ref={careerStatus => {
								this.careerStatus = careerStatus
							}}
						/>
					</div>
					{this.props.children}
				</form>
				)
		}
};

export class CareerCreateForm extends Component {

  static propTypes = {
    create: PropTypes.func.isRequired,
    hideCreateForm: PropTypes.func.isRequired
  };

  _save = () => {
    const {create} = this.props;
    const formValues = this.form._getValues();
    return create(formValues);
  };

  _onSubmit = (e) => {
    e.preventDefault();
    if (this.form._formValidate()) {
      this._save()
    }
    return false;
  };

  render() {
    const {hideCreateForm} = this.props;
    return (<CareerForm onSubmit={this._onSubmit} ref={form => {
      this.form = form
    }}>
      <div className="col-12 d-flex justify-content-end">
        <button type="button" className="btn btn-secondary mr-2" onClick={hideCreateForm}>
          {__('Cancel')}
        </button>
        <button type="submit" className="btn btn-success">{__('Create')}</button>
      </div>
    </CareerForm>);
  }
}

export class CareerEditForm extends Component {

  static propTypes = {
    update: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    hideEdit: PropTypes.func.isRequired,
    career: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {confirm: false};
  }

  _showConfirm = () => {
    this.setState({confirm: true})
  };

  _cancelConfirm = () => {
    this.setState({confirm: false})
  };

  _remove = () => {
    const careerId = this.props.career.id;
    return this.props.delete(careerId)
  };

  _save = () => {
    const {career, update} = this.props;
    const careerId = career.id;
    const formValues = this.form._getValues();
    return update(formValues, careerId)
  };

  _onSubmit = (e) => {
    e.preventDefault();
    this._save();
  };

  render() {
    const {confirm} = this.state;
    const {hideEdit, career} = this.props;
    if (confirm) {
      return <Confirm cancelRemoving={this._cancelConfirm} remove={this._remove}/>;
    }
    return (
      <CareerForm onSubmit={this._onSubmit} career={career} ref={form => {
        this.form = form
      }}>
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-outline-danger mr-auto" onClick={this._showConfirm}>
            {__('Delete')}
          </button>
          <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
            {__('Cancel')}
          </button>
          <button type="submit" className="btn btn-success">{__('Save')}</button>
        </div>
      </CareerForm>
    )
  }
}

