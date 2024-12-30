import {useState} from "react";

import {SelectMap, SelectMapFoodItem} from "../components/select-map";
import {Button} from "../components/ui/button";
import FoodItemCard from "../components/food-item-card";
import {Cuisines} from "./FoodPicker";
import FoodItemService, {FoodItem} from "../services/FoodItemService";
import {TriggerFoodGenDTO} from "@/services/PromptService.ts";

export type DesignerProps = {
    generateMeal: (request: TriggerFoodGenDTO) => void;
    foodItemGroups: string[];
}

const Designer = (props: DesignerProps) => {

    const foodItemService = new FoodItemService();
    
    const [foodNames, setFoodNames] = useState<FoodItem[]>([]);
    const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([]);
    const [selectedFoodGroup, setSelectedFoodGroup] = useState<string>("");
    const [selectedFoodItemId, setSelectedFoodItemId] = useState<number>();

    const [selectedCuisine, setSelectedCuisine] = useState<string>("");
    
    const getFoodItemsFromGroup = (foodGroup: string) =>
    {
        setSelectedFoodGroup(foodGroup);

        foodItemService.getByGroup(foodGroup)
            .then((data) => {
                setFoodNames(data);
            })
    }

    const addFoodItem = (id?: number) =>
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
    
    const removeFoodItem = (index: number)=> {
        setSelectedFoods(selectedFoods => selectedFoods.filter((_, i) => i !== index));
    }
    
    const generateMealRequest = () => {
        let request: TriggerFoodGenDTO = {
            foodItems: selectedFoods,
            cuisine: selectedCuisine
        }
        
        props.generateMeal(request);
    }

    return (
        <div>
            <SelectMap array={Cuisines}
                       onValueChange={(cuisine) => setSelectedCuisine(cuisine)}
                       placeholder={"Select a cuisine"}/>

            <SelectMap array={props.foodItemGroups}
                       onValueChange={(foodGroup) => getFoodItemsFromGroup(foodGroup)}
                       placeholder={"Select a food group"}/>

            {selectedFoodGroup != "" &&
                <SelectMapFoodItem array={foodNames}
                                   onValueChange={(value) => setSelectedFoodItemId(Number(value))}/>
            }

            <Button onClick={() => addFoodItem(selectedFoodItemId)}>Add to Selection</Button>
            <FoodItemCard selectedFoodsArray={selectedFoods} onClose={removeFoodItem}/>

            {selectedFoods.length > 0 &&
                <Button onClick={generateMealRequest}>Design Meal</Button>
            }
        </div>
    )
}

export default Designer;
