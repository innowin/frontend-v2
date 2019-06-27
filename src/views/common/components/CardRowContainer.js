// @flow
import * as React from 'react'
import Moment from 'react-moment'
import * as PropTypes from 'prop-types'
import {connect} from 'react-redux'

import type {fileType} from 'src/consts/flowTypes/common/fileType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import {getMessages} from 'src/redux/selectors/translateSelector'

type Props = {
  title: string,
  createdTime?: string,
  entityImage?: fileType,
  fromDate?: string,
  toDate?: string,
  svgImage: React$Element<any>,
  children: React$Element<any>,
  translate: TranslatorType,
}

/* usage example
<CardRowContainer key={'certificate ' + certificate.id} title={translate['Certificate']} svgImage={<LinkedInIcon/>}>
  <div className='card-row-content-right'>
    <CheckOwner id={owner.id}>
      <EditIcon className='edit-icon pulse'/>
    </CheckOwner>
    object content
  </div>
  {objectHasImage &&
  <img src={objectImage.file} className='card-row-content-image' alt='object image'/>
  }
</CardRowContainer>
 */

const CardRowContainer = (props: Props) => {
  const isMobile = window.innerWidth <= 480
  const {title, children, svgImage, createdTime, translate, entityImage, fromDate, toDate} = props
  return (
      <div className='card-row-container'>
        <div className='card-row-main'>
          <div className='card-row-sidebar'>
            {svgImage}
            <span className='title'>{title}</span>
          </div>
          <div className='card-row-content'>
            {children}
            {!isMobile && entityImage &&
            <img src={entityImage.file} className='card-row-content-image' alt='card'/>
            }
          </div>
          {isMobile && entityImage &&
          <img src={entityImage.file} className='card-row-content-image' alt='card'/>
          }
        </div>

        {createdTime &&
        <div className='card-row-date'>
          <Moment className="-green2" element="span" fromNow ago>{createdTime}</Moment>
          <span className="-green2"> {translate['Last']} </span>
        </div>
        }

        {(fromDate || toDate) &&
        <div className='card-row-date'>
          {toDate && <span className="-green2">{toDate}</span>}
          {fromDate && toDate && <span className="-green2"> - </span>}
          {fromDate && <span className="-green2">{fromDate}</span>}
        </div>
        }
      </div>
  )
}

CardRowContainer.propTypes = {
  title: PropTypes.string.isRequired,
  createdTime: PropTypes.string,
  entityImage: PropTypes.object,
  fromDate: PropTypes.string,
  toDate: PropTypes.string,
  translate: PropTypes.object,
}

const mapStateToProps = (state, ownProps) => {
  return {
    translate: getMessages(state),
  }
}

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CardRowContainer)
