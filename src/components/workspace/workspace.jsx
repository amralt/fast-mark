import { useState } from 'react';
import ElementsList from '../elementList/elementsList';
import ElementBlock from '../elementBlock/elementBlock';
import ButtonCreateElement from '../buttonCreateElement/buttonCreateElement';
import { dragPointClassName } from '../../const/classNameConst';
import './workspace.css'

// Используется так же в ElementList
export const contentStyles = {dysplay: "block", marginLeft: "auto", marginRight: "auto"}


let initialElements = [
    { id: '1', content: 'Element 1', left: 0, top: 0, zIndex: 1, width: "100px", height: "100px", isSelected: false, contentStyles: contentStyles, },
];
const dragClickType = "drag"
const resizeClickType = "resize"

export default function Workspace() {
    const [elements, updateElements] = useState(initialElements);

    // КУЧА ДЕРЬМА
    let elementCoord = {startX: 0, startY: 0, lastX: 0, lastY: 0,}
    let clickType = null
    let selectedElement = null;
    let isActivatedListners = false

    function activateListners() {
        if (isActivatedListners === false) {
            window.addEventListener("mouseup", (event) => {onMouseUp(event)});
            window.addEventListener('mousemove', (event) => {onMouseMove(event)})
            isActivatedListners = true
        }
    }

    const onMouseUp = (event) => {
        selectedElement = null;
        // Таким образом реализовывается нажатие по элементу
        window.removeEventListener('mousemove', onMouseMove)
    }    
    
    function onMouseDown(id, event) {
        selectedElement = id

        let currentElement = document.getElementById(id)
        const localClassName = event.target.className;
        if (localClassName.includes(dragPointClassName)) {
            clickType = resizeClickType;
            
            elementCoord.lastX = currentElement.offsetWidth;
            elementCoord.lastY = currentElement.offsetHeight;

            elementCoord.startX = event.clientX;
            elementCoord.startY = event.clientY;

            return;
        } else {
        
        clickType = dragClickType

        elementCoord.lastX = currentElement.offsetLeft;
        elementCoord.lastY = currentElement.offsetTop;
        
        elementCoord.startX = event.clientX
        elementCoord.startY = event.clientY    

        
        activateListners()
    }
}
// TODO сделать выдвигающуюся панельку по клику.
    
    const onMouseMove = (event) => {
        if (selectedElement === null) return;
        
        if (clickType === resizeClickType) {
            const newElements = elements.map((obj) => {
                if (obj.id === selectedElement) {
                    let width = `${ Number(elementCoord.lastX) + Number(event.clientX) - Number(elementCoord.startX) }px`;
                    let height = `${ Number(elementCoord.lastY) + Number(event.clientY) - Number(elementCoord.startY) }px`;

                    return {...obj, width: width, height: height};
                }     
                return obj;
            })    
            updateElements(newElements)
            return;
        }
        
        if (clickType === dragClickType) {

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
    }     

   
    function onSelectElement(id) {
        const newElements = elements.map((obj) => {
             if (obj.id === id) {
                 return {...obj, isSelected: true}
             } else {
                 return {...obj, isSelected: false}
             }
         })

         updateElements(newElements);
    }


    const onUpdateElements =(elements)=>{
        updateElements(elements)
    }    

    function updateElementStyle(id, newStyle) {
        const newElements = elements.map((obj) => {
            if (obj.id === id) {
                return {...obj, newStyle}
            } else {
                return {...obj}
            }
        });
        updateElements(newElements)
    }

    function onWorkspaceMouseDown(event) {
        if (String(event.target.id) === "redactor") {
            selectedElement = null;
            onSelectElement("redactor")
        }
    }

    return (
        <div id='workspace' onMouseDown={(event) => {onWorkspaceMouseDown(event)}}>
            <div style={{background:'aqua', width:'200px', position:'absolute', right:'0'}}>
                <ElementsList elements = {elements} updateElements={onUpdateElements} />
            </div>
            {/* Здесь у нас рендерятся все */}
            <div id ='redactor'>                
                {elements.map((element, index) => {
                    let styles = {left: element.left, top: element.top, zIndex: index, width: element.width, height: element.height }
                    return (
                        <ElementBlock childElement={element} updateStyles={updateElementStyle} contentStyles={element.contentStyles} onSelect={onSelectElement} isSelected={element.isSelected} identificator={element.id} onDragging={onMouseDown} blockStyle={styles}></ElementBlock>
                    )
                })}    
            </div>

            <div id = "toolbar">
                <ButtonCreateElement elements={elements} updateElements={updateElements} elementContent = {<h1>Yes</h1>}></ButtonCreateElement>

            </div>
            

        </div>
    )
}