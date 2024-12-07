import {FoodItem} from "../pages/FoodPicker";

export default class PromptService {
    async TriggerFoodImageGen(foodItemArray: FoodItem[]) : Promise<string> {
        return await fetch('http://localhost:5244/api/prompt', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(foodItemArray)
        }).then((results) => {
                return results.text();
            })
    }
}