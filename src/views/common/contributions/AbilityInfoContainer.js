// @flow
import * as React from "react"
import PropTypes from "prop-types"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import NewAbilityIcon from "../../../images/user/new_skill_svg"
import AbilityActions from "../../../redux/actions/organization/abilityActions"
import AbilityInfo from './AbilityInfo'
import type {AbilityType} from "../../../consts/flowTypes/organization/ability"
import {ItemHeader, ItemWrapper} from "../cards/Frames"
import getAbilitiesSelector from "../../../redux/selectors/organization/organizationGetAbilitySelector"

type PropsAbilities = {
  organizationId: number,
  translate: { [string]: string },
  abilities: (AbilityType)[],
  actions: {
    getAbilitiesByOrganizationId: Function,
    updateAbility: Function,
    deleteAbility: Function,
  },
  isLoading: boolean,
  error: {} | string | null,
}

class AbilityInfoContainer extends React.Component<PropsAbilities> {

  static propTypes = {
    organizationId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    abilities: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    error: PropTypes.object,
  }

  componentDidMount() {
    const {organizationId, actions} = this.props
    const {getAbilitiesByOrganizationId} = actions
    getAbilitiesByOrganizationId({organizationId})
  }

  render() {
    const {translate, abilities, organizationId, actions} = this.props
    const {updateAbility, deleteAbility} = actions
    return (
        //<VerifyWrapper isLoading={isLoading} error={error}>
        <ItemWrapper icon={<NewAbilityIcon/>}>
          <ItemHeader title={translate['Skills']}/>
          {
            abilities.map((ability, index) => (
                <AbilityInfo
                    organizationId={organizationId}
                    updateAbility={updateAbility}
                    deleteAbility={deleteAbility}
                    ability={ability}
                    key={index + "AbilityInfo"}
                    translate={translate}
                />
            ))
          }
        </ItemWrapper>
        //</VerifyWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {organizationId} = ownProps
  const stateOrganization = state.organs[organizationId]
  const defaultObject = {content: [], isLoading: false, error: null}
  const abilityObject = (stateOrganization && stateOrganization.abilities) || defaultObject

  return {
    abilities: getAbilitiesSelector(state, ownProps),
    isLoading: abilityObject.isLoading,
    error: abilityObject.error,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getAbilitiesByOrganizationId: AbilityActions.getAbilitiesByOrganizationId,
    updateAbility: AbilityActions.updateAbility,
    deleteAbility: AbilityActions.deleteAbility,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(AbilityInfoContainer)