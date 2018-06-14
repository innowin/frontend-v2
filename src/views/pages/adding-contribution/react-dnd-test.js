import React, {Component} from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class Test extends Component {
  state = {
    draggablesData: [
      {id: 1, title: 'یک'},
      {id: 2, title: 'دو'},
    ]
  }
    // onDragStart = (e) => {
    //   console.log('---------------started---------------------')
    //   console.log(e)
    //   console.log(e.target)
    //   console.log('---------------started---------------------')
    // };
    // onDragUpdate = (e) => {
    //   console.log('---------------updated---------------------')
    //   console.log(e)
    //   console.log(e.target)
    //   console.log('---------------updated---------------------')
    // }
    onDragEnd = (result) => {
      console.log('---------------the end---------------------')
      console.log(result)
      console.log('---------------the end---------------------')
      if (!result.destination) {
        return;
      }
      // the only one that is required
      const dr = this.state.draggablesData;
      const draggablesData = reorder(
        this.state.draggablesData,
        result.source.index,
        result.destination.index
      );
      this.setState({ ...this.state, draggablesData })

    };
  
    render() {
      return (
        <DragDropContext
          onDragStart={this.onDragStart}
          onDragUpdate={this.onDragUpdate}
          onDragEnd={this.onDragEnd}
        >
      <Droppable droppableId="droppable-1" type="PERSON">
  {(provided, snapshot) => (
    <div
      ref={provided.innerRef}
      {...provided.droppableProps}
    >
{
  this.state.draggablesData.map((item, index) => (
    <Draggable draggableId={item.id} index={index}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <h4>{item.title}</h4>
      </div>
    )}
  </Draggable>
  ))
}    

    <h4>test</h4>
      {provided.placeholder}
      </div>
  )}

</Droppable>
        </DragDropContext>
      );
    }
  }
  export default Test
