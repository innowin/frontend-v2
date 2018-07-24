// @flow
import * as React from 'react'
import Select from 'react-select';

type OptionType = {
    value: string | number,
    label: string
}

type Props = {
    input: HTMLSelectElement,
    className: string,
    label: string,
    options: Array<OptionType>,
    changeHandler: Function,
    noResultsText: string,
    multi: boolean,
    rtl: boolean,
    onBlurResetsInput: boolean,
    onBlur: Function,
    placeholder: string

}
const renderSelectField = ({
                               input,
                               className,
                               label,
                               options,
                               changeHandler,
                               noResultsText,
                               value,
                               multi,
                               rtl,
                               onBlurResetsInput = false,
                               onBlur = () => 0,
                               placeholder,
                               meta: {touched, error, warning},
                           }: Props) => {
    return (
        <div className={className}>
            <Select
                placeholder={placeholder}
                multi={multi}
                onChange={changeHandler}
                rtl={rtl}
                options={options}
                noResultsText={noResultsText}
                // value={'value'}
                {...input}
                labelKey={label}
                onBlur={onBlur}
                onBlurResetsInput={onBlurResetsInput}
            />
        </div>
    )
}

export default renderSelectField