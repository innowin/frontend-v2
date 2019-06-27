// @flow
import * as React from "react"
import * as PropTypes from 'prop-types'

// flow type of EditFormButtons
type PropsUserInfoEditForm = {|
  translate: { [string]: string },
  onDeleteClick?: Function,
  onCancelClick: Function,
|}

class EditFormButtons extends React.Component<PropsUserInfoEditForm> {
  render() {
    const {translate, onCancelClick, onDeleteClick} = this.props
    return (
        <div className="edit-cancel-buttons-container">
          {onDeleteClick &&
          <button type="button" className="button delete-button" onClick={onDeleteClick}>
            {translate['Delete']}
          </button>
          }
          <button type="button" className="button cancel-button" onClick={onCancelClick}>
            {translate['Cancel']}
          </button>
          <button type="submit" className="button submit-button">{translate['Submit']}</button>
        </div>
    )
  }
}

EditFormButtons.propTypes = {
  translate: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
}

export default EditFormButtons