import {FoodItem} from "../pages/FoodPicker";

export default class FoodItemService {

    async getById(id: Number): Promise<FoodItem> {
        return await fetch('http://localhost:5244/api/fooditem/'+id)
            .then((results) => {
                return results.json();
            })
    }
    
    async getAllGroups() : Promise<string[]> {
        return await fetch('http://localhost:5244/api/fooditem/foodgroups')
            .then((results) => {
                return results.json();
            });
    }
    
    async getByGroup(foodGroup: string) : Promise<FoodItem[]> {
        return await fetch('http://localhost:5244/api/fooditem/foodgroup/'+foodGroup)
            .then((results) => {
                return results.json();
            });
    }
    
}