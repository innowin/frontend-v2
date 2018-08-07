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
    input: any,
    className: string,
    label: string,
    options: Array<OptionType>,
    noResultsText: string,
    multi: boolean,
    rtl: boolean,
    onBlurResetsInput: boolean,
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
                onBlur={() => input.onBlur(input.value)}
                onBlurResetsInput={false}
            />
        </div>
    )
}

export default renderSelectField