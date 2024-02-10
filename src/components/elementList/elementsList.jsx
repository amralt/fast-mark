import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { contentStyles } from "../workspace/workspace";


export default function ElementsList({elements, updateElements}) {
  
  const [text, setText] = React.useState('hello');

  function handleChange(e) {
    setText(e.target.value);
  }

  

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(elements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateElements(items)
  };


  function handleOnClick(){
    let items = Array.from(elements);
    let newId = (items.length + 1).toString();

    let newItem = {
      id: newId,
      content: "some cont",
      contentStyles: contentStyles,
    }

    items.push(newItem);

    console.log(newItem);

    updateElements(items)
  }

  function addNewElement() {
    let items = Array.from(elements);
    let newId = (items.length + 1).toString();

    let newItem = {
      id: newId,
      content: text,
      left: 0,
      top: 0,
      zIndex: newId,
      width: "100px",
      height: "100px"
    }

    items.push(newItem);
  }


  return (
    <>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="elements">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {elements.map((element, index) => (
              <Draggable key={element.id} draggableId={element.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    // index меняется при перетягивании!!!
                  >
                    {/* TODO: реализовать возможность для пользователя изменять айди  */}
                    {element.id}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
    <button  onClick={handleOnClick}>render text</button>
                  
      <>
        <input value={text} onChange={handleChange} />
        <p>You typed: {text}</p>
        <button onClick={addNewElement}>
          add
        </button>
      </>

    </>
  );
};