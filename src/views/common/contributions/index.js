// @flow
import * as React from "react"
import * as PropTypes from 'prop-types'
import {connect} from "react-redux"
import AbilityInfoContainer from "./AbilityInfoContainer"
import ProductInfoContainer from './ProductInfoContainer'
import SkillInfoContainer from './SkillInfoContainer'
import {CategoryTitle, FrameCard, ListGroup} from "../cards/Frames"
import {getMessages} from "../../../redux/selectors/translateSelector"
import AddingContribution from "../../pages/adding-contribution/addingContribution"

// type PropsSkills = {
//   ownerId: number,
//   translate: { [string]: string },
//   identityType: string,
//   isUser: boolean,
// }

class Contributions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      createForm: false
    }
  }

  _showCreateForm = () => {
    this.setState({createForm: true})
  }

  _handleProductWizardModal = () => {
    this.setState({createForm: false})
  }

  render() {
    const {translate, ownerId, identityType, identityId, isUser} = this.props
    return (
        <div>
          <CategoryTitle
              title={translate['Contributions']}
              showCreateForm={this._showCreateForm}
              createForm={this.state.createForm}
          />

          <AddingContribution modalIsOpen={this.state.createForm}
                              handleModalVisibility={this._handleProductWizardModal}/>
          <div
              className={this.state.createForm ? "makeDark" : "makeDark-out"}
              onClick={this._handleProductWizardModal}>
            {/*dark div*/}
          </div>

          <div>
            <div className='list-group list-group-flush'>
              <ProductInfoContainer
                  ownerId={ownerId}
                  translate={translate}
                  identityType={identityType}
                  identityId={identityId}
              />
              {
                isUser ?
                    <SkillInfoContainer
                        userId={ownerId}
                        translate={translate}
                    />
                    : <AbilityInfoContainer
                        organizationId={ownerId}
                        translate={translate}
                    />
              }
            </div>
          </div>
        </div>
    )
  }
}

Contributions.propTypes = {
  ownerId: PropTypes.number.isRequired,
  translate: PropTypes.object.isRequired,
  identityType: PropTypes.string.isRequired,
}
const mapStateToProps = state => ({
  translate: getMessages(state)
})

export default connect(mapStateToProps)(Contributions)