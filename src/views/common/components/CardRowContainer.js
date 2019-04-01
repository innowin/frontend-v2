import * as React from 'react'
import Moment from 'react-moment'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {connect} from 'react-redux'
import type {fileType} from 'src/consts/flowTypes/common/fileType'

type Props = {
  title: string,
  createdTime?: string,
  entityImage?: fileType,
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
  const {title, children, svgImage, createdTime, translate, entityImage} = props
  return (
      <div className='card-row-container'>
        <div className='card-row-main'>
          <div className='card-row-sidebar'>
            {svgImage}
            {title}
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
      </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    translate: getMessages(state),
  }
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CardRowContainer)
