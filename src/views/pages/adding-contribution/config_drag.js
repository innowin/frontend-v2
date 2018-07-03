import React from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {SquareAdd, CongratsTick} from '../../../images/icons'

const TechnicalProperties = ({propertiesOrderHandler}) => (
    <DragDropContext
        onDragEnd={propertiesOrderHandler}
        //              onDragStart={res => console.log('srart', res)}
        //              onDragUpdate={(res) => console.log('res is: ', res)}
    >
        {[3, 6, 9].map(colNum => (
            <div key={`col${colNum}`} className="properties-col">
                <div className="properties-wrapper">
                    <Droppable
                        key={`col${colNum}`}
                        direction="horizontal"
                        droppableId={`technical-properties${colNum}`}
                        type="TECHNICAL_PROPERTIES"
                    >
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="properties-col"
                            >
                                {reOrderedProperties().slice(colNum - 3, colNum).map((property, index) => (
                                    <Draggable index={index} key={`completeProperty${property.id}`}
                                               draggableId={property.id}>
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef}
                                                 {...provided.draggableProps}
                                                 {...provided.dragHandleProps} className="property-block">
                                                {property.title ? (
                                                        <div className="property">
                                                            <div className="title">{property.title}</div>
                                                            <div className="value">{property.value}</div>
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <div className={setBlockClassName(property.id)}>
                                                            {property.id === firstEmptyPropertyId ?
                                                                <div>
                                                                    <div
                                                                        id={`title-wrapper${property.id}`}
                                                                        className="title-wrapper"
                                                                    >
                                                                        <input
                                                                            onChange={inputFillHandler}
                                                                            data-property-id={property.id}
                                                                            className="title"
                                                                            name="title"
                                                                            onFocus={(e) => activationAddPropBlock(e, 'click')}
                                                                            onBlur={(e) => activationAddPropBlock(e, 'blur')}
                                                                        />
                                                                        <SquareAdd className="add-property-icon"/>
                                                                        <CongratsTick onClick={addOrEditTechProperty}
                                                                                      className="add-btn"/>
                                                                    </div>
                                                                    <div className="value-wrapper">
                                                                        <input
                                                                            name="value"
                                                                            onChange={inputFillHandler}
                                                                            data-property-id={property.id}
                                                                            onFocus={(e) => activationAddPropBlock(e, 'click')}
                                                                            onBlur={(e) => activationAddPropBlock(e, 'blur')}
                                                                            className="value"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div>
                                                                    <input className="title" name="title" disabled/>
                                                                    <input className="value" name="value" disabled/>
                                                                </div>
                                                            }

                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </div>
                        )}
                    </Droppable>
                </div>
            </div>
        ))}
    </DragDropContext>
)
export default TechnicalProperties
