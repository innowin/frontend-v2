// @flow
import * as React from 'react'
import * as PropTypes from 'prop-types'

import ExchangeCard from '../../../common/components/ExchangeCard'

type ContentUserProps = {
  translate: { [string]: string },
}

const ExtendRelationsExchanges = (props: ContentUserProps) => {
  const {translate} = props

  return (
      <div className='extend-relations-users-container'>
        <h5 className='users-text'>{translate['Windows']}</h5>
        <div className='users-container'>
          <div className='user-container'><ExchangeCard followed={true} translate={translate}/></div>
          <div className='user-container'><ExchangeCard translate={translate}/></div>
          <div className='user-container'><ExchangeCard followed={true} translate={translate}/></div>
          <div className='user-container'><ExchangeCard translate={translate}/></div>
          <div className='user-container'><ExchangeCard translate={translate}/></div>
          <div className='user-container'><ExchangeCard translate={translate}/></div>
          <div className='user-container'><ExchangeCard translate={translate}/></div>
          <div className='user-container'><ExchangeCard translate={translate}/></div>
          <div className='user-container'><ExchangeCard translate={translate}/></div>
          <div className='user-container'><ExchangeCard translate={translate}/></div>
          <div className='user-container'><ExchangeCard translate={translate}/></div>
          <div className='user-container'><ExchangeCard translate={translate}/></div>
          <div className='user-container'><ExchangeCard translate={translate}/></div>
          <div className='user-container'><ExchangeCard translate={translate}/></div>
          <div className='user-container'><ExchangeCard translate={translate}/></div>
        </div>
      </div>
  )
}

ExtendRelationsExchanges.propTypes = {
  translate: PropTypes.object.isRequired,
}

export default ExtendRelationsExchanges