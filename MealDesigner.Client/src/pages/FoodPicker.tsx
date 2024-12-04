import { SyntheticEvent } from 'react';

import { useState, useEffect } from 'react';

import { ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

type FoodItem = {
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
    
    useEffect(() => {
        fetch('https://localhost:7043/api/fooditem/foodgroups')
            .then((results) => {
                return results.json();
            })
            .then(data => {
                setFoodItemGroups(data);
            })
    }, [])
    
    const getFoodItemsFromGroup = (foodGroup: string) =>
    {
        setSelectedFoodGroup(foodGroup);
        
        fetch('https://localhost:7043/api/fooditem/foodgroup/'+foodGroup)
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
        
        fetch('https://localhost:7043/api/fooditem/'+id)
            .then((results) => {
            return results.json();
            })
            .then(data => {
                if (!selectedFoods.includes(data)) {
                    setSelectedFoods(selectedFoods => [...selectedFoods, data]);
                }
            })
    }
    
    const replaceImage = (error: SyntheticEvent<HTMLImageElement, Event>) => {
        error.currentTarget.src = "../../public/DefaultImage.png";
    }
    
        
      return (
          <main>
              <Select onValueChange={(foodGroup) => getFoodItemsFromGroup(foodGroup)}>
                  <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a food group" />
                  </SelectTrigger>
                  <SelectContent>
                      {foodItemGroups.map((group, index) => (
                          <SelectItem value={group} key={index}>
                              {group}
                          </SelectItem>
                      ))}
                  </SelectContent>
              </Select>
    
              { selectedFoodGroup != "" &&
              
              <Select onValueChange={(value) => selectedFoodItemId=Number(value)}>
                  <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a food item"/>
                  </SelectTrigger>
                  <SelectContent>
                      {foodNames.map((foodItem) => 
                          <SelectItem value={foodItem.foodItemId.toString()} key={foodItem.foodItemId}>
                              {foodItem.name}
                          </SelectItem>
                      )}
                  </SelectContent>
              </Select>
    
              }
              
              <Button onClick={() => addSelectedFood(selectedFoodItemId)}>Add to Selection</Button>
              <div className="flex space-x-5">
                  {selectedFoods.map((food) => 
                    <Card key={food.foodItemId} className={"w-[400px]"}>
                        <CardHeader>
                            <CardTitle>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {food.name}
                                </h3>
                                <img 
                                    src={"https://mdstorageac.blob.core.windows.net/fooditempics/"+food.foodItemId+".png"}
                                    onError={(error) => replaceImage(error)}
                                />
                            </CardTitle>
    
                            <Collapsible className="w-[350px] space-y-2">
                            <div className="flex justify-between space-x-4 px-4">
                                    <h4 className="text-base font-semibold">
                                        Description
                                    </h4>
                                    <CollapsibleTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            <ChevronsUpDown className="h-4 w-4"/>
                                            <span className="sr-only">Toggle</span>
                                        </Button>
                                    </CollapsibleTrigger>
                                </div>
                                <div className="flex justify-between space-x-4 px-4">
                                    <CollapsibleContent className="space-y-2">
                                        <CardDescription>{food.description}</CardDescription>
                                    </CollapsibleContent>
                                </div>
                            </Collapsible>
                        </CardHeader>
                    </Card>
                  )}
              </div>
          </main>
      )
}

export default FoodPicker;
