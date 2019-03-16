// @flow
import * as React from 'react'
import {TranslatorType} from '../../../consts/flowTypes/common/commonTypes'

type Props = {
  translate: TranslatorType,
  toggleEdit: Function,
}
const ConfirmFormButton = (props: Props) => {
  const {translate, toggleEdit} = props

  return (
      <div className='buttons-container'>
        <button className='button submit-button pulse'>
          {translate['Submit Changes']}
        </button>
        <div className='button cancel-button pulse' onClick={toggleEdit}>
          {translate['Cancel']}
        </div>
      </div>
  )
}

export default ConfirmFormButton