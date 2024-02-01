import { useEffect, useState } from "react"
import "./elementBlock.css"

export default function ElementBlock({identificator, onSelect, blockStyle}) {
    const [newCoords, setNewCoords] = useState({left: 0, top: 0});




//onClickCapture={() => onSelect(identificator)} 
    return (
        <div className="element-block" id = {identificator} style={blockStyle}
            onMouseDown={(event) => {onSelect(identificator, event)}}
            >
            
            <div className="drag-point left-up-point"></div>
            <div className="drag-point right-up-point" ></div>
            <div className="drag-point left-buttom-point" style={{left: "0", bottom: "0"}}></div>
            <div className="drag-point right-buttom-point" style={{right: "0", bottom: "0"}}></div>
            {/* ({coords.x}, {coords.y}) */}
            {/* Вот я не знаю, как рендерить дочерние элементы. Они ведь могут быть разных типов, писать кучу условий? А может солид и ХЕшМАп? */}

        </div>

    )
}