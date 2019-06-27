/*global __*/
import React, {Component} from 'react'
import cx from 'classnames'
import * as PropTypes from 'prop-types'


export class DateInput extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        required: PropTypes.bool,
        value: PropTypes.string,
    };

    static serialize({year, month, day}) {
        if (year === '' || month === '' || day === '') {
            return '';
        }
        return `${year}-${month}-${day}`;
    }

    static parse(date = '') {
        const pattern = /^(\d{4})-(\d{2})-(\d{2})$/;
        if (date) {
            const m = date.match(pattern);
            if (m) {
                return {year: m[1], month: m[2], day: m[3]};
            }
        }
        return {year: '', month: '', day: ''};
    }

    static normalize(x) {
        if (x === '0') {
            return x;
        }
        if (x.length === 1) {
            return '0' + x;
        }
        return x;
    }

    constructor(props) {
        super(props);
        const {year, month, day} = DateInput.parse(this.props.value);
        this.state = {year, month, day, error: false};
    };


    getNormalize = () => {
        let {year, month, day} = this.state;
        month = DateInput.normalize(month);
        day = DateInput.normalize(day);
        return {year, month, day};
    };

    getValue = () => {
        const {year, month, day} = this.getNormalize();
        return DateInput.serialize({year, month, day});
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
    handleDayChange = (e) => {
        let value = e.target.value;
        if (value === '') {
            this.setState({day: ''});
            return;
        }
        value = value.replace(/^0+/, '0');
        const m = value.match(/^(30|31|[1-2][0-9]|[1-9]|0[1-9]|0)/);
        if (m) {
            this.setState({day: m[1]})
        }
    };

    validateDate = ({year, month, day}) => {
        if (year === '' && month === '' && day === '') {
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
        if (!/^(30|31|[1-2][0-9]|[1-9]|0[1-9])/.test(day)) {
            return __('Day must be between 01 and 31');
        }
        return false;
    };

    validate = () => {
        const {year, month, day} = this.getNormalize();
        const error = this.validateDate({year, month, day});
        this.setState({error});
        return error;
    };

    handleBlur = () => {
        const {year, month, day} = this.getNormalize();
        this.setState({year, month, day});
    };

    render() {
        const {year, month, day} = this.state;
        const error = this.state.error;
        return (
            <div className={cx("col-12 form-group", {'has-danger': error})}>
                <div className="row">
                    <div className="col-12">
                        <label>{this.props.label}</label>
                    </div>
                </div>
                {/* TODO keep-ltr */}
                <div className="row justify-content-between dir-rtl">
                    <div className='col-4'>
                        <input
                            type="text"
                            name={this.props.name + '-year'}
                            className="form-control"
                            placeholder={__('Year')}
                            value={year}
                            ref="yearInput"
                            onChange={this.handleYearChange}
                        />
                    </div>
                    <div className='col-4'>
                        <input
                            type="text"
                            name={this.props.name + '-month'}
                            className="form-control"
                            placeholder={__('Month')}
                            value={month}
                            ref="monthInput"
                            onChange={this.handleMonthChange}
                            onBlur={this.handleBlur}
                        />
                    </div>
                    <div className='col-4'>
                        <input
                            type="text"
                            name={this.props.name + '-day'}
                            className="form-control"
                            placeholder={__('Day')}
                            value={day}
                            ref="dayInput"
                            onChange={this.handleDayChange}
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
