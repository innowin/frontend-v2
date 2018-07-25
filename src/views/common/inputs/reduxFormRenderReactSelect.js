// @flow
import * as React from 'react'
import Select from 'react-select';
import star_svg from "../../../images/common/star_svg";


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
                               changeHandler,
                               noResultsText,
                               value,
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
            {(touched && error) && console.log(`the error of ${input.name} is: ${error}`)}
        </div>
    )
}

export default renderSelectField