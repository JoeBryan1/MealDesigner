import { DragEventHandler } from "react";
import type { RankingItem } from "./RankItems";

const Item = ({item, drag, itemImgObj} : {item: RankingItem, drag: DragEventHandler, itemImgObj: any}) => {
    return (
        <div className={"unranked-cell"} key={item.id}>
            <img id={`item-${item.id}`} src={itemImgObj.image}
                 key={item.id} style={{cursor: "pointer"}} draggable={"true"} onDragStart={drag}/>
        </div>
    )
}
export default Item;