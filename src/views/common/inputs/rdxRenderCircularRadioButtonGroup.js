// @flow
import * as React from "react"
import {LAYER1S} from "../../pages/adding-contribution/addingConributionData";


type ItemType = {
    title: string,
    value: string
}

type RenderRadioButtonGroupProps = {
    items: Array<ItemType>,
    handler: Function,
    selected: string,
    className: string,
    input: any,
    rest: any,
    label?: string
}

const renderRadioButtonGroup = (props: RenderRadioButtonGroupProps) => { // ! not used.
    const {
        items,
        handler,
        selected,
        label,
        className,
        input,
        ...rest,
    } = props
    return (
        <div className={`${className} radio-button-group`}>
            {(label) ? (<label>{`${label}: `}</label>) : ''}
            <div className="radio-btns-wrapper">
                {items.map(item => (
                    <div key={`radio${item.value}`} className="item" onClick={() => handler(item.value)}>
                        <span className="title">{item.title}</span>
                        <span
                            className={item.value === selected ? 'selected radio-btn' : 'radio-btn'}
                        >
                        </span>
                    </div>
                ))}
            </div>
            <input
                {...input}
                //value={selected}
                id={LAYER1S.PRICE_STATUS}
                {...rest}
                type="text"/>
        </div>
    )
}

export default renderRadioButtonGroup