import { useState, useRef, useEffect } from 'react';
import ElementsList from '../elementList/elementsList';
import ElementBlock from '../elementBlock/elementBlock';
import './workspace.css'

let initialElements = [
    { id: '1', content: 'Element 1', left: 0, top: 0, zIndex: 1, backgroundColor: "red"},
];
  

export default function Workspace() {
    const [elements, updateElements] = useState(initialElements);
    
    //  может быть попытаться возврашать айди элемента и позицию клика, а потом менять позицию нажатого предмета. 
    
    let elementCoord = {startX: 0, startY: 0, lastX: 0, lastY: 0,}
    let selectedElement = null;
    let isClicked = false
    let isActivatedListners = false


    const onMouseUp = (event) => {
        isClicked = false;
        window.removeEventListener('mousemove', onMouseMove)
    }    
    
    function onMouseDown(id, event) {
        isClicked = true
        selectedElement = id
        // TODO можно сделать двойное нажатие
        elementCoord.lastX = event.target.offsetLeft;
        elementCoord.lastY = event.target.offsetTop;
        
        elementCoord.startX = event.clientX
        elementCoord.startY = event.clientY
        console.log(event.target.style.zIndex)
        
        if (isActivatedListners === false) {
            window.addEventListener("mouseup", (event) => {onMouseUp(event)});
            window.addEventListener('mousemove', (event) => {onMouseMove(event)})
            isActivatedListners = true
        }
        // TODO сделать выдвигающуюся панельку по клику.
    }
    
    const onMouseMove = (event) => {
        if (!isClicked) return;
        // if (elementCoord.lastX != elementCoord.startX) return;
        const nextX = event.clientX - elementCoord.startX + elementCoord.lastX;
        const nextY = event.clientY - elementCoord.startY + elementCoord.lastY;  

        const newElements = elements.map((obj) => {
            if (obj.id === selectedElement) {
                return {...obj, left: nextX, top: nextY};
            }     
            return obj;
        })    
        updateElements(newElements)
    }     

    
    




    // const worspace = document.getElementById('workspace')
    // сделать стэйт с выбранным элементом и менять его в блоке

    const onUpdateElements =(elements)=>{
        // let newElements = elements;
        // elements.join(element)
        updateElements(elements)
    }    


    return (
        <div id='workspace' >
            <div style={{background:'aqua', width:'200px', position:'absolute', right:'0'}}>
                <ElementsList elements = {elements} updateLoyouts={onUpdateElements} />
            </div>

            <div id ='redactor'>                
                {elements.map((element, index) => {
                    let styles = {left : element.left, top: element.top, zIndex: index, backgroundColor: element.backgroundColor}
                    return (
                        <ElementBlock  identificator={element.id}  onSelect={onMouseDown} blockStyle={styles}>{element.content}</ElementBlock>
                    )
                })}    
            </div>
            

        </div>
    )
}