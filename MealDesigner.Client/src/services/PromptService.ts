import {FoodItem} from "./FoodItemService";

export type RecipeProperties = {
    recipeName: string;
    recipe: string;
}

export type PromptResponse = {
    recipeProperties: RecipeProperties;
    imgUrl: string;
}

export type TriggerFoodGenDTO = {
    foodItems: FoodItem[];
    cuisine?: string;
    regenerate?: Regenerate;
}

export type Regenerate = {
    regenerateRecipe: boolean;
    recipe: string;
}

export default class PromptService {
    async TriggerFoodImageGen(request: TriggerFoodGenDTO) : Promise<PromptResponse> {
        return await fetch('http://localhost:5244/api/prompt', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request)
        }).then((results) => {
                return results.json();
            })
    }
}