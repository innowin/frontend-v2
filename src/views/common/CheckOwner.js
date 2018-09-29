// @flow
import * as React from 'react'
import client from 'src/consts/client'
import PropTypes from 'prop-types'

type checkOwnerProps = {
  id: ?number,
  children?: React.Node,
  showForOwner?: boolean
}

const CheckOwner = ({children, id, showForOwner = true}: checkOwnerProps) => {
    return showForOwner
      ? (client.checkIdWithQueryId(+id) ? children : '')
      : (client.checkIdWithQueryId(+id) ? '' : children)
}

CheckOwner.propTypes = {
  id: PropTypes.number.isRequired,
  showForOwner: PropTypes.bool,
}

export default CheckOwner