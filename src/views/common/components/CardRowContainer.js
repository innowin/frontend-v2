import * as React from 'react'

type Props = {
  title: string,
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
  const {title, children, svgImage} = props
  return (
      <div className='card-row-container'>
        <div className='card-row-sidebar'>
          {svgImage}
          {title}
        </div>
        <div className='card-row-content'>
          {children}
        </div>
      </div>
  )
}

export default CardRowContainer
