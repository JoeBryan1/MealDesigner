import { useState, useEffect, useCallback } from 'react';

import FoodItemService from "@/services/FoodItemService.ts";
import PromptService, {PromptResponse, TriggerFoodGenDTO} from "@/services/PromptService.ts";
import Loading from "@/pages/Loading.tsx";
import Recipe from "@/pages/Recipe.tsx";
import Designer from "@/pages/Designer.tsx";

export const Cuisines: string[] = ["French", "Italian", "Mexican"]

const FoodPicker= () => {
    
    const foodItemService = new FoodItemService();
    const promptService = new PromptService();
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSelecting, setIsSelecting] = useState(true);
    
    const [promptResponse, setPromptResponse] = useState<PromptResponse>();
    
    const [foodItemGroups, setFoodItemGroups] = useState<string[]>([]);
    
    const [lastRequest, setLastRequest] = useState<TriggerFoodGenDTO>();

    useEffect(() => {
        localStorage.setItem("lastRequest", JSON.stringify(lastRequest));
    }, [lastRequest]);

    useEffect(() => {
        foodItemService.getAllGroups()
            .then((data) => {
                setFoodItemGroups(data);
                setIsLoaded(true);
            });
    }, [])
    
    const generateMeal = useCallback((request: TriggerFoodGenDTO) =>
    {
        setIsSelecting(false);
        setIsLoaded(false);
        
        setLastRequest(request);
        
        promptService.TriggerFoodImageGen(request)
            .then((promptResponse) => {
                setPromptResponse(promptResponse);
                setIsLoaded(true);
            })
    }, [isLoaded, isSelecting]);
    
    if (isLoaded && isSelecting) {
        return (
            <Designer foodItemGroups={foodItemGroups} generateMeal={generateMeal} />
        )
    }
    else if (isLoaded && !isSelecting) {
        return(
            <Recipe promptResponse={promptResponse!} generateMeal={generateMeal} />
        )
    } else {
        return (
            <Loading/>
        )
    }
}

export default FoodPicker;
