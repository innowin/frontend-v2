import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PersonSignupForm from './PersonSignUpForm'
import OrganizationSignUpForm from './OrganizationSignUpForm'
import {RadioButtonGroup} from '../../common/inputs/RadioButtonInput'
import {connect} from 'react-redux'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {createUser} from "src/crud/user/user";
import {apiTokenAuth, createUserOrgan} from "src/crud/user/user";
import {getMetaDataOrganization} from "src/crud/organization/organization";
import {getCountries, getProvinces, getTowns} from "src/crud/regions";

const USER_TYPES = {
  PERSON: 'person',
  ORGANIZATION: 'organization',
};

export class SignUpForm extends Component {
  static propTypes = {
    handleLogIn: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      userType: USER_TYPES.PERSON,
      orgFormPart: 0,
      data: {},
      ownershipTypesOptions: [],
      businessTypesOptions: [],
      countries: [],
      provinces: [],
      countriesOptions: [],
      provinceOptions: [],
      townOptions: []
    }
  }

  _typeHandler = (value) => {
    let part = ((value === USER_TYPES.PERSON) && 0) || ((value === USER_TYPES.ORGANIZATION) && 1);
    this.setState({...this.state, userType: value}, () => setTimeout(() => {
      this._orgFormPartHandler(part)
    }));
  };

  _orgFormPart1SubmitHandler = (values) => {
    this.setState({...this.state, orgFormPart: 2, data: {...this.state.data, ...values}})
  };

  _orgFormPart2SubmitHandler = (values) => {
    const data = {...this.state.data, ...values};
    this.setState({...this.state, data: data});
    createUserOrgan(data, apiTokenAuth, this.props.handleLogIn)
  };

  _handlePersonFormSubmit = (values) => {
    this.setState({...this.state, data: values});
    createUser(values, apiTokenAuth, this.props.handleLogIn)
  };

  _orgFormPartHandler = part => this.setState({...this.state, orgFormPart: part});

  _convertToOptions1 = (arr) => {
    let options = []
    arr.map(item => options.push({value: item[0], title: item[1]}))
    return options
  }

  _convertToOptions2 = (arr) => {
    let options = []
    if (Array.isArray(arr)) {
      arr.map(item => options.push({value: item.name, title: item.name}))
    }
    return options
  }

  _getProvinces = (e) => {
    const {countries} = this.state
    const selectedCountry = countries.filter((country) => country.name === e.target.value)
    if (selectedCountry.length > 0) {
      const countryId = selectedCountry[0].id
      getProvinces(countryId, (res) => this.setState({
        ...this.state,
        provinces: res,
        provinceOptions: this._convertToOptions2(res)
      }))
    } else this.setState({...this.state, provinceOptions: [], townOptions: []})
  }

  _getTowns = (e) => {
    const {provinces} = this.state
    const selectedProvince = provinces.filter((province) => province.name === e.target.value)
    if (selectedProvince.length > 0) {
      const provinceId = selectedProvince[0].id
      getTowns(provinceId, (res) => this.setState({...this.state, townOptions: this._convertToOptions2(res)}))
    } else this.setState({...this.state, townOptions: []})
  }

  componentDidMount() {
    getMetaDataOrganization((res) => this.setState({
      ...this.state,
      ownershipTypesOptions: this._convertToOptions1(res.ownership_types),
      businessTypesOptions: this._convertToOptions1(res.business_types),
    }))
    getCountries((res) => {
      if (Array.isArray(res) && res.length > 0) {
        this.setState({...this.state, countries: res, countriesOptions: this._convertToOptions2(res)})
      }
    })
  }

  render() {
    const {RedirectToHome, translator} = this.props;
    const {
      userType, orgFormPart, ownershipTypesOptions, businessTypesOptions, countriesOptions, provinceOptions, townOptions
    } = this.state;
    const userTypeItems = [{value: USER_TYPES.PERSON, title: 'فرد'}, {value: USER_TYPES.ORGANIZATION, title: 'مجموعه'}]
    return (
      <div className="signup-wrapper">
        <RadioButtonGroup
          selected={userType}
          handler={this._typeHandler}
          items={userTypeItems}
          name="userType"
          label={translator['Registrar']}
        />
        {userType === USER_TYPES.PERSON ?
          <PersonSignupForm
            translator={translator}
            onSubmit={this._handlePersonFormSubmit}
            RedirectToHome={RedirectToHome}
          />
          :
          <OrganizationSignUpForm
            translator={translator}
            handlePart={this._orgFormPartHandler}
            formPart={orgFormPart}
            ownershipTypesOptions={ownershipTypesOptions}
            businessTypesOptions={businessTypesOptions}
            countriesOptions={countriesOptions}
            provinceOptions={provinceOptions}
            townOptions={townOptions}
            getProvinces={this._getProvinces}
            getTowns={this._getTowns}
            onSubmitPart2={this._orgFormPart2SubmitHandler}
            onSubmitPart1={this._orgFormPart1SubmitHandler}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({translator: getMessages(state)})



export default connect(mapStateToProps)(SignUpForm)
