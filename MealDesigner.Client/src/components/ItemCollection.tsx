import Item from "./Item";
import { DragEventHandler } from "react";
import type { RankingItem } from "./RankItems";

const ItemCollection = ({items, drag, imgArr} : {items: RankingItem[], drag: DragEventHandler, imgArr: any}) => {
    return( 
        <div className={"items-not-ranked"}>
        {
            items.map((item) => (item.ranking === 0)
                ?<Item item={item} drag={drag} itemImgObj={imgArr.find((o: any) => o.id === item.imageId)} key={item.id} />
                :null)
        }
        </div>
    )
}
export default ItemCollection;