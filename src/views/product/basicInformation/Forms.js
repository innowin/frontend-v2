/*global __*/
import React, {Component} from "react"
import PropTypes from "prop-types"
import {TextInput} from "src/views/common/inputs/TextInput"
import {updateProduct} from "src/crud/product/basicInformation"


export class ProductDescriptionForm extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		description: PropTypes.array,
	};

	_getValues = () => {
		return {
			description: this.descriptionInput.getValue()
		}
	};

	_formValidate = () => {
		let result = true;
		const validates = [
			this.descriptionInput.validate(),
		];
		for (let i = 0; i < validates.length; i++) {
			if (validates[i]) {
				result = false;
				break;
			}
		}
		return result
	};
	
	render() {
		//Todo pedram : delete and create functionality should be added
		const description = this.props.description || "";
		return (
				<form onSubmit={this.props.onSubmit}>
					<div className="description-wrapper">
						<TextInput
								name="description"
								required
								label={__('Description') + ": "}
								value={description}
								ref={descriptionInput => {
									this.descriptionInput = descriptionInput
								}}
						/>
					</div>
					<div>{this.props.children}</div>
				</form>
		)
	}
}


export class ProductDescriptionEditForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			confirm: false
		}
	}

	static propTypes = {
		hideEdit: PropTypes.func.isRequired,
		updateStateForView: PropTypes.func.isRequired,
		description: PropTypes.array.isRequired,
	};
 
	_save = (updateStateForView, hideEdit) => {
		const productId = this.props.product.id;
		const formValues = this.form._getValues();
		return updateProduct(formValues, productId, updateStateForView,  hideEdit)
	};

	_onSubmit = (e) => {
		e.preventDefault();
		const {updateStateForView, hideEdit} = this.props;
		if (this.form._formValidate()) {
			this._save(updateStateForView, hideEdit)
		}
		return false;
	};

	render() {
		const {description} = this.props;
		return (
				<ProductDescriptionForm onSubmit={this._onSubmit} ref={form => {this.form = form}} description={description}>
					<div className="col-12 d-flex justify-content-end">
						<button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
							{__('Cancel')}
						</button>
						<button type="submit" className="btn btn-success">{__('Save')}</button>
					</div>
				</ProductDescriptionForm>
		)
	}
}


export class ProductInfoForm extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		product: PropTypes.object,
	};
	
	_getValues = () => {
		return {
			username: this.usernameInput.getValue(),
			official_name: this.officialNameInput.getValue(),
			national_name: this.nationalCodeInput.getValue(),
			country: this.countryInput.getValue(),
			province: this.provinceInput.getValue(),
			city: this.cityInput.getValue(),
		}
	};
	
	_formValidate = () => {
		let result = true;
		const validates = [
			this.usernameInput.validate(),
			this.officialNameInput.validate(),
			this.nationalCodeInput.validate(),
			this.countryInput.validate(),
			this.provinceInput.validate(),
			this.cityInput.validate(),
		];
		for (let i = 0; i < validates.length; i++) {
			if (validates[i]) {
				result = false;
				break;
			}
		}
		return result
	};
	
	render() {
		const product = this.props.product || {};
		return (
				<form onSubmit={this.props.onSubmit}>
					<div className="row">
						<TextInput
								name="username"
								label={__('Username') + ": "}
								value={product.username}
								ref={usernameInput => {
									this.usernameInput = usernameInput
								}}
						/>
						<TextInput
								name="officialName"
								label={__('Official name') + ": "}
								value={product.official_name}
								ref={officialNameInput => {
									this.officialNameInput = officialNameInput
								}}
						/>
						<TextInput
								name="nationalCode"
								label={__('National code') + ": "}
								value={product.national_code}
								ref={nationalCodeInput => {
									this.nationalCodeInput = nationalCodeInput
								}}
						/>
						<TextInput
								name="country"
								label={__('Country') + ": "}
								value={product.country}
								ref={countryInput => {
									this.countryInput = countryInput
								}}
						/>
						<TextInput
								name="province"
								label={__('Province') + ": "}
								value={product.province}
								ref={provinceInput => {
									this.provinceInput = provinceInput
								}}
						/>
						<TextInput
								name="city"
								label={__('City') + ": "}
								value={product.city}
								ref={cityInput => {
									this.cityInput = cityInput
								}}
						/>

						{this.props.children}
					</div>
				</form>
		)
	}
}


export class ProductInfoEditForm extends Component {
	constructor(props) {
		super(props);
		this.state = {confirm: false}
	}
	
	static propTypes = {
		hideEdit: PropTypes.func.isRequired,
		updateStateForView: PropTypes.func.isRequired,
		product: PropTypes.object.isRequired
	};
	
	_save = (updateStateForView, hideEdit) => {
		const productId = this.props.product.id;
		const formValues = this.form._getValues();
		return updateProduct(formValues, productId, updateStateForView, hideEdit)
	};
	
	_onSubmit = (e) => {
		const {updateStateForView, hideEdit} = this.props;
		e.preventDefault();
		if (this.form._formValidate()) {
			this._save(updateStateForView, hideEdit)
		}
		return false;
	};
	
	render() {
		const {product} = this.props;
		return (
				<ProductInfoForm onSubmit={this._onSubmit} ref={form => {
					this.form = form
				}} product={product}>
					<div className="col-12 d-flex justify-content-end">
						<button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
							{__('Cancel')}
						</button>
						<button type="submit" className="btn btn-success">{__('Save')}</button>
					</div>
				</ProductInfoForm>
		)
	}
}


