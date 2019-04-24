import * as React from 'react'
import PropTypes from 'prop-types'

import Modal from '../pages/modal/modal'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'

type Props = {
  open?: boolean,
  closer: Function,
  deleteEntity: Function,
  translate: TranslatorType,
}

const ConfirmDeleteModal = (props: Props) => {
  const {open, closer, translate, deleteEntity} = props
  return (
      <Modal open={open} closer={closer}>
        <div className='event-modal warning-modal'>
          <p className='title'>{translate['Are you sure? Do you want delete it?']}</p>
          <div className='buttons-container'>
            <button onClick={deleteEntity} className='button sure'>{translate['Yes, Do it.']}</button>
            <button onClick={closer}
                    className='button cancel'>{translate['No, Cancel please.']}</button>
          </div>
        </div>
      </Modal>
  )
}

ConfirmDeleteModal.propTypes = {
  open: PropTypes.bool,
  closer: PropTypes.func.isRequired,
  deleteEntity: PropTypes.func.isRequired,
  translate: PropTypes.object.isRequired,
}

export default ConfirmDeleteModal