import React from 'react'
import {
  CertificateIcon,
  ContributionIcon,
  SkillIcon,
  // ConsultIcon,
  ItemsAndPropertiesIcon,
  InformationIcon,
  CircularAddIcon
} from '../../../images/icons'

export const MainCategories = [  // need for fetching and creating this list dynamical.
  {
    value: 'product',
    svg: (<ContributionIcon className="new-contribution-category-image"/>),
    label: 'محصول',
  },
  {
    value: 'skill',
    svg: (<SkillIcon className="new-contribution-category-image skill-icon"/>),
    label: 'مهارت',
  },
  // {
  //   value: 'certificate',
  //   svg: (<CertificateIcon className="new-contribution-category-image"/>),
  //   label: 'تاییدیه',
  // },
  // {
  //   value: '4',
  //   svg: (<ConsultIcon className="new-contribution-category-image"/>),
  //   label: 'مشاوره',
  // },
  // {
  //   value: '5',
  //   svg: (<div className="new-contribution-category-image">?</div>),
  //   label: 'زیرساخت قابل اشتراک',
  // },
]

export const WRAPPER_CLASS_NAMES = {
  ENTERING: 'entering',
  ENTERED: 'entered',
  EXITING: 'exiting',
}
export const PROGRESSIVE_STATUS_CHOICES = {
  GOING_NEXT: 'going-next',
  GOING_PREV: 'going-next',
  ACTIVE: 'active'
}
export const CERTIFICATES_IMG_IDS = [
  'certificate1img',
  'certificate2img',
  'certificate3img',
]
export const TYPES = {
  PERSON: 'person',
  ORG: 'organization'
}

export const tags = [  //
  {value: 1, label: 'برچسب ۱', usedCount: 5},
  {value: 2, label: 'برچسب ۲', usedCount: 4},
  {value: 3, label: 'برچسب ۳', usedCount: 33},
  {value: 4, label: 'برچسب ۴', usedCount: 44},
  {value: 5, label: 'برچسب ۵', usedCount: 21},
  {value: 6, label: 'برچسب ۶', usedCount: 12},
  {value: 7, label: 'برچسب ۷', usedCount: 11},
  {value: 8, label: 'برچسب ۸', usedCount: 1},
  {value: 9, label: 'برچسب ۹', usedCount: 7},
  {value: 10, label: 'برچسب ۱۰', usedCount: 8},
]

export const FILE_FIELDS = {
  FILE: 'picture_original',
  PRODUCT: 'picture_product',
  ORIGINAL: 'picture_original'
}

export const LAYER1S = { // the name of layer 1 inputs in state.newContributionData
  NEW_CERT_TITLE: 'title', // ! need for care
  NEW_CERT_IMAGE: 'certPicture',
  NEW_CERT_LOGO: 'certLogo',
  NEW_CERT_INDEX: 'newCertificateIndex',
  NEW_CERT_NEED_FOR_VERIFY: 'validation_request_flag',
  NAME: 'name',
  CATEGORY_LAYER1: 'categoryLevel1',
  CATEGORY_LAYER2: 'categoryLevel2',
  CATEGORY_LAYER3: 'product_category',
  COUNTRY: 'product_related_country',
  PROVINCE: 'product_related_province',
  CITY: 'product_related_town',
  PRICE_STATUS: 'product_price_type',
  CURRENCY: 'currency',
  DESCRIPTION: 'description',
  CERT_TITLE: 'certificateTitle',
  CERT_NEED_FOR_VERIFY: 'certificateNeedForVerify',
  GALLERY_VIDEO_NAME: 'galleryVideo',
  PRODUCT_OWNER: 'product_owner'
}

export const PROGRESS_STEPS = {
  product: [
    {title: 'آورده جدید', icon: (<CircularAddIcon className="progress-step-icon"/>)},
    {title: 'اطلاعات اولیه', icon: (<InformationIcon className="progress-step-icon"/>)},
    {title: 'مشخصات فنی', icon: (<ItemsAndPropertiesIcon className="progress-step-icon"/>)},
    {title: 'گواهی‌نامه‌ها', icon: (<CertificateIcon className="progress-step-icon"/>)},
    {title: 'مدیریت ویترین', icon: (<ContributionIcon className="progress-step-icon"/>)},
  ],
  skill: [
    {title: 'آورده جدید', icon: (<CircularAddIcon className="progress-step-icon"/>)},
    {title: 'مشخصات', icon: (<InformationIcon className="progress-step-icon"/>)},
  ]
}

export const skillFields = {
  title: 'title',
  desc: "description"
}