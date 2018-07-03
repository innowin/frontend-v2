import React from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {SquareAdd, CongratsTick} from '../../../images/icons'

const TechnicalProperties = ({
                                 properties, activationAddPropBlock, addingTechPropNow, inputFillHandler,
                                 newPropertyData, addOrEditTechProperty, propertiesOrderHandler
                             }) => {
    const incompleteProperties = properties && properties.filter(property => !property.title)
    const completeProperties = properties && properties.filter(property => !incompleteProperties.includes(property))
    const firstEmptyPropertyId = incompleteProperties && incompleteProperties[0].id
    const setBlockClassName = (id) => {
        let classes = 'add-property-block'
        if (id === firstEmptyPropertyId) {
            classes += ' first-empty-property'
            if (addingTechPropNow) classes += ' active'
        }
        return classes
    }

    const reOrderedProperties =  () => {
        return properties.slice().sort((a, b) => {
            if (a.title && !b.title) return -1
            if (b.title && !a.title) return 1
            return 0
        })
    }

    return (
        <div className="technical-properties-wrapper">
            {console.log(reOrderedProperties())}
            <DragDropContext
                onDragEnd={propertiesOrderHandler}
                //              onDragStart={res => console.log('srart', res)}
                //              onDragUpdate={(res) => console.log('res is: ', res)}
            >
                <Droppable direction="horizontal" droppableId="technical-properties" type="TECHNICAL_PROPERTIES">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} >
                            <div className="properties-wrapper">
                                {completeProperties && completeProperties.map((property, index) => (
                                    <Draggable index={index}  key={`completeProperty${property.id}`} draggableId={property.id} >
                                        {(provided, snapshot) => (
                                            <div
                                                className={`property-block id-${property.id} index-${index}`}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className="property">
                                                    <div className="title">{property.title}</div>
                                                    <div className="value">{property.value}</div>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {incompleteProperties && incompleteProperties.map(property => (
                                    <div className="property-block" key={`incompleteProperty${property.id}`}>
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
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default TechnicalProperties
// import React from 'react';
// import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
// import {SquareAdd, CongratsTick} from '../../../images/icons'
//
// const TechnicalProperties = ({
//                                  properties, activationAddPropBlock, addingTechPropNow, inputFillHandler,
//                                  newPropertyData, addOrEditTechProperty, propertiesOrderHandler
//                              }) => {
//     const incompleteProperties = properties && properties.filter(property => !property.title)
//     const completeProperties = properties && properties.filter(property => !incompleteProperties.includes(property))
//     const firstEmptyPropertyId = incompleteProperties[0] && incompleteProperties[0].id
//     const setBlockClassName = (id) => {
//         let classes = 'add-property-block'
//         if (id === firstEmptyPropertyId) {
//             classes += ' first-empty-property'
//             if (addingTechPropNow) classes += ' active'
//         }
//         return classes
//     }
//
//     return (
//         <div className="technical-properties-wrapper">
//             <div className="properties-wrapper">
//                 <DragDropContext
//                     onDragEnd={propertiesOrderHandler}
//                     //              onDragStart={res => console.log('srart', res)}
//                     // onDragUpdate={(res) => console.log('res is: ', res)}
//                 >
//                     <Droppable droppableId="technical-properties" type="TECHNICAL_PROPERTIES">
//                         {(provided, snapshot) => (
//                             <div ref={provided.innerRef} {...provided.droppableProps} >
//                                 {completeProperties && completeProperties.map((property, index) => (
//                                     <Draggable index={index} key={`completeProperty${property.id}`}
//                                                draggableId={property.id}>
//                                         {(provided, snapshot) => (
//                                             <div
//                                                 className={`property-block id-${property.id} index-${index}`}
//                                                 ref={provided.innerRef}
//                                                 {...provided.draggableProps}
//                                                 {...provided.dragHandleProps}
//                                             >
//                                                 <div className="property">
//                                                     <div className="title">{property.title}</div>
//                                                     <div className="value">{property.value}</div>
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </Draggable>
//                                 ))}
//                             </div>
//                         )}
//                     </Droppable>
//                 </DragDropContext>
//                 {incompleteProperties && incompleteProperties.map(property => (
//                     <div className="property-block" key={`incompleteProperty${property.id}`}>
//                         <div className={setBlockClassName(property.id)}>
//                             {property.id === firstEmptyPropertyId ?
//                                 <div>
//                                     <div
//                                         id={`title-wrapper${property.id}`}
//                                         className="title-wrapper"
//                                     >
//                                         <input
//                                             onChange={inputFillHandler}
//                                             data-property-id={property.id}
//                                             className="title"
//                                             name="title"
//                                             onFocus={(e) => activationAddPropBlock(e, 'click')}
//                                             onBlur={(e) => activationAddPropBlock(e, 'blur')}
//                                         />
//                                         <SquareAdd className="add-property-icon"/>
//                                         <CongratsTick onClick={addOrEditTechProperty}
//                                                       className="add-btn"/>
//                                     </div>
//                                     <div className="value-wrapper">
//                                         <input
//                                             name="value"
//                                             onChange={inputFillHandler}
//                                             data-property-id={property.id}
//                                             onFocus={(e) => activationAddPropBlock(e, 'click')}
//                                             onBlur={(e) => activationAddPropBlock(e, 'blur')}
//                                             className="value"
//                                         />
//                                     </div>
//                                 </div>
//                                 :
//                                 <div>
//                                     <input className="title" name="title" disabled/>
//                                     <input className="value" name="value" disabled/>
//                                 </div>
//                             }
//
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }
//
// export default TechnicalProperties
    .technical-properties-wrapper .properties-row {
    display: flex;
    flex-direction: column;
    flex: 0 0 240px;
    width: 240px;
    margin: 12px 15px;
}