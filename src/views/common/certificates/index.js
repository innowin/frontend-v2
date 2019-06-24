// @flow
import * as React from "react";
import * as PropTypes from "prop-types";
import {FrameCard, ListGroup} from "../../common/cards/Frames";
import {Component} from "react";
import CertificateContainer from './CertificateContainer'
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import CertificateActions from "../../../redux/actions/commonActions/certificateActions";
import CheckOwner from "../CheckOwner";
import CertificateInfoCreateForm from './CertificateInfoCreateForm'

type PropsCertificates = {
  ownerId: number,
  identityType: string,
  translate: { [string]: string },
  actions: {
    createCertificate: Function,
  }
}

type StateCertificates = {
  certificateCreateForm: boolean,
}

export class Index extends Component<PropsCertificates, StateCertificates> {
  static propTypes = {
    ownerId: PropTypes.number.isRequired,
    identityType: PropTypes.string.isRequired,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.objectOf(PropTypes.func),
  }

  constructor(props: PropsCertificates) {
    super(props)

    this.state = {
      certificateCreateForm: false,
    }
  }

  _showCertificateCreateForm = () => {
    this.setState({certificateCreateForm: true})
  }

  _hideCertificateCreateForm = () => {
    this.setState({certificateCreateForm: false})
  }

  _createCertificate = ({formValues}) => {
    const {actions, ownerId} = this.props
    const {createCertificate} = actions
    const newFormValues = {...formValues, certificate_parent: ownerId, certificate_identity: ownerId}
    createCertificate({certificateOwnerId: ownerId, formValues: newFormValues})
  }

  render() {
    const {translate, identityType, ownerId} = this.props
    const {certificateCreateForm} = this.state

    return (
        //<VerifyWrapper isLoading={isLoading} error={error}>
        <div>
          {/*<CategoryTitle*/}
              {/*title={translate['Certificates and badges']}*/}
          {/*/>*/}

          <CheckOwner id={ownerId}>
            {!(certificateCreateForm) &&
            <div className='education-add-container'>
              <button className='education-add-button pulse'
                      onClick={this._showCertificateCreateForm}>{`${translate['Add']} ${translate['Certificate']}`}</button>
            </div>
            }
            {certificateCreateForm &&
            <FrameCard className='education-tab'>
              <ListGroup>
                <div className='education-research-create-container'>
                  <p className='education-research-create-header'>{translate['Certificate']}</p>
                  <CertificateInfoCreateForm hideCreateForm={this._hideCertificateCreateForm}
                                             create={this._createCertificate}
                                             translate={translate}/>

                </div>
              </ListGroup>
            </FrameCard>
            }
          </CheckOwner>

          <FrameCard>
            <ListGroup>
              <CertificateContainer ownerId={ownerId} identityId={ownerId} identityType={identityType}/>
            </ListGroup>
          </FrameCard>
        </div>
        //</VerifyWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    translate: state.intl.messages,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    createCertificate: CertificateActions.createCertificate,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)