import { SyntheticEvent } from 'react';
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.tsx";
import {Button} from "@/components/ui/button.tsx";
import { ChevronsUpDown } from "lucide-react"
import {FoodItem} from "@/pages/FoodPicker.tsx";

export type FoodItemCardProps = {
    selectedFoodsArray: FoodItem[];
}

const FoodItemCard = (props: FoodItemCardProps) => {
    const replaceImage = (error: SyntheticEvent<HTMLImageElement, Event>) => {
        error.currentTarget.src = "src/assets/DefaultImage.png";
    }
    
    return (
        <div className="flex space-x-5">
            {props.selectedFoodsArray.map((food) =>
                <Card key={food.foodItemId} className={"w-[400px]"}>
                    <CardHeader>
                        <CardTitle>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {food.name}
                            </h3>
                            <img
                                src={"https://mdstorageac.blob.core.windows.net/fooditempics/" + food.foodItemId + ".png"}
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
    )
}

export default FoodItemCard;