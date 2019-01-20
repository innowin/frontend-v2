import React, {Component} from 'react'
import FirstLevel from './FirstLevel'

class GetUserData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      level: 1
    }
  }


  render() {
    const {showRegisterModal, hideRegisterModal, email, password} = this.props

    return (
        <div>

          <div className={showRegisterModal ? 'get-data-dark-back' : 'get-data-dark-back-hide'} onClick={hideRegisterModal}/>

          <div className={showRegisterModal ? 'get-data-container' : 'get-data-container-hide'}>

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


            <FirstLevel email={email} password={password}/>


          </div>

        </div>
    )
  }
}

export default GetUserData