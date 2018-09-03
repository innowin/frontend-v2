// @flow
import * as React from "react"
import PropTypes from "prop-types"
import "moment/locale/fa"
import type {exchangeType} from "src/consts/flowTypes/exchange/exchange"
import {DefaultExchangeIcon} from "src/images/icons"
import {ItemWrapper, ItemHeader} from "src/views/common/cards/Frames"
import {Link} from 'react-router-dom'
import {SocialIcon} from "src/images/icons"

type PropsExchangesWrapper = {
  children?: React.Node
}
export const ExchangesWrapper = ({children}: PropsExchangesWrapper) => {
  return (
    <ItemWrapper icon={<SocialIcon/>}>{children}</ItemWrapper>
  )
}


type PropsExchangesView = {
  exchanges: (exchangeType)[],
  exchangesImg: (?string)[],
  exchangeIdentityIds: (number)[],
  edit: boolean,
  showEdit: Function,
  removeMembership: Function,
  translate: { [string]: string }
}

export const ExchangesView = (props: PropsExchangesView) => {
  const {exchanges, exchangesImg, exchangeIdentityIds, edit, showEdit, removeMembership, translate} = props
  return (
    <ExchangesWrapper>
      <ItemHeader title={translate['Joined exchanges'] + ` (${exchanges.length})`} showEdit={showEdit}/>
      <div className="members-wrapper row mr-0 ml-0">
        {
          exchanges.map((exchange, i) => {
            return (
              <ExchangeView
                edit={edit}
                index={i}
                removeMembership={removeMembership}
                exchangeIdentityId={exchangeIdentityIds[i]}
                exchange={exchange}
                exchangeImg={exchangesImg[i]}
                userID={exchange.owner.id}
                key={i + "ExchangesView-in-social"}
              />
            )
          })
        }
      </div>
    </ExchangesWrapper>
  )
}
ExchangesView.propsTypes = {
  edit: PropTypes.bool,
  showEdit: PropTypes.func.isRequired,
  exchanges: PropTypes.arrayOf(PropTypes.object),
  exchangesImg: PropTypes.array,
  exchangeIdentityIds: PropTypes.array,
  removeMembership: PropTypes.func.isRequired,
  translate: PropTypes.object.isRequired
}


type PropsExchangeView = {
  exchange: exchangeType,
  exchangeImg: ?string,
  exchangeIdentityId: number,
  removeMembership: Function,
  index: number,
  edit: boolean
}

export const ExchangeView = (props: PropsExchangeView) => {
  const removeExchangeMembership = () => {
    const {exchangeIdentityId, removeMembership, index} = props
    removeMembership(exchangeIdentityId, index)
  }
  const {exchange, exchangeImg, edit} = props
  return (
    <div className="member-wrapper col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
      <div className="image-wrapper">
        <Link to={`/exchange/${exchange.id}`}>
          {
            (!exchangeImg) ? (<DefaultExchangeIcon/>) : (
              <img alt="" src={exchangeImg} className="rounded-circle"/>)
          }
        </Link>
      </div>
      <div className="details">
        <div className="text-section">
          <div className="name">{exchange.name}</div>
          <div className="description">{exchange.description}</div>
        </div>
        {(edit) ?
          <i className="fa fa-trash cursor-pointer mb-auto" onClick={removeExchangeMembership}/> : ('')
        }
      </div>
    </div>
  )
}

ExchangeView.propTypes = {
  exchange: PropTypes.object.isRequired,
  exchangeImg: PropTypes.string,
  exchangeIdentityId: PropTypes.number.isRequired,
  removeMembership: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  edit: PropTypes.bool,
}