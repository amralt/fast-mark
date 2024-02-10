import "./elementBlock.css"
import BorderBlock from "../choosenElementMask/borderBlock";
import { useState } from "react";
import DragPoint from "../choosenElementMask/dragPoints";

export default function ElementBlock({childElement, identificator, onDragging, blockStyle, isSelected,  updateStyles, contentStyles, onSelect}) {
    const [elementStyles,   setStyles ] = useState(blockStyle)

    function onSelectElement() {
        onSelect(identificator)
    }

    if (isSelected) {
        return (
            <div className={"element-block box"}  id = {identificator} style={blockStyle}  onMouseDown={(event) => {onDragging(identificator, event)}} >
            
                <div className="box "  style={contentStyles}>
                    {childElement.content}
                </div>

                <BorderBlock></BorderBlock>
                <DragPoint></DragPoint>
            </div>
        )} 
    else {
        return (
        <div className="element-block" id = {identificator} style={blockStyle} >

            <div className="content-element"
                onMouseDown={onSelectElement}
                style={contentStyles}>
                {childElement.content}
            </div>

        </div>
        )
    }
}