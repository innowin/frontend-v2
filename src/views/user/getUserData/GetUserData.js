import React, {Component} from 'react'
import FirstLevel from './FirstLevel'
import {WelcomeBox, WelcomePhone, WelcomeRocket} from '../../../images/icons'

class GetUserData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      level: 1,
    }
  }

  setSecondLevel = () => {
    this.props.hideRegisterModal()
  }

  render() {
    const {showRegisterModal, email, password} = this.props
    const {level} = this.state
    return (
        <React.Fragment>

          <div className={showRegisterModal ? 'get-data-dark-back' : 'get-data-dark-back-hide'}/>

          <div className={showRegisterModal ? 'get-data-container' : 'get-data-container-hide'}>

            <div className='get-data-progress'>
              <div className={level !== 1 ? 'get-data-progress-box get-data-welcome-fade' : 'get-data-progress-box'}>
                <WelcomeRocket className='get-data-welcome'/>
              </div>
              <div className={level !== 2 ? 'get-data-progress-box get-data-welcome-fade' : 'get-data-progress-box'}>
                <WelcomePhone className='get-data-welcome'/>
              </div>
              <div className={level !== 3 ? 'get-data-progress-box get-data-welcome-fade' : 'get-data-progress-box'}>
                <WelcomeBox className='get-data-welcome'/>
              </div>
            </div>


            {level === 1 ? <FirstLevel email={email} password={password} setSecondLevel={this.setSecondLevel}/> : null}


          </div>

        </React.Fragment>
    )
  }
}

export default GetUserData