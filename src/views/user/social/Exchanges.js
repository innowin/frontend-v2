// @flow
import * as React from "react"
import PropTypes from "prop-types"
import "moment/locale/fa"
import type {exchangeType} from "src/consts/flowTypes/exchange/exchange"
import {DefaultExchangeIcon} from "src/images/icons"
import {ItemWrapper, ItemHeader} from "src/views/common/cards/Frames"
import {Link} from 'react-router-dom'
import {SocialIcon} from "src/images/icons"
import FontAwesome from "react-fontawesome";

type PropsExchangesView = {
  exchanges: (exchangeType)[],
  edit: boolean,
  showEdit: Function,
  removeMembership: Function,
  translate: { [string]: string }
}

export const Exchanges = (props: PropsExchangesView) => {
  const {exchanges, edit, showEdit, removeMembership, translate} = props
  return (
      <ItemWrapper icon={<SocialIcon/>}>
        <ItemHeader title={translate['Joined exchanges'] + ` (${exchanges.length})`} showEdit={showEdit}/>
        <div className="members-wrapper row mr-0 ml-0">
          {
            exchanges.map((exchange) => {
              return (
                  <div className="member-wrapper col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="image-wrapper">
                      <Link to={`/exchange/${exchange.id}`}>
                        {
                          (!exchange.exchange_image) ? (<DefaultExchangeIcon/>) : (
                              <img alt="" src={exchange.exchange_image.file} className="rounded-circle"/>)
                        }
                      </Link>
                    </div>
                    <div className="details">
                      <div className="text-section">
                        <div className="name">{exchange.name}</div>
                        <div className="description">{exchange.description}</div>
                      </div>
                      {(edit) ?
                          <FontAwesome name="trash" className='remove-follow pulse' onClick={() => removeMembership({identityId: exchange.id})}/>
                          : ('')
                      }
                    </div>
                  </div>
              )
            })
          }
        </div>
      </ItemWrapper>
  )
}

Exchanges.propsTypes = {
  edit: PropTypes.bool,
  showEdit: PropTypes.func.isRequired,
  exchanges: PropTypes.arrayOf(PropTypes.object),
  removeMembership: PropTypes.func.isRequired,
  translate: PropTypes.object.isRequired
}