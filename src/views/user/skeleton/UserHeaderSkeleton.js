import React from 'react'
import Material from 'src/views/common/components/Material'
import { getMessages } from 'src/redux/selectors/translateSelector'
import { connect } from 'react-redux'

const UserHeaderSkeleton = (props) => {
  const { translate } = props
  return (
      <div className='header-container'>

        <div className='header-container-item'>
          <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material-first' content={translate['Stream']}/>
        </div>

        <div className='header-container-item'>
          <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['About Me']}/>
        </div>

        <div className='header-container-item'>
          <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['Contributions']}/>
        </div>

        <div className='header-container-item'>
          <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['Socials']}/>
        </div>

        <div className='header-container-item'>
          <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['Educations']}/>
        </div>

        <div className='header-container-item'>
          <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['WorkExperience']}/>
        </div>

        <div className='header-container-item'>
          <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['Certificates']}/>
        </div>

      </div>
  )
}

const mapStateToProps = (state) => ({
  translate: getMessages(state)
})

export default connect(mapStateToProps)(UserHeaderSkeleton)
