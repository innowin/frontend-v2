// @flow
import * as React from "react";
import PropTypes from "prop-types";
import {CategoryTitle, FrameCard, ListGroup} from "../../common/cards/Frames";
import {Component} from "react";

import CertificateContainer from './CertificateContainer'
import connect from "react-redux/es/connect/connect";

type PropsCertificates = {
  ownerId: number,
  identityId: number,
  identityType: string,
  translate: { [string]: string },
}

export class Index extends Component<PropsCertificates> {
  static propTypes = {
    ownerId: PropTypes.number.isRequired,
    identityId: PropTypes.number.isRequired,
    identityType: PropTypes.string.isRequired,
    translate: PropTypes.object.isRequired,
  }

  render() {
    const {translate, identityId, identityType, ownerId} = this.props

    return (
        //<VerifyWrapper isLoading={isLoading} error={error}>
        <div>
          <CategoryTitle
              title={translate['Certificates and badges']}
          />
          <FrameCard>
            <ListGroup>
              <CertificateContainer ownerId={ownerId} identityId={identityId} identityType={identityType}/>
            </ListGroup>
          </FrameCard>
        </div>
        //</VerifyWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    translate: state.intl.messages,
  }
}

export default connect(mapStateToProps)(Index)