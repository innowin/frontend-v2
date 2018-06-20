/*global __*/
import React, {Component} from "react"
import PropTypes from "prop-types"
import {userInfoIcon} from "src/images/icons"
import {Link} from 'react-router-dom'
import {DefaultUserIcon} from 'src/images/icons'
import {
	Field,
	FieldLabel,
	FieldValue,
	ItemHeader,
	ItemWrapper,
} from '../../common/cards/Frames'
// import {ProductMembers} from "./index";

export const ProductDescriptionWrapper = ({children}) => {
	return (
			<ItemWrapper icon={userInfoIcon}>{children}</ItemWrapper>
	)
};

export const ProductDescription = ({jobTitle, userID , firstName , lastName, isEdit}) => {
	return (
			<div className="member-wrapper">
				<div className="image-wrapper">
          <Link to={`/user/${userID}`}>
						<DefaultUserIcon/>
					</Link>
				</div>
				<div className="details">
					<div>
						<div className="name">{firstName} {lastName}</div>
						<div className="job-title">{jobTitle}</div>
					</div>
					{(isEdit) ?
						<button className="btn btn-outline-danger">{__('Delete')}</button>:<Link to="#">connect</Link>
					}
				</div>
			</div>
	)
};

export class ProductDescriptionView extends Component {
	static propTypes = {
		showEdit: PropTypes.func.isRequired,
		product: PropTypes.object.isRequired,
	};
	render() {
		const {description, showEdit} = this.props;
		return (
				<ProductDescriptionWrapper>
					<ItemHeader title={__('Description')} showEdit={showEdit}/>
					<div className="members-wrapper">
						{
							description
						}
					</div>
				</ProductDescriptionWrapper>
		)
	}
}

export const ProductInfoItemWrapper = ({children}) => {
	return (
			<ItemWrapper icon={userInfoIcon}>{children}</ItemWrapper>
	)
};

export class ProductInfoView extends Component {
	static propTypes = {
		showEdit: PropTypes.func.isRequired,
		product: PropTypes.object.isRequired,
	};
	render() {
		const {product,product_category, owner, showEdit} = this.props;
		return (
				<ProductInfoItemWrapper>
					<ItemHeader title={__('Product info')} showEdit={showEdit}/>
					<Field>
						<FieldLabel label={__('Name') + ": "}/>
						<FieldValue value={product.name}/>
					</Field>
					<Field>
						<FieldLabel label ={__('Category')+": "}/>
						<FieldValue value={product_category.name}/>
					</Field>
					<Field>
						<FieldLabel label ={__('Product Owner')+": "}/>
						<FieldValue value={owner.name}/>
					</Field>
					<Field>
						<FieldLabel label={__('Country') + ": "}/>
						<FieldValue value={product.country}/>
					</Field>
					<Field>
						<FieldLabel label={__('Province') + ": "}/>
						<FieldValue value={product.province}/>
					</Field>
					<Field>
						<FieldLabel label={__('City') + ": "}/>
						<FieldValue value={product.city}/>
					</Field>

				</ProductInfoItemWrapper>
		)
	}
}

