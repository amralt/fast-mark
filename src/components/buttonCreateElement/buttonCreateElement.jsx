

export default function ButtonCreateElement({elements, updateElements, elementContent}) {
    function handleOnUpdateElements() {
        let items = Array.from(elements);
        let newId = (items.length + 1).toString();
    
        let newItem = {
          id: newId,
          content: elementContent,
        }
    
        items.push(newItem);
    
        console.log(newItem);
    
        updateElements(items)
    }
    return (
        <button onClick={handleOnUpdateElements}>render some</button>
    )

    // updateElements()
}