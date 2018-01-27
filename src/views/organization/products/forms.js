/*global __*/
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TextInput} from 'src/views/common/inputs/TextInput'
import {MediaUploader} from 'src/views/common/MediaUploader';
import {Confirm} from "../../common/cards/Confirm";


export class ProductForm extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		product: PropTypes.object,
	};

	getValues =  () => {
		const media =null;// await this.refs.pictureInput.refs.component.getMedia();
		const mediaId = media ? media.id : null;
		const values = {
				title: this.refs.titleInput.getValue(),
				pictureId: mediaId, // TODO use media uploader
		};
		return values
	};

	formValidate = () => {
			let result = true;
			const validates = [
					this.refs.titleInput.validate(),
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
			const {} = this.props;
			const product = this.props.product || {picture: null};
			return <form onSubmit={this.props.onSubmit}>
				<div className="row">
					<TextInput
							name="title"
							required
							label={__('Title') + ": "}
							value={product.title}
							ref="titleInput"
					/>
					<MediaUploader
							name="picture"
							label={__('Picture') + ": "}
							ref="pictureInput"
							media={product.picture}
							organization={null}
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

	save = async () => {
			const formValues = await this.refs.form.getValues();
			const { hideEdit} = this.props;
			return this.props.create(formValues, hideEdit);
	};

	onSubmit = (e) => {
			e.preventDefault();
			if (this.refs.form.formValidate()) {
					this.save()
							.then(res => {
									this.props.hideEdit();
							})
							.catch(err => {
							});
			}
	};

	render() {
			const {} = this.props;
			return <ProductForm onSubmit={this.onSubmit} ref="form">
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
		const productId = this.props.product.id;
		return this.props.remove(productId)
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
		if (confirm) {
				return <Confirm cancelRemoving={this.cancelConfirm} remove={this.remove}/>;
		}

		const {product} = this.props;
		return <ProductForm onSubmit={this.onSubmit} ref="form" product={product} >
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
