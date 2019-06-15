import React, {PureComponent} from 'react'
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
import updateUserByUserIdAction from '../../../redux/actions/user/updateUserByUserIdAction'
import {getExchanges} from 'src/redux/selectors/common/exchanges/GetAllExchanges'
import exchangeActions from 'src/redux/actions/exchangeActions'
import ThirdLevel from './ThirdLevel'

class GetUserData extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      level: 1,
      typeOfUser: 'user',
      selected: [],
    }
  }

  setSecondLevel = () => {
    this.setState({...this.state, level: 2}, () =>
        this.props.actions.getHashTags(this.state.typeOfUser),
    )
  }

  setThirdLevel = (selected) => {
    this.setState({...this.state, level: 3}, () => {
      this.props.actions.getExchanges(24, 0, null, [...selected], true)
    })
  }

  typeOfUser = (type) => {
    this.setState({...this.state, typeOfUser: type})
  }

  render() {
    const {showRegisterModal, email, password, HashTags, current_user_identity, allExchanges, clientExchangeMemberships, exchangeMemberships, hideRegisterModal, actions} = this.props
    const {typeOfUser} = this.state
    const {checkUsername, signIn, createUserPerson, createUserOrgan, updateUserByUserId} = actions
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
                              typeOfUser={this.typeOfUser}
                              setSecondLevel={this.setSecondLevel}
                              checkUsername={checkUsername}
                              signIn={signIn}
                              createUserPerson={createUserPerson}
                              createUserOrgan={createUserOrgan}
                  />
                  :
                  level === 2 ?
                      <SecondLevel HashTags={HashTags}
                                   typeOfUser={typeOfUser}
                                   updateUserByUserId={updateUserByUserId}
                                   current_user_identity={current_user_identity}
                                   setThirdLevel={this.setThirdLevel}
                      />
                      :
                      level === 3 ?
                          <ThirdLevel exchanges={allExchanges}
                                      clientExchangeMemberships={clientExchangeMemberships}
                                      exchangeMemberships={exchangeMemberships}
                                      hideRegisterModal={hideRegisterModal}
                          />
                          :
                          null
            }


          </div>

        </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  HashTags: hashTagsListSelector(state),
  current_user_identity: state.auth.client.identity.content,
  allExchanges: getExchanges(state),
  clientExchangeMemberships: state.auth.client.exchangeMemberships,
  exchangeMemberships: state.common.exchangeMembership.list,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateUserByUserId: updateUserByUserIdAction.updateUser,
    checkUsername: CheckUsernameAction.checkUsername,
    signIn: AuthActions.signIn,
    createUserPerson: CreateUserActions.createUserPerson,
    createUserOrgan: CreateUserActions.createUserOrgan,
    getHashTags,
    getExchanges: exchangeActions.getAllExchanges,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(GetUserData)