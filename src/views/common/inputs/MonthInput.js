/*global __*/
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'


export class MonthInput extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        required: PropTypes.bool,
        value: PropTypes.string,
    };

    static serialize({year, month}) {
        if (year === '' || month === '') {
            return '';
        }
        return `${year}-${month}`;
    }

    static parse(date = '') {
        const pattern = /^(\d{4})-(\d{2})$/;
        const m = date.match(pattern);
        if (m) {
            return {year: m[1], month: m[2]};
        }
        return {year: '', month: ''};
    }

    constructor(props) {
        super(props);
        const {year, month} = MonthInput.parse(this.props.value);
        this.state = {year, month, error: false};
    };

    getNormalizeMonth = () => {
        const {month} = this.state;
        if (month === '0') {
            return month;
        }
        if (month.length === 1) {
            return '0' + month;
        }
        return month;
    };

    getValue = () => {
        const {year} = this.state;
        const month = this.getNormalizeMonth();
        return MonthInput.serialize({year, month});
    };

    handleYearChange = (e) => {
        let value = e.target.value;
        if (value === '') {
            this.setState({year: ''});
            return;
        }
        const m = value.match(/^(\d{0,4})/);
        if (m) {
            this.setState({year: m[1]})
        }
    };
    handleMonthChange = (e) => {
        let value = e.target.value;
        if (value === '') {
            this.setState({month: ''});
            return;
        }
        value = value.replace(/^0+/, '0');
        const m = value.match(/^(10|11|12|[1-9]|0[1-9]|0)/);
        if (m) {
            this.setState({month: m[1]})
        }
    };

    validateDate = ({year, month}) => {
        if (year === '' && month === '') {
            if (!this.props.required) {
                return false;
            } else {
                return __('Required field');
            }
        }
        if (!/^\d{4}$/.test(year)) {
            return __('Year must be 4 digit');
        }
        if (!/^(10|11|12|0[1-9])$/.test(month)) {
            return __('Month must be between 01 and 12');
        }
        return false;
    };

    validate = () => {
        const {year} = this.state;
        const month = this.getNormalizeMonth();
        const error = this.validateDate({year, month});
        this.setState({error});
        return error;
    };

    handleBlur = () => {
        const month = this.getNormalizeMonth();
        this.setState({month});
    };

    render() {
        const {year, month} = this.state;
        const error = this.state.error;
        return (
            <div className={cx("col-12 form-group", {'has-danger': error})}>
                <div className="row justify-content-between">
                    <div className="col-12"><label>{this.props.label}</label></div>
                    <div className='col-6'>
                        <input
                            type="text"
                            name={this.props.name + '-year'}
                            className="form-control"
                            placeholder={__('Year')} value={year}
                            ref="yearInput"
                            onChange={this.handleYearChange}
                        />
                    </div>
                    <div className='col-6'>
                        <input
                            type="text"
                            name={this.props.name + '-month'}
                            className="form-control"
                            placeholder={__('Month')} value={month}
                            ref="monthInput"
                            onChange={this.handleMonthChange}
                            onBlur={this.handleBlur}
                        />
                    </div>
                </div>
                {error &&
                <div className="form-control-feedback">{error}</div>}
            </div>
        )
    }
}
