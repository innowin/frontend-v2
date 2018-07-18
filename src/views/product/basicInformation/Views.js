// @flow
import * as React from "react"
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
import type {ProductType} from "src/consts/flowTypes/product/productTypes"
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"

type ProductDescriptionWrapperProps = {
	children: React.Node,
}

export const ProductDescriptionWrapper = (props: ProductDescriptionWrapperProps) => {
	const {children} = props
	return (
			<ItemWrapper icon={userInfoIcon}>{children}</ItemWrapper>
	)
}

type ProductDescriptionProps = {
    jobTitle: string,
	userID: number,
	firstName: string,
	lastName: string,
	isEdit: boolean,
    translator: TranslatorType
}
export const ProductDescription = (props: ProductDescriptionProps) => {
	const {jobTitle, userID , firstName , lastName, isEdit, translator} = props
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
						<button className="btn btn-outline-danger">{translator['Delete']}</button>:<Link to="#">connect</Link>
					}
				</div>
			</div>
	)
}

type ProductDescriptionViewProps = {
    description: string,
	showEdit: Function,
	translator: TranslatorType
}

export const ProductDescriptionView = (props: ProductDescriptionViewProps) => {
    const {description, showEdit, translator} = props
    return (
        <ProductDescriptionWrapper>
            <ItemHeader title={translator['Description']} showEdit={showEdit}/>
            <div className="members-wrapper">
                {
                    description
                }
            </div>
        </ProductDescriptionWrapper>
    )
}

type ProductInfoItemWrapperProps = {
	children: React.Node
}

export const ProductInfoItemWrapper = (props: ProductInfoItemWrapperProps) => {
	const {children} = props
	return (
		<ItemWrapper icon={userInfoIcon}>{children}</ItemWrapper>
	)
}

type ProductCategoryProps = {
	name: string
}
type ownerType = {
	name: string
}
type ProductInfoViewProps = {
    product: ProductType,
	product_category: ProductCategoryProps,
	owner: ownerType,
	showEdit: Function,
	translator: TranslatorType
}
export const ProductInfoView = (props: ProductInfoViewProps) => {
    const {product,product_category, owner, showEdit, translator} = props
    return (
        <ProductInfoItemWrapper>
            <ItemHeader title={translator['Product info']} showEdit={showEdit}/>
            <Field>
                <FieldLabel label={translator['Name'] + ": "}/>
                <FieldValue value={product.name}/>
            </Field>
            <Field>
                <FieldLabel label ={translator['Category']+": "}/>
                <FieldValue value={product_category.name}/>
            </Field>
            <Field>
                <FieldLabel label ={translator['Product Owner']+": "}/>
                <FieldValue value={owner.name}/>
            </Field>
            <Field>
                <FieldLabel label={translator['Country'] + ": "}/>
                <FieldValue value={product.country}/>
            </Field>
            <Field>
                <FieldLabel label={translator['Province'] + ": "}/>
                <FieldValue value={product.province}/>
            </Field>
            <Field>
                <FieldLabel label={translator['City'] + ": "}/>
                <FieldValue value={product.city}/>
            </Field>

        </ProductInfoItemWrapper>
    )
}

