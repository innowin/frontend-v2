// @flow
import * as React from "react";
import {Fragment} from "react";
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {certificateType} from 'src/consts/flowTypes/user/others'

type CertificateProps = {
  owner: identityType,
  translate: TranslatorType,
  certificates: [certificateType]
}

export default (props: CertificateProps) => {
  const {owner, translate, certificates} = props
  return (
      <Fragment>
        <div className="card-header">
          <div className="header-title">
            {translate['Certificate']}
          </div>
        </div>
        <div className="content">
          {certificates.map(certificate => 'ceritificate')}
        </div>
      </Fragment>
  )
}