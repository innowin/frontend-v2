// @flow
import * as React from 'react'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd' // !?
import {SquareAdd, CongratsTick, EditIcon} from '../../../../images/icons'
import NextPrevBtns from '../nextAndPrevBtns'
import type {TechnicalPropertyType} from "../types"


type TechnicalPropertiesProps = {
    properties: Array<TechnicalPropertyType>,
    activationAddPropBlock: Function,
    addingTechPropNow: boolean,
    inputFillHandler: Function,
    newPropertyData: TechnicalPropertyType,
    addOrEditTechProperty: Function,
    propertiesOrderHandler: Function,
    setNewTechPropertyDate: Function,
    goToNextStep: Function,
    goToPrevStep: Function
}

const TechnicalProperties = (props: TechnicalPropertiesProps) => {

    const {
        properties,
        activationAddPropBlock,
        addingTechPropNow,
        inputFillHandler,
        newPropertyData,
        addOrEditTechProperty,
        propertiesOrderHandler,
        setNewTechPropertyDate,
        goToNextStep,
        goToPrevStep
    } = props

    const incompleteProperties = properties && properties.filter(property => !property.title)

    const firstEmptyPropertyId = incompleteProperties && incompleteProperties[0].id

    const setBlockClassName = (id) => {
        let classes = 'add-property-block'
        if (id === firstEmptyPropertyId) {
            classes += ' enabled-property'
            if (addingTechPropNow) classes += ' active'
        }
        else if (id === newPropertyData.id) {
            classes += ' enabled-property active'
        }
        return classes
    }

    const setReOrderedProperties = () => {
        if (properties) {
            return properties.slice().sort((a, b) => {
                if (a.title && !b.title) return -1
                if (b.title && !a.title) return 1
                return 0
            })
        }
    }

    const reOrderedProperties = setReOrderedProperties() || []

    return (
        <div className="technical-properties-page">
            <div className="technical-properties-wrapper">
                <DragDropContext
                    onDragEnd={propertiesOrderHandler}
                >
                    {[3, 6, 9].map((rowNum, colIndex) => (
                        <div key={`row${rowNum}`} className="properties-col-wrapper">
                            <Droppable
                                index={colIndex}
                                key={`col${rowNum}`}
                                // direction="horizontal"
                                droppableId={`${rowNum}`}
                                type="TECHNICAL_PROPERTIES"
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="properties-col"
                                    >
                                        {reOrderedProperties.slice(rowNum - 3, rowNum).map((property, index) => (
                                            <Draggable
                                                index={index}
                                                key={`completeProperty${property.id}`}
                                                draggableId={property.id}
                                                isDragDisabled={!property.title}
                                            >
                                                {(provided, snapshot) => (
                                                    <div ref={provided.innerRef}
                                                         {...provided.draggableProps}
                                                         {...provided.dragHandleProps}
                                                         className={property.title ? 'property-block' : 'property-block disabled'}>
                                                        {property.title ? (
                                                                <div className={setBlockClassName(property.id)}>
                                                                    {property.id === newPropertyData.id ?
                                                                        <Inputs
                                                                            id={property.id}
                                                                            newPropertyData={newPropertyData}
                                                                            inputFillHandler={inputFillHandler}
                                                                            activationAddPropBlock={() => 1}
                                                                            addOrEditTechProperty={addOrEditTechProperty}
                                                                        />
                                                                        :
                                                                        <div className="property">
                                                                            <div className="title">
                                                                                <EditIcon
                                                                                    clickHandler={() => setNewTechPropertyDate(property)}
                                                                                    className="property-edit-btn"/>
                                                                                {property.title}
                                                                            </div>
                                                                            <div className="value">{property.value}</div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <div className={setBlockClassName(property.id)}>
                                                                    {property.id === firstEmptyPropertyId ?
                                                                        <Inputs
                                                                            newPropertyData={newPropertyData}
                                                                            id={property.id}
                                                                            inputFillHandler={inputFillHandler}
                                                                            activationAddPropBlock={activationAddPropBlock}
                                                                            addOrEditTechProperty={addOrEditTechProperty}
                                                                        />
                                                                        :
                                                                        <div>
                                                                            <input className="title" name="title"
                                                                                   disabled/>
                                                                            <input className="value" name="value"
                                                                                   disabled/>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </DragDropContext>
            </div>
            <NextPrevBtns
                goToNextStep={goToNextStep}
                goToPrevStep={goToPrevStep}
            />
        </div>
    )
}


type InputsProps = {
    id: string,
    newPropertyData: TechnicalPropertyType,
    inputFillHandler: Function,
    activationAddPropBlock: Function,
    addOrEditTechProperty: Function
}

const Inputs = (props: InputsProps) => {

    const {
        id,
        newPropertyData,
        inputFillHandler,
        activationAddPropBlock,
        addOrEditTechProperty
    } = props

    const _setTitleWrapperClassName = () => {
        let classes = 'title-wrapper'
        if (newPropertyData) {
            if (id === newPropertyData.id) {
                if (newPropertyData.title) {
                    classes += ' hide-placeholder'
                    if (newPropertyData.value) {
                        classes += ' show-add-btn'
                    }
                }
            }
        }
        return classes
    }

    const _setValueWrapperClassName = () => {
        let classes = 'value-wrapper'
        if (newPropertyData) {
            if (newPropertyData.value && (id === newPropertyData.id)) classes += ' hide-placeholder'
        }
        return classes
    }

    return (
        <div>
            <div
                id={`title-wrapper${id}`}
                className={_setTitleWrapperClassName()}
            >
                <input
                    onChange={inputFillHandler}
                    data-property-id={id}
                    className="title"
                    name="title"
                    type="text"
                    onFocus={(e) => activationAddPropBlock(e, 'click')}
                    onBlur={(e) => activationAddPropBlock(e, 'blur')}
                    value={(id === newPropertyData.id) && newPropertyData.title ? newPropertyData.title : ''}
                />
                <SquareAdd className="add-property-icon"/>
                <CongratsTick onClick={addOrEditTechProperty}
                              className="add-btn"/>
            </div>
            <div className={_setValueWrapperClassName()}>
                <input
                    name="value"
                    onChange={inputFillHandler}
                    data-property-id={id}
                    onFocus={(e) => activationAddPropBlock(e, 'click')}
                    type="text"
                    onBlur={(e) => activationAddPropBlock(e, 'blur')}
                    className="value"
                    value={(id === newPropertyData.id) && newPropertyData.value ? newPropertyData.value : ''}
                />
            </div>
        </div>
    )
}

export default TechnicalProperties
