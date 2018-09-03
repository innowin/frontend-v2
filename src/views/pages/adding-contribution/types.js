// @flow


import * as React from "react";

type TagAsOptionType = { // type of tag when used in as option in react-select.
  label: string,
  value: number,
  usage: number
}

type GalleryImageType = {

}

type NewContributionDataType = {
  tags: Array<TagAsOptionType>,
  mainGalleryImageIndex?: number,
  galleryImages: Array<GalleryImageType>,
  mainCategory: string
}


export type TechnicalPropertyType = {
  id: number,
  value: string,
  title: string
}

export type CitiesType = {
  list: {
    [number]: {}
  }
}

export type ProvincesType = {
  list: {
    [number]: {}
  }
}

export type CategoriesType = {
  list: {
    [number]: {}
  }
}

export type CountriesType = {
  list: {
    [number]: {}
  }
}

export type NewTechPropertyDataType = {
  title: string,
  value: string,
  id: number
}

export type SuccessMessageActionType = {
  title: string,
  image?: React.Node,
  handler: Function
}
