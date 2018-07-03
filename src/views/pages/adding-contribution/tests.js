const TechnicalPropertiesWithoutIndex = ({
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

    return (
        <div className="technical-properties-wrapper">
            <DragDropContext
                onDragEnd={propertiesOrderHandler}
                //              onDragStart={res => console.log('srart', res)}
                onDragUpdate={(res) => console.log('res is: ', res)}
            >
                <Droppable droppableId="technical-properties" type="TECHNICAL_PROPERTIES">
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

                                    <Draggable isDragDisabled index={property.id} key={`incompleteProperty${property.id}`} draggableId={property.id} >
                                        {(provided, snapshot) => (
                                            <div
                                                className="property-block"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
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
                                        )}
                                    </Draggable>
                                ))}
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}
