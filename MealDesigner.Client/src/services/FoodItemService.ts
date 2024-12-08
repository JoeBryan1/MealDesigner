import {FoodItem} from "../pages/FoodPicker";

export default class FoodItemService {

    async getById(id: Number): Promise<FoodItem> {
        return await fetch('https://meal-designer-api-fshcgpckhyfpf9bv.uksouth-01.azurewebsites.net/api/fooditem/'+id)
            .then((results) => {
                return results.json();
            })
    }
    
    async getAllGroups() : Promise<string[]> {
        return await fetch('https://meal-designer-api-fshcgpckhyfpf9bv.uksouth-01.azurewebsites.net/api/fooditem/foodgroups')
            .then((results) => {
                return results.json();
            });
    }
    
    async getByGroup(foodGroup: string) : Promise<FoodItem[]> {
        return await fetch('https://meal-designer-api-fshcgpckhyfpf9bv.uksouth-01.azurewebsites.net/api/fooditem/foodgroup/'+foodGroup)
            .then((results) => {
                return results.json();
            });
    }
    
}