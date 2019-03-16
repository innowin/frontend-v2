// @flow
import * as React from 'react'
import CardContainer from '../../cardContainer'
import DescriptionView from './descriptionView'
import DescriptionForm from './descriptionForm'

type Props = {
  isEdit: boolean
}

export default ({isEdit}:Props) => {
  return (
      <CardContainer>
        {
          !!isEdit ? <DescriptionView/> : <DescriptionForm/>
        }
      </CardContainer>
 )
}