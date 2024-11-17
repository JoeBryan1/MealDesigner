import React, { useState, useEffect } from 'react';
import RankingGrid from "../components/RankingGrid.tsx";
import ItemCollection from "../components/ItemCollection";

export type RankingItem = {
    id: number;
    title: string;
    imageId: number;
    ranking: number;
    itemType: number;
}

const RankItems = () => {

    const [items, setItems] = useState<string[]>([]);
    const dataType = 1;
    
    function drag(ev: any) {
        ev.dataTransfer.setData("text", ev.target.id);
    }
    
    function allowDrop(ev: any) {
        ev.preventDefault();    
    }
    
    function  drop(ev: any) {
        ev.preventDefault();
        const targetElm = ev.currentTarget;
        var dragId = parseInt(ev.dataTransfer.getData("text").substring(5));
        
        if(targetElm.nodeName == "IMG") {
            return false;
        }
        if(targetElm.childNodes.length === 0){
            const transformedCollection = 
                items.map((item)=> (item.id === dragId) ? 
                {...item, ranking: parseInt(targetElm.id.substring(5)) } : {...item, ranking: item.ranking })
            setItems(transformedCollection);
        }
        
    }
    
    function reset()
    {
        const transformedCollection = items.map((item) => ({...item, ranking: 0}))
        setItems(transformedCollection);
    }
    
    useEffect(() => {
        fetch(`api/item/${dataType}`)
            .then((results) => {
                return results.json();
            })
            .then(data => {
                setItems(data);
            })
    }, [])

    return (
        <main>
            <RankingGrid items={items} imgArr={} drag={drag} allowDrop={allowDrop} drop={drop} />
            <ItemCollection items={items} drag={drag} imgArr={} />
        </main>
    )
}

export default RankItems;