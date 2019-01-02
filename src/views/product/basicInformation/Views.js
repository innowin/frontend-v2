// @flow
import * as React from "react"
import {InformationIcon} from "src/images/icons"
import {
  Field,
  FieldLabel,
  FieldValue,
  ItemHeader,
  ItemWrapper,
} from '../../common/cards/Frames'
import type {ProductType} from "src/consts/flowTypes/product/productTypes"
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"
import {DOMAIN} from "src/consts/URLS"
import {Tag} from '../../common/tags/tag'
import type {TagType} from "../../common/tags/tag";
import Moment from 'react-moment'


type ProductDescriptionViewProps = {
  description: string,
  showEdit: Function,
  translator: TranslatorType
}

export const ProductDescriptionView = (props: ProductDescriptionViewProps) => {
  const {description, showEdit, translator} = props
  return (
      <ItemWrapper icon={<InformationIcon/>}>
        <ItemHeader title={translator['Description']} showEdit={showEdit} param={null}/>
        <div className="product-desc">{description}
        </div>
      </ItemWrapper>
  )
}


type ProductInfoItemWrapperProps = {
  children: React.Node
}

export const ProductInfoItemWrapper = (props: ProductInfoItemWrapperProps) => {
  const {children} = props
  return (
      <ItemWrapper icon={<InformationIcon/>}>{children}</ItemWrapper>
  )
}


type ProductCategoryProps = {
  name: string
}

type ownerType = {
  name: string
}

export type ProvinceType = {
  name: string
}
export type CountryType = {
  name: string
}

type ProductInfoViewProps = {
  category: string,
  product_category: ProductCategoryProps,
  owner: ownerType,
  showEdit: Function,
  translator: TranslatorType,
  province: string,
  country: string,
  productId: string
}

export const ProductInfoView = (props: ProductInfoViewProps) => {
  const {category, owner, showEdit, created_time, province, country, productId} = props
  const fields = [
    {value: category, label: 'طبقه‌بندی دسته', key: 1},
    {value: `${province}-${country}`, label: 'محدوده جغرافیایی', key: 2},
    {value: `${DOMAIN}/product/${productId}/basicInformation`, label: 'لینک محصول', key: 3},
    {value: <span><Moment element="span" fromNow ago>{created_time}</Moment> پیش</span>, label: 'تاریخ ثبت در اینوین', key: 4},
    {value: owner.name, label: 'ارائه دهنده محصول', key: 5}
  ]
  return (
      <ProductInfoItemWrapper>
        <ItemHeader title='مشخصات اولیه' showEdit={showEdit} param={null}/>
        {fields.map(({label, value, key}) => (
            <Field key={key}>
              <FieldLabel label={`${label}: `}/>
              <FieldValue value={value}/>
            </Field>
        ))}
      </ProductInfoItemWrapper>
  )
}

type AttrsType = {
  [string]: string
}
type TechnicalInfoViewProps = {
  attrs: AttrsType,
  showEdit: Function
}

export const TechnicalInfoView = (props: TechnicalInfoViewProps) => {
  const {attrs, showEdit} = props

  return (
      <ProductInfoItemWrapper>
        <ItemHeader title='مشخصات فنی' showEdit={showEdit}/>
        {Object.keys(attrs).map((key) => (
            <Field key={`product-info-field-${key}`}>
              <FieldLabel label={`${key}: `}/>
              <FieldValue value={attrs[key]}/>
            </Field>
        ))}
      </ProductInfoItemWrapper>
  )
}

type HashTagsViewProps = {
  showEdit: Function,
  tags: Array<TagType>
}
export const HashTagsView = (props: HashTagsViewProps) => {
  const {tags, showEdit} = props

  return (
      <ProductInfoItemWrapper>
        <ItemHeader title='برچسب‌ها' showEdit={showEdit}/>
        {tags.map(tag => <Tag key={`productTag${tag.title}`} title={tag.title}/>)}
      </ProductInfoItemWrapper>
  )
}