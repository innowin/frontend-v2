import React, { Component } from 'react'
import FirstLevel from './FirstLevel'

class GetUserData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: true,
      level: 1
    }
  }


  render() {
    const { isOpen } = this.state
    return (
        <div>

          <div className={isOpen ? 'get-data-dark-back' : 'get-data-dark-back-hide'}/>

          <div className={isOpen ? 'get-data-container' : 'get-data-container-hide'}>

            <div className='get-data-progress'>
              <div className='get-data-progress-box'>
                1
              </div>
              <div className='get-data-progress-box'>
                2
              </div>
              <div className='get-data-progress-box'>
                3
              </div>
            </div>


            <FirstLevel/>


          </div>

        </div>
    )
  }
}

export default GetUserData