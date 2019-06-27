// @flow
import * as React from 'react'
import client from 'src/consts/client'
import * as PropTypes from 'prop-types'

type checkOwnerProps = {
  id: ?number | ?string | null,
  children?: React.Node,
  showForOwner?: boolean
}

const checkOwner = ({children, id, showForOwner = true}: checkOwnerProps) => {
    return showForOwner
      ? (client.checkIdWithQueryId(+id) ? children : '')
      : (client.checkIdWithQueryId(+id) ? '' : children)
}

checkOwner.propTypes = {
  id: PropTypes.number,
  showForOwner: PropTypes.bool,
}

export default checkOwner