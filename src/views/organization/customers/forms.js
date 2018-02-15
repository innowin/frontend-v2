/*global __*/
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TextInput} from 'src/views/common/inputs/TextInput'
import {FileInput} from 'src/views/common/inputs/FileInput';
import {Confirm} from "../../common/cards/Confirm";


export class CustomerForm extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		customer: PropTypes.object,
	};

	getValues =  () => {
		const media = this.certPictureInput.getFile();
        const mediaId = media ? media.id : null;
		const values = {
				title: this.titleInput.getValue(),
				customer_picture: mediaId || 1, // TODO amir use media uploader
				related_customer:6,// TODO amir related customer is unknown
		};
		return values;
	};

	formValidate = () => {
			let result = true;
			const validates = [
					this.titleInput.validate(),
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
			const {organization} = this.props;
			const customer = this.props.customer || {picture: null};
			return <form onSubmit={this.props.onSubmit}>
				<div className="row">
					<TextInput
							name="title"
							required
							label={__('Title') + ": "}
							value={customer.title}
							ref={titleInput => {
								this.titleInput = titleInput
							}}
					/>
					<FileInput
							name="picture"
							label={__('Picture') + ": "}
							ref={certPictureInput => {
								this.certPictureInput = certPictureInput
							}}
							mediaId={customer.picture}
							organization={organization}
					/>

					{this.props.children}
				</div>
			</form>
	}
}


export class CustomerCreateForm extends Component {

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
			const {} = this.props;
			return <CustomerForm onSubmit={this.onSubmit} ref="form">
					<div className="col-12 d-flex justify-content-end">
							<button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
									{__('Cancel')}
							</button>
							<button type="submit" className="btn btn-success">{__('Create')}</button>
					</div>
			</CustomerForm>;
	}
}
export class CustomerEditForm extends Component {
	state = {
			confirm: false,
	};

	static propTypes = {
			update: PropTypes.func.isRequired,
			remove: PropTypes.func.isRequired,
			hideEdit: PropTypes.func.isRequired,
			customer: PropTypes.object.isRequired,
	};

	showConfirm = () => {
			this.setState({confirm: true})
	};

	cancelConfirm = () => {
		this.setState({confirm: false})
	};

	remove = () => {
		const{hideEdit} = this.props;
		const customerId = this.props.customer.id;
		return this.props.remove(customerId,hideEdit)
	};

	save = () => {//(formValues, customerId, updateStateForView, hideEdit
		const {customer,updateStateForView,hideEdit} = this.props;
		const customerId = customer.id;
		const formValues = this.refs.form.getValues();
		return this.props.update(formValues, customerId, updateStateForView, hideEdit)
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

		const {customer} = this.props;
		return <CustomerForm onSubmit={this.onSubmit} ref="form" customer={customer} >
				<div className="col-12 d-flex justify-content-end">
						<button type="button" className="btn btn-outline-danger mr-auto" onClick={this.showConfirm}>
								{__('Delete')}
						</button>
						<button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
								{__('Cancel')}
						</button>
						<button type="submit" className="btn btn-success">{__('Save')}</button>
				</div>
		</CustomerForm>;
	}
}
