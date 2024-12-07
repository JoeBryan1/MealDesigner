import { useState, useEffect } from 'react';

import FoodItemService from "@/services/FoodItemService.ts";

import { Button } from "@/components/ui/button"
import {Spinner} from "@/components/ui/spinner.tsx";
import {SelectMap, SelectMapFoodItem} from "@/components/SelectMap.tsx";
import FoodItemCard from "@/components/FoodItemCard.tsx";
import PromptService from "@/services/PromptService.ts";

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
    
    const foodItemService = new FoodItemService();
    const promptService = new PromptService();

    const [foodItemGroups, setFoodItemGroups] = useState<string[]>([]);
    const [foodNames, setFoodNames] = useState<FoodItem[]>([]);
    const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([]);
    const [selectedFoodGroup, setSelectedFoodGroup] = useState<string>("");
    let selectedFoodItemId: number;
    
    const [isLoaded, setIsLoaded] = useState(false);
    
    const [mealURL, setMealURL] = useState("");
    
    useEffect(() => {
        foodItemService.getAllGroups()
            .then((data) => {
                setFoodItemGroups(data);
                setIsLoaded(true);
            });
    }, [])
    
    const getFoodItemsFromGroup = (foodGroup: string) =>
    {
        setSelectedFoodGroup(foodGroup);
        
        foodItemService.getByGroup(foodGroup)
            .then((data) => {
                setFoodNames(data);
            })
    }
    
    const addSelectedFood = (id: number) =>
    {
        if (id === undefined)
            return;
        
        foodItemService.getById(id)
            .then((data) => {
                if (!selectedFoods.includes(data)) {
                    setSelectedFoods(selectedFoods => [...selectedFoods, data]);
                }
            });
    }
    
    const generateMeal = () =>
    {
        promptService.TriggerFoodImageGen(selectedFoods)
            .then((data) => {setMealURL(data)})
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
                
                {selectedFoods.length > 0 &&
                    <Button onClick={() => generateMeal()}>Design Meal</Button>
                }

                {mealURL != "" && 
                    <img src={mealURL}/>
                }
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
