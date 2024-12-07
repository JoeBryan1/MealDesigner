import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {FoodItem} from "@/pages/FoodPicker.tsx";

export type SelectMapProps = {
    array: any[];
    onValueChange(value: string): void;
}

export type SelectMapFoodItemProps = {
    array: FoodItem[];
    onValueChange(value: string): void;
}

export const SelectMap = (props: SelectMapProps) => {
    return (
        <Select onValueChange={(value) => props.onValueChange(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a food group"/>
            </SelectTrigger>
            <SelectContent>
                {props.array.map((item, index) => (
                    <SelectItem value={item} key={index}>
                        {item}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export const SelectMapFoodItem = (props: SelectMapFoodItemProps) => {
    return (
        <Select onValueChange={(value) => props.onValueChange(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a food group"/>
            </SelectTrigger>
            <SelectContent>
                {props.array.map((item, index) => (
                    <SelectItem value={item.foodItemId.toString()} key={index}>
                        {item.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}