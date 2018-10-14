import React from 'react'
import {ItemsAndPropertiesIcon, SocialIcon, InformationIcon} from "src/images/icons"

export const progressiveSteps =  [
  {title: 'ایجاد بورس', icon: (<InformationIcon className="progress-step-icon"/>)},
  {title: 'مشخصات بورس', icon: (<ItemsAndPropertiesIcon className="progress-step-icon"/>)},
  {title: 'افزودن اعضا', icon: (<SocialIcon className="progress-step-icon"/>)},
]

export const PROGRESSIVE_STATUS_CHOICES = {
  GOING_NEXT: 'going-next',
  GOING_PREV: 'going-next',
  ACTIVE: 'active'
}

export const WRAPPER_CLASS_NAMES = {
  ENTERING: 'entering',
  ENTERED: 'entered',
  EXITING: 'exiting',
}
