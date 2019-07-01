// @flow
import * as React from 'react'
import * as PropTypes from 'prop-types'

import AbilityInfoForm from './AbilityInfoForm'
import AbilityInfoView from './AbilityInfoView'
import type {AbilityType} from '../../../consts/flowTypes/organization/ability'

type PropsAbilityInfo = {
  updateAbility: Function,
  deleteAbility: Function,
  ability: AbilityType,
  organizationId: number,
  translate: { [string]: string },
}
type StateAbilityInfo = {
  edit: boolean,
}

class AbilityInfo extends React.Component<PropsAbilityInfo, StateAbilityInfo> {
  static propTypes = {
    ability: PropTypes.object.isRequired,
    updateAbility: PropTypes.func.isRequired,
    deleteAbility: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired,
    organizationId: PropTypes.number.isRequired,
  }

  constructor(props: PropsAbilityInfo) {
    super(props)
    this.state = {edit: false}
  }

  _showEdit = () => {
    this.setState({edit: true})
  }

  _hideEdit = () => {
    this.setState({edit: false})
  }

  _delete = () => {
    const {organizationId, deleteAbility, ability} = this.props
    const abilityId = ability.id
    this._hideEdit()
    deleteAbility({organizationId, abilityId})
  }

  render() {
    const {translate, updateAbility, organizationId, ability} = this.props
    const {edit} = this.state
    // FixMe: mohammad isLoading and error come from redux
    return (
        edit ?
            <AbilityInfoForm
                organizationId={organizationId}
                ability={ability}
                hideEdit={this._hideEdit}
                update={updateAbility}
                deleteAbility={this._delete}
                translate={translate}
            />
            : <AbilityInfoView ability={ability} organizationId={organizationId} showEdit={this._showEdit}/>
    )
  }
}

export default AbilityInfo