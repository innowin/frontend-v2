/*global __ */
import React, {Component} from 'react'
import {updateCareer} from '../../../crud/user/career'
import PropTypes from 'prop-types'
import {TextInput} from '../../common/inputs/TextInput'
import {DateInput} from '../../common/inputs/DateInput'
import {ID} from '../../../consts/data'

export default class UserCareerForm extends Component {
	constructor(props){
		super(props);
		this.state={edit:false}
	}
	static propTypes={
		career: PropTypes.object.isRequired,
		hideEdit: PropTypes.func.isRequired,
		updateStateForView: PropTypes.func.isRequired
	}

	_getValues = () => {
    return {
      username: this.positionInput.getValue(),
      first_name: this.toDateInput.getValue(),
      last_name: this.fromDateInput.getValue()
    }
	};

	_formValidate = () => {
    let result = true;
    const validates = [
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

	_onSubmit = (e) => {
		e.preventDefault();
		const {updateStateForView, hideEdit, career} = this.props;
		if (this.form._formValidate()) {
			const formValues = this.form._getValues();
			updateCareer(formValues, career.id, updateStateForView,  hideEdit)
		}
		return false;
	};
	//TODO amir : complete career form correct date format (??)
	render(){
		const {career, hideEdit} = this.props;
			return (
				<form onSubmit={this.props.onSubmit}>
					<div className="row">
						<TextInput
							label={__('Position')}
							value={career.position}
							name="position"
							ref={positionInput => {this.positionInput = positionInput}}
						/>
						<DateInput
							label={__('From date')}
							value={career.fromDate}
							name="from_date"
							ref={fromDateInput => {this.fromDateInput = fromDateInput}}
						/>
						<DateInput
							label={__('To date')}
							value={career.toDate}
							name="to_date"
							ref={toDateInput => {this.toDateInput = toDateInput}}
						/>

						{/* {<div className="input-group ">
							<div className="input-group-prepend">
								<label className="input-group-text" for="status" >{__('Status')}</label>
							</div>
							<select className="custom-select" id="status" name="status">
								<option value="WITHOUT_CONFIRM" selected>WITHOUT_CONFIRM</option>
								<option value="WAIT_FOR_CONFIRM">WAIT_FOR_CONFIRM</option>
								<option value="CONFIRMED">CONFIRMED </option>
								<option value="UNCONFIRMED">UNCONFIRMED</option>
							</select>
						</div>} */}

						<button type="button" className="btn btn-danger mr-2 m-2" onClick={hideEdit}>
							{__('Cancel')}
						</button>
						<button type="submit" className="btn btn-primary mr-2 m-2" >
							{__('Save')}
						</button>
					</div>
				</form>
				)
		}
};


