import React from 'react'
import {CertificateIcon, ContributionIcon, SkillIcon, ConsultIcon, TipsIcon} from '../../../images/icons'
export const categoriesData = [
    {
        value: 'ctgLevel1_1',
        label: 'طبقه اول ۱',
        children: [
            {
                value: 'ctgLevel2_1',
                label: 'طبقه دوم ۱ ',
                children: [
                    {value: 'ctgLevel3_1', label: 'طبقه سوم ۱'},
                    {value: 'ctgLevel3_2', label: 'طبقه سوم ۲'},
                    {value: 'ctgLevel3_3', label: 'طبقه سوم ۳'},
                    {value: 'ctgLevel3_4', label: 'طبقه سوم ۴'},
                ]
            },
            {
                value: 'ctgLevel2_2',
                label: 'طبقه دوم ۲',
                children: [
                    {value: 'ctgLevel3_5', label: 'طبقه سوم ۵'},
                    {value: 'ctgLevel3_6', label: 'طبقه سوم ۶'},
                    {value: 'ctgLevel3_7', label: 'طبقه سوم ۷'},
                    {value: 'ctgLevel3_8', label: 'طبقه سوم ۸'},
                ]
            },
            {
                value: 'ctgLevel2_3',
                label: 'طبقه دوم ۳',
                children: [
                    {value: 'ctgLevel3_9', label: 'طبقه سوم ۹'},
                    {value: 'ctgLevel3_10', label: 'طبقه سوم ۱۰'},
                ]
            }
        ]
    },
    {
        value: 'ctgLevel1_2',
        label: 'طبقه اول ۲',
        children: [
            {
                value: 'ctgLevel2_4',
                label: 'طبقه دوم ۴',
                children: [
                    {value: 'ctgLevel3_11', label: 'طبقه سوم ۱۱'},
                    {value: 'ctgLevel3_12', label: 'طبقه سوم ۱۲'},
                    {value: 'ctgLevel3_13', label: 'طبقه سوم ۱۳'},
                ]
            },
            {
                value: 'ctgLevel2_5',
                label: 'طبقه دوم ۵',
                children: [
                    {value: 'ctgLevel3_14', label: 'طبقه سوم ۱۴'},
                ]
            },
            {
                value: 'ctgLevel2_6',
                label: 'طبقه دوم ۶',
                children: [
                    {value: 'ctgLevel3_15', label: 'طبقه سوم ۱۵'},
                ]
            }
        ]
    },
    {
        value: 'ctgLevel1_3',
        label: 'طبقه اول ۳',
        children: [
            {
                value: 'ctgLevel2_7',
                label: 'طبقه دوم ۷',
                children: [
                    {value: 'ctgLevel3_16', label: 'طبقه سوم ۱۶'},
                    {value: 'ctgLevel3_17', label: 'طبقه سوم ۱۷'},
                    {value: 'ctgLevel3_18', label: 'طبقه سوم ۱۸'},
                    {value: 'ctgLevel3_19', label: 'طبقه سوم ۱۹'},
                ]
            },
        ]
    },
]

export const newContributionMainCategories = [  // need for fetching and creating this list dynamical.
        {
            value: 'product',
            svg: (<ContributionIcon className="new-contribution-category-image" />),
            label: 'محصول',
        },
        {
            value: 'skill',
            svg: (<SkillIcon className="new-contribution-category-image skill-icon" />),
            label: 'توانمندی',
        },
        {
            value: 'certificate',
            svg: (<CertificateIcon className="new-contribution-category-image" />),
            label: 'تاییدیه',
        },
        {
            value: '4',
            svg: (<ConsultIcon className="new-contribution-category-image" />),
            label: 'مشاوره',
        },
        {
            value: '5',
            svg: (<div className="new-contribution-category-image">?</div>),
            label: 'زیرساخت قابل اشتراک',
        },
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
export const GALLERY_VIDEO_NAME = 'galleryVideo'

export const logoFieldName = 'contributionLogo'

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

export const LAYER1S = { // the name of layer 1 inputs in state.newContributionData
    NEW_CERT_TITLE: 'newCertificateTitle',
    NEW_CERT_IMAGE: 'newCertificateImage',
    NEW_CERT_LOGO: 'newCertificateLogo',
    NEW_CERT_NEED_FOR_VERIFY: 'newCertificateNeedForVirify',
    NAME: 'title',
    CATEGORY_LAYER1: 'categoryLevel1',
    CATEGORY_LAYER2: 'categoryLevel2',
    CATEGORY_LAYER3: 'categoryLevel3',
    PROVINCE: 'province',
    PRICE_STATUS: 'priceStatus',
    CURRENCY: 'currency',
    DESCRIPTION: 'description',
    CERT_TITLE: 'certificateTitle',
    CERT_NEED_FOR_VERIFY: 'certificateNeedForVerify',
    GALLERY_VIDEO_NAME: 'galleryVideo'
}
