import { useState, useEffect } from 'react';

import { Button } from "@/components/ui/button"
import {Spinner} from "@/components/ui/spinner.tsx";
import {SelectMap, SelectMapFoodItem} from "@/components/SelectMap.tsx";
import FoodItemCard from "@/components/FoodItemCard.tsx";

export type FoodItem = {
    foodItemId: number;
    name: string;
    latinName: string;
    description: string;
    foodGroup: string;
    subFoodgroup: string;
    wikipediaId: string;
}

const FoodPicker= () => {

    const [foodItemGroups, setFoodItemGroups] = useState<string[]>([]);
    const [foodNames, setFoodNames] = useState<FoodItem[]>([]);
    const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([]);
    
    const [selectedFoodGroup, setSelectedFoodGroup] = useState<string>("");
    let selectedFoodItemId: number;
    
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        fetch('https://meal-designer-api-fshcgpckhyfpf9bv.uksouth-01.azurewebsites.net/api/fooditem/foodgroups')
            .then((results) => {
                return results.json();
            })
            .then(data => {
                setFoodItemGroups(data);
                setIsLoaded(true);
            })
    }, [])
    
    const getFoodItemsFromGroup = (foodGroup: string) =>
    {
        setSelectedFoodGroup(foodGroup);
        
        fetch('https://meal-designer-api-fshcgpckhyfpf9bv.uksouth-01.azurewebsites.net/api/fooditem/foodgroup/'+foodGroup)
            .then((results) => {
                return results.json();
            })
            .then(data => {
                setFoodNames(data);
            });
    }
    
    const addSelectedFood = (id: number) =>
    {
        if (id === undefined)
            return;
        
        fetch('https://meal-designer-api-fshcgpckhyfpf9bv.uksouth-01.azurewebsites.net/api/fooditem/'+id)
            .then((results) => {
            return results.json();
            })
            .then(data => {
                if (!selectedFoods.includes(data)) {
                    setSelectedFoods(selectedFoods => [...selectedFoods, data]);
                }
            })
    }
    
    if (isLoaded) {
        return (
            <main>
                <SelectMap array={foodItemGroups} 
                           onValueChange={(foodGroup) => getFoodItemsFromGroup(foodGroup)} />

                {selectedFoodGroup != "" &&
                    <SelectMapFoodItem array={foodNames} 
                               onValueChange={(value) => selectedFoodItemId = Number(value)} />
                }

                <Button onClick={() => addSelectedFood(selectedFoodItemId)}>Add to Selection</Button>
                <FoodItemCard selectedFoodsArray={selectedFoods} />
            </main>
        )
    }
    else {
        return (
            <main>
                <Spinner size="lg" className="bg-black dark:bg-white"/>
            </main>
        )
    }
}

export default FoodPicker;
