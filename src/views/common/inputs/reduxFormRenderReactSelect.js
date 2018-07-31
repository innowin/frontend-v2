// @flow
import * as React from 'react'
import Select from 'react-select';


type OptionType = {
    value: string | number,
    label: string
}

type MetaType = {
    touched: boolean,
    error: string,
    warning: string
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
    placeholder: string,
    meta: MetaType

}
const renderSelectField = ({
                               input,
                               className,
                               label,
                               options,
                               noResultsText,
                               multi = false,
                               rtl,
                               onBlurResetsInput = false,
                               onBlur = () => 0,
                               placeholder,
                               meta: {touched, error, warning},
                           }: Props) => {
    return (
        <div className={error && touched ? `error ${className}` : className}>
            <Select
                placeholder={placeholder}
                multi={multi}
                rtl={rtl}
                options={options}
                noResultsText={noResultsText}
                {...input}
                onBlur={onBlur}
                onBlurResetsInput={onBlurResetsInput}
            />
        </div>
    )
}

export default renderSelectField