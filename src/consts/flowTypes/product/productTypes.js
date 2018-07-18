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
    title: string,
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
