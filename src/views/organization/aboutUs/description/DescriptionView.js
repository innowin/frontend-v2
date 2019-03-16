// @flow
import * as React from "react";
import {Fragment} from "react";
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'

type DescriptionProps = {
  organization: identityType,
  translate: TranslatorType,
}

export default (props: DescriptionProps) => {
  const {organization, translate} = props
  return (
      <Fragment>
        <div className="card-header">
          <div className="header-title">
            {translate['Organization biography']}
          </div>
        </div>
        <div className="content">
          {organization.biography}
        </div>
      </Fragment>
  )
}