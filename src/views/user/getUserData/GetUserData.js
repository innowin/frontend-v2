import React, {Component} from 'react'
import FirstLevel from './FirstLevel'
import {WelcomeBox, WelcomePhone, WelcomeRocket} from 'src/images/icons'
import {getHashTags} from 'src/redux/actions/commonActions/hashTagActions'
import {bindActionCreators} from 'redux'
import connect from 'react-redux/es/connect/connect'
import CheckUsernameAction from 'src/redux/actions/user/checkUsernameAction'
import AuthActions from 'src/redux/actions/authActions'
import CreateUserActions from 'src/redux/actions/user/createUserActions'
import SecondLevel from './SecondLevel'
import {hashTagsListSelector} from 'src/redux/selectors/common/hashTags/hashTag'

class GetUserData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      level: 1,
    }
  }

  componentDidMount() {
    this.props.actions.getHashTags()
  }

  setSecondLevel = () => {
    const {hideRegisterModal} = this.props
    hideRegisterModal()
    // this.setState({...this.state, level: 2})
  }

  render() {
    const {showRegisterModal, email, password, actions} = this.props
    const {checkUsername, signIn, createUserPerson, createUserOrgan} = actions
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

            {
              level === 1 ?
                  <FirstLevel email={email}
                              password={password}
                              setSecondLevel={this.setSecondLevel}
                              checkUsername={checkUsername}
                              signIn={signIn}
                              createUserPerson={createUserPerson}
                              createUserOrgan={createUserOrgan}
                  />
                  :
                  level === 2 ?
                      <SecondLevel/>
                      :
                      null
            }


          </div>

        </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  getHashTags: hashTagsListSelector(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    checkUsername: CheckUsernameAction.checkUsername,
    signIn: AuthActions.signIn,
    createUserPerson: CreateUserActions.createUserPerson,
    createUserOrgan: CreateUserActions.createUserOrgan,
    getHashTags,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(GetUserData)