/*global __*/
import React, {Component} from 'react'
import PropTypes from 'prop-types'

const IR_CODE = '98';

export class PhoneInput extends Component {
    static defaultProps = {
        required: false
    };

    static propTypes = {
        value: PropTypes.string,
        required: PropTypes.bool,
        onAdd: PropTypes.func,
    };

    static serialize({countryCode, cityCode, phoneNumber}) {
        if (countryCode === '' || cityCode === '' || phoneNumber === '') {
            return '';
        }
        return `+${countryCode}${cityCode}${phoneNumber}`;
    }

    static parse(date = '') {
        const pattern = /^\+(\d{1,3})(\d{2,3})(\d{3,14})$/;
        const m = date.match(pattern);
        if (m) {
            return {countryCode: m[1], cityCode: m[2], phoneNumber: m[3]};
        }
        return {countryCode: '', cityCode: '', phoneNumber: ''};
    }

    constructor(props) {
        super(props);
        const {countryCode, cityCode, phoneNumber} = PhoneInput.parse(this.props.value);
        this.state = {countryCode: countryCode || IR_CODE, cityCode, phoneNumber};
    };

    getValue = () => {
        const {countryCode, cityCode, phoneNumber} = this.state;
        return PhoneInput.serialize({countryCode, cityCode, phoneNumber});
    };

    handleCountryCodeChange = (e) => {
        let value = e.target.value;
        if (value === '') {
            this.setState({countryCode: ''});
            return;
        }
        const m = value.match(/^(\d{1,3})/);
        if (m) {
            this.setState({countryCode: m[1]})
        }
    };
    handleCityCodeChange = (e) => {
        let value = e.target.value;
        if (value === '') {
            this.setState({cityCode: ''});
            return;
        }
        const m = value.match(/^(\d{1,3})/);
        if (m) {
            this.setState({cityCode: m[1]})
        }
    };
    handlePhoneNumberChange = (e) => {
        let value = e.target.value;
        if (value === '') {
            this.setState({phoneNumber: ''});
            return;
        }
        const m = value.match(/^(\d{1,14})/);
        if (m) {
            this.setState({phoneNumber: m[1]})
        }
    };
    validatePhone = ({countryCode, cityCode, phoneNumber}) => {
        if ((countryCode === '' || countryCode === IR_CODE) && cityCode === '' && phoneNumber === '') {
            if (!this.props.required) {
                return false;
            } else {
                return __('Required field');
            }
        }
        if (!/^\d{1,3}$/.test(countryCode)) {
            return __('Country code must be 1-3 number');
        }
        if (!/^\d{2,3}$/.test(cityCode)) {
            return __('City code must be 2-3 number');
        }
        if (!/^\d{3,14}$/.test(phoneNumber)) {
            return __('Phone number must be 3-14 number');
        }
        return false;
    };
    validate = () => {
        const {countryCode, cityCode, phoneNumber} = this.state;
        return this.validatePhone({countryCode, cityCode, phoneNumber});
    };
    reset = () => {
        this.setState({countryCode: IR_CODE, cityCode: '', phoneNumber: ''});
        this.refs.countryCodeInput.focus();
    };

    handleEnter = (e) => {
        if (this.props.onAdd) {
            e.preventDefault();
            this.props.onAdd();
        }
    };

    handleAdd = () => {
        this.props.onAdd();
    };

    handleKeyPressCountryCode = (e) => {
        if (e.key === 'Enter') {
            this.handleEnter(e);
        }
        if (e.key === '-') {
            this.refs.cityCodeInput.focus();
        }
    };
    handleKeyPressCityCode = (e) => {
        if (e.key === 'Enter') {
            this.handleEnter(e);
        }
        if (e.key === '-') {
            this.refs.phoneNumberInput.focus();
        }
    };
    handleKeyPressPhoneNumber = (e) => {
        if (e.key === 'Enter') {
            this.handleEnter(e);
        }
    };


    render() {
        const {countryCode, cityCode, phoneNumber} = this.state;
        const showAdd = (this.props.onAdd !== undefined);
        /* TODO keep-ltr */
        return (
            <div className="row dir-rtl">
                <div className="col">
                    <div className="row pl-1">
                        <div className="col-1 pt-1 text-left">+</div>
                        <div className='col-2 p-0'>
                            <input
                                className="form-control"
                                type="text"
                                name="countryCode"
                                ref="countryCodeInput"
                                value={countryCode}
                                placeholder={__('Country code')}
                                onChange={this.handleCountryCodeChange}
                                onKeyPress={this.handleKeyPressCountryCode}
                            />
                        </div>
                        <div className="col-1 pt-1 text-center">-</div>
                        <div className='col-2 p-0'>
                            <input
                                className="form-control"
                                type="text"
                                name="cityCode"
                                ref="cityCodeInput"
                                value={cityCode}
                                placeholder={__('City code')}
                                onChange={this.handleCityCodeChange}
                                onKeyPress={this.handleKeyPressCityCode}
                            />
                        </div>
                        <div className="col-1 pt-1 text-center">-</div>
                        <div className='col-5 pr-0'>
                            <input
                                className="form-control"
                                type="text"
                                name="phoneNumber"
                                ref="phoneNumberInput"
                                value={phoneNumber}
                                placeholder={__('Phone number')}
                                onChange={this.handlePhoneNumberChange}
                                onKeyPress={this.handleKeyPressPhoneNumber}
                            />
                        </div>
                    </div>
                </div>
                {showAdd &&
                <div className="col col-auto">
                    <button className="btn btn-secondary" type="button" onClick={this.handleAdd}>+</button>
                </div>
                }
            </div>
        )
    }
}

