/*global __*/
//@flow
import * as React from "react"
import PropTypes from 'prop-types'
import {createAbility, deleteAbility, updateAbility} from 'src/crud/organization/abilities'
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {AbilityCreateForm} from "./forms"
import {AbilityEditForm} from './forms'
import {AbilityItemWrapper, AbilityView} from "./view"
import {REST_REQUEST} from "src/consts/Events"
import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {TOKEN} from "src/consts/data"

type AbilityInfoProps = {
  ability: Object,
  organization: Object,
  profile:Object,
  updateAbility: Function,
  deleteAbility: Function,
}
class AbilityInfo extends React.Component<AbilityInfoProps,{edit: boolean, ability: Object, error:boolean, isLoading:boolean}> {

  constructor(props:AbilityInfoProps) {
    super(props);
    const {ability} = props;
    this.state = {edit: false, ability: ability, error:false, isLoading:false};
    this._updateStateForView = this._updateStateForView.bind(this);
    this._showEdit = this._showEdit.bind(this);
    this._showEdit = this._showEdit.bind(this);
  }

  _showEdit = () => {
    this.setState({edit: true});
  };

  _hideEdit = () => {
    this.setState({edit: false});
  };

  _updateStateForView = (res, error, isLoading) => {
    this.setState({...this.state, ability: res, error:error, isLoading:isLoading})
  };

  render() {
    const {ability} = this.state;
    const {organization, profile} = this.props;
    if (this.state.edit) {
      return <AbilityItemWrapper>
        <AbilityEditForm
          ability={ability}
          hideEdit={this._hideEdit}
          updateStateForView={this._updateStateForView}
          remove={this.props.deleteAbility}
          update={this.props.updateAbility}
        />
      </AbilityItemWrapper>;
    }
    return <AbilityView ability={ability} organization={organization} profile={profile} showEdit={this._showEdit}/>;
  }
}
type AbilityProps = {
  ability: Object,
  organization: Object,
  profile: Object,
  updateStateForView:(error:boolean, isLoading:boolean) => void
}
class Ability extends React.Component<AbilityProps,{ability:Object, error:false, isLoading:false}> {
  state={error:false, isLoading:false, ability:{}}
  constructor(props:AbilityProps) {
    super(props);
    this._delete = this._delete.bind(this);
    this._update = this._update.bind(this);
    this._updateStateForView = this._updateStateForView.bind(this)
    this.state={...this.state,ability:props.ability}
  }


  _delete = (abilityId, updateStateForView, hideEdit) => {
    return deleteAbility(abilityId, updateStateForView, hideEdit);
  };

  _update = (formValues, abilityId, updateStateForView, hideEdit) => {
    return updateAbility(formValues, abilityId, updateStateForView, hideEdit);
  };

  _updateStateForView = (res, error, isLoading) => {
    const {updateStateForView} = this.props;
    updateStateForView(error, isLoading);
    this.setState({...this.state, ability: res, error: error, isLoading: isLoading});
  };

  render() {
    const {organization, profile} = this.props;
    const {ability} = this.state;
    return (
      <AbilityInfo
        ability={ability}
        organization={organization}
        profile={profile}
        updateStateForView={this._updateStateForView}
        deleteAbility={this._delete}
        updateAbility={this._update}
      />
    )
  }
}
type AbilitiesProps ={
  organizationId: number
}
class Abilities extends React.Component<AbilitiesProps,{
                                                        createForm: boolean, 
                                                        edit: boolean, 
                                                        isLoading: boolean, 
                                                        error: boolean, 
                                                        abilities:Array<Object>, 
                                                        organization: Object, 
                                                        profile: Object
                                                      }
> { 
  state = {createForm: false, edit: false, isLoading: false, error: false, abilities: [], organization: {}, profile: {}};
   
  constructor(props:AbilitiesProps) { 
    super(props);
  }
  componentDidMount() {
    const {organizationId} = this.props;
    const emitting = () => {
      const newState = {...this.state, isLoading: true};
      this.setState(newState);
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/organizations/abilities/?ability_organization=${organizationId}`,
          result: `organizationAbilities-Abilities-get/${organizationId}`,
          token: TOKEN
        }
      );
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/organizations/${organizationId}/`,
          result: `organization-Abilities-get/${organizationId}`,
          token: TOKEN
        }
      );
    };

    emitting();

    socket.on(`organizationAbilities-Abilities-get/${organizationId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, abilities: res, isLoading: false};
        this.setState(newState);
      }
    });
    socket.on(`organization-Abilities-get/${organizationId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, organization: res, isLoading: false};
        this.setState(newState);
      }
    })

  }

  componentWillUnmount() {
    const {organizationId} = this.props;
    socket.off(`organizationAbilities-Abilities-get/${organizationId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, abilities: res, isLoading: false};
        this.setState(newState);
      }
    });
    socket.off(`organization-Abilities-get/${organizationId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, organization: res, isLoading: false};
        this.setState(newState);
      }
    });

    socket.off(`profileOrganization-Abilities-get/${organizationId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, profile: res[0], isLoading: false};
        this.setState(newState);
      }
    });

  }

  _showCreateForm = () => {
    this.setState({createForm: true});
  };

  _hideCreateForm = () => {
    this.setState({createForm: false});
  };

  _updateStateForView = ( error:boolean, isLoading:boolean) => {
    this.setState({...this.state, error: error, isLoading: isLoading}) 
  };

  _create = (formValues:Object, hideCreateForm:Function) => {
    const updateStateForView = this._updateStateForView;
    return createAbility(formValues, updateStateForView, hideCreateForm);
  };

  render() {
    const {createForm, abilities, organization, profile, isLoading, error} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <CategoryTitle
          title={__('Abilities')}
          showCreateForm={this._showCreateForm}
          createForm={createForm}
        />
        <FrameCard className="-frameCardAbility">
          <ListGroup>
            {
              createForm &&
              <AbilityItemWrapper>
                <AbilityCreateForm hideCreateForm={this._hideCreateForm} create={this._create}/>
              </AbilityItemWrapper>
            }
            {
              abilities.map((ability, i) => (
                <Ability
                  ability={ability}
                  organization={organization}
                  profile={profile}
                  updateStateForView={this._updateStateForView}
                  key={i}
                />
              ))
            }
          </ListGroup>
        </FrameCard>
      </VerifyWrapper>
    )
  }
}

export default Abilities;