import { useState, useEffect } from 'react';

import Markdown from 'react-markdown';

import FoodItemService from "@/services/FoodItemService.ts";

import { Button } from "@/components/ui/button"
import {Spinner} from "@/components/ui/spinner.tsx";
import {SelectMap, SelectMapFoodItem} from "@/components/select-map.tsx";
import FoodItemCard from "@/components/food-item-card.tsx";
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
    
    const [selecting, setIsSelecting] = useState(true);
    
    const [imgUrl, setImgUrl] = useState("");
    const [recipeName, setRecipeName] = useState("");
    const [recipe, setRecipe] = useState("");
    
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
        setIsSelecting(false);
        setIsLoaded(false);
        
        promptService.TriggerFoodImageGen(selectedFoods)
            .then((promptResponse) => {
                setImgUrl(promptResponse.imgUrl);
                setRecipeName(promptResponse.recipeProperties.recipeName);
                setRecipe(promptResponse.recipeProperties.recipe);
                setIsLoaded(true);
            })
    }
    
    if (isLoaded && selecting) {
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
                
            </main>
        )
    }
    else if (isLoaded && !selecting) {
        return(
            <main>
                <div>
                    <h1>{recipeName}</h1>
                    <Markdown>{recipe}</Markdown>
                    <img src={imgUrl}/>
                </div>
            </main>
        )
    } else {
        return (
            <main>
                <Spinner size="lg" className="bg-black dark:bg-white"/>
            </main>
        )
    }
}

export default FoodPicker;
