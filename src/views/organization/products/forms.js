/*global __*/
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TextInput} from 'src/views/common/inputs/TextInput'
import {FileInput} from 'src/views/common/inputs/FileInput';
import {Confirm} from "../../common/cards/Confirm";
import {SelectComponent} from '../../common/SelectComponent';
import { IDENTITY_ID } from '../../../consts/data';

export class ProductForm extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		product: PropTypes.object,
		categories: PropTypes.array
	};

	getValues =  () => {
		const values = {
				name: this.nameInput.getValue(),
				country: this.countryInput.getValue(),
				province: this.provinceInput.getValue(),
				city: this.cityInput.getValue(),
				description: this.descriptionInput.getValue(),
				product_owner: IDENTITY_ID,
				product_category: this.productCategoryInput.getValue()
		};
		return values;
	};

	formValidate = () => {
			let result = true;
			const validates = [
				this.nameInput.validate(),
				this.countryInput.validate(),
				this.provinceInput.validate(),
				this.cityInput.validate(),
				this.descriptionInput.validate(),
				this.productCategoryInput.validate()
			];
			for (let i = 0; i < validates.length; i++) {
					if (validates[i]) {
							result = false;
							break;
					}
			}
			return result
	};
//TODO amir specify identity concept and how to handle them
	render() {
			const {organization, categories} = this.props;
			const product = this.props.product || {picture: null};
			var currentCategory = {title:""};
			const options = categories.map((cat,index)=>{
				if(cat.id == product.product_category){
					currentCategory = cat;
				}
				return {value:cat.id, label:cat.title};
			})
			return <form onSubmit={this.props.onSubmit}>
				<div className="row">
					<TextInput
							name="name"
							required
							label={__('Name') + ": "}
							value={product.name}
							ref={nameInput => {
								this.nameInput = nameInput
							}}
					/>
					<TextInput
							name="country"
							required
							label={__('Country') + ": "}
							value={product.country}
							ref={countryInput => {
								this.countryInput = countryInput
							}}
					/>
				
					<TextInput
							name="province"
							required
							label={__('Province') + ": "}
							value={product.province}
							ref={provinceInput => {
								this.provinceInput = provinceInput
							}}
					/>
					<TextInput
							name="city"
							required
							label={__('City') + ": "}
							value={product.city}
							ref={cityInput => {
								this.cityInput = cityInput
							}}
					/>
					<TextInput
							name="description"
							required
							label={__('Description') + ": "}
							value={product.description}
							ref={descriptionInput => {
								this.descriptionInput = descriptionInput
							}}
					/>
					<SelectComponent
								name="productCategory"
								label={__('ProductCategory') + ": "}
								options={options}
								required
								value={currentCategory.title }
								ref={productCategoryInput => {
										this.productCategoryInput = productCategoryInput
								}}
						/>

					{this.props.children}
				</div>
			</form>
	}
}


export class ProductCreateForm extends Component {

	static propTypes = {
			create: PropTypes.func.isRequired,
			hideEdit: PropTypes.func.isRequired
	};

	save = () => {
			const formValues = this.refs.form.getValues();
			const { hideEdit} = this.props;
			return this.props.create(formValues, hideEdit);
	};

	onSubmit = (e) => {
			e.preventDefault();
			if (this.refs.form.formValidate()) {
				this.save();
			}
	};

	render() {
			const {categories} = this.props;
			return <ProductForm categories={categories} onSubmit={this.onSubmit} ref="form">
					<div className="col-12 d-flex justify-content-end">
							<button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
									{__('Cancel')}
							</button>
							<button type="submit" className="btn btn-success">{__('Create')}</button>
					</div>
			</ProductForm>;
	}
}
export class ProductEditForm extends Component {
	state = {
			confirm: false,
	};

	static propTypes = {
			update: PropTypes.func.isRequired,
			remove: PropTypes.func.isRequired,
			hideEdit: PropTypes.func.isRequired,
			product: PropTypes.object.isRequired,
	};

	showConfirm = () => {
			this.setState({confirm: true})
	};

	cancelConfirm = () => {
		this.setState({confirm: false})
	};

	remove = () => {
		const{hideEdit} = this.props;
		const productId = this.props.product.id;
		return this.props.remove(productId,hideEdit)
	};

	save = () => {//(formValues, productId, updateStateForView, hideEdit
		const {product,updateStateForView,hideEdit} = this.props;
		const productId = product.id;
		const formValues = this.refs.form.getValues();
		return this.props.update(formValues, productId, updateStateForView, hideEdit)
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.save();
	};

	render() {
		const {confirm} = this.state;
		const {categories} = this.props;
		if (confirm) {
				return <Confirm cancelRemoving={this.cancelConfirm} remove={this.remove}/>;
		}

		const {product} = this.props;
		return <ProductForm categories={categories} onSubmit={this.onSubmit} ref="form" product={product} >
				<div className="col-12 d-flex justify-content-end">
						<button type="button" className="btn btn-outline-danger mr-auto" onClick={this.showConfirm}>
								{__('Delete')}
						</button>
						<button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
								{__('Cancel')}
						</button>
						<button type="submit" className="btn btn-success">{__('Save')}</button>
				</div>
		</ProductForm>;
	}
}
