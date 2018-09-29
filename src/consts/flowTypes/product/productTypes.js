// type ProductType = {
//     description?: string
// }
// export type ProductInfoState = {
//     product: ProductType,
//     product_category: {},
//     owner: {},
//     error: string,
//     edit: boolean,
//     isLoading: boolean
// }
// type ProductInfoProps = {
//     productId: number
// }
// type BasicInfoProps = {
//     productId: number,
//     translator: Object
// }

export type ProfileType = {
    profile_media: number
}

export type UserType = {
    first_name: string,
    last_name: string,
    username: string
}

export type RepresentType = {
    created_time: string,
    id: number,
    post_description: string
}

export type CategoryType = {
    name: string,
    id: number
}

export type ProductType = {
    description: string,
    id: number,
    name: string,
    province: string,
    country: string,
    city: string,
    product_category: number
}

export type PictureType = {
    picture_media: {}
}
export type PriceType = {
    value: number
}
export type ContributionType = {} // !? what is the type?

export type ProductGetType = {
  id: number,
  product_category: {
    id: number,
    created_time: string,
    updated_time: string,
    delete_flag: boolean,
    name: string,
    title: string,
    creatable: boolean,
    category_parent: {}
  },
  product_user: {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string
  },
  product_owner: {
    id: number,
    identity_user: {
      id: number,
      username: string,
      first_name: string,
      last_name: string,
      email: string
    },
    created_time: string,
    delete_flag: boolean,
    child_name: string,
    name: string,
    accepted: boolean,
    mobile_verified: boolean,
    email_verified: boolean,
    identity_organization: {}
  },
  created_time: string,
  updated_time: string,
  delete_flag: boolean,
  name: string,
  description: string,
  attrs: {},
  custom_attrs: {},
  product_price_type: string,
  product_related_country: number,
  product_related_province: number,
  product_related_town: number
}

export type ProductFormValuesType = {

}