import { DragEventHandler } from "react";
import type { RankingItem } from "../pages/RankItems";
const RankingGrid = ({ items, imgArr, drag, allowDrop, drop } : {items: RankingItem[], imgArr: any, drag: DragEventHandler, allowDrop: DragEventHandler, drop: DragEventHandler}) => {
    
    const rankingGrid : any = [];
    const cellCollectionTop: any = [];
    const cellCollectionMiddle: any = [];
    const cellCollectionBottom: any = [];
    const cellCollectionWorst: any = [];
    
    function pushCellMarkupToArr(cellCollection: any, rankNum: number, rowLabel: string) {
        if (rankNum > 0) {
            var item = items.find(o => o.ranking === rankNum);
            cellCollection.push(<div id={`rank-${rankNum}`} key={rankNum} className="rank-cell">
                {(item != null) ? <img id={`item-${item.id}`} src={imgArr.find(o => o.id === item.imageId)?.image} draggable = "true" onDragStart={drag} />
                    : null}
            </div>);
        }
        else {
            cellCollection.push(<div className={"row-label"}>
                <h4>{rowLabel}</h4>
            </div>);
        }
    }

    function createCellsForRow(rowNum: number) {
        var rankNum = 0;
        var currCollection = [];
        var label = '';
        const numCells = 6;
        
        for (var a = 1; a < numCells; a++) {
            rankNum = (a === 1) ? 0 : (numCells * (rowNum - 1)) + a - rowNum;
            
            if (rowNum === 1) {
                currCollection = cellCollectionTop;
                label = "Top Tier";
            }
            else if (rowNum === 2) {
                currCollection = cellCollectionMiddle;
                label = "Middle Tier";
            }
            else if (rowNum === 3) {
                currCollection = cellCollectionBottom;
                label = "Bottom Tier";
            }
            else if (rowNum === 4) {
                currCollection = cellCollectionWorst;
                label = "Worst Tier";
            }
            pushCellMarkupToArr(currCollection, rankNum, label);
            
        }
    }
    
    function createCellForRows() {
        const maxRows = 4;
        for (var row = 1; row <= maxRows; row++) {
            createCellsForRow(row);
        }
    }
    
    function createRowsForGrid() {
        
        rankingGrid.push(<div className={"rank-row top-tier"} onDrop={drop} onDragOver={allowDrop} >{cellCollectionTop}</div>)
        rankingGrid.push(<div className={"rank-row middle-tier"} onDrop={drop} onDragOver={allowDrop} >{cellCollectionMiddle}</div>)
        rankingGrid.push(<div className={"rank-row bottom-tier"} onDrop={drop} onDragOver={allowDrop} >{cellCollectionBottom}</div>)
        rankingGrid.push(<div className={"rank-row worst-tier"} onDrop={drop} onDragOver={allowDrop} >{cellCollectionWorst}</div>)
        
        return rankingGrid;
    }
    
    function createRankingGrid() {
        createCellForRows();
        return createRowsForGrid();
    }
    
    return (
        <div className={"rankings"}>
            {createRankingGrid()}
        </div>
    )
}

export default RankingGrid;