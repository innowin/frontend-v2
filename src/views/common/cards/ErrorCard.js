// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {getMessages} from "src/redux/selectors/translateSelector"

const ErrorCard = (props) => {
    const {retry, header, translate} = props
    return (
      <div className="card mt-3">
        <div className="card-block">
          <h3>{header}</h3>
          {translate['Error']}
          <button className="btn btn-secondary" onClick={retry}>{translate['Retry']}</button>
        </div>
      </div>
    )
}
ErrorCard.propTypes = {
  retry: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  translate: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  translate: getMessages(state)
})
export default connect(mapStateToProps)(ErrorCard)
