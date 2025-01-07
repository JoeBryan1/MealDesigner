import Markdown from 'react-markdown';
import {Button} from "../components/ui/button";
import {PromptResponse, Regenerate, TriggerFoodGenDTO} from "@/services/PromptService.ts";

export type RecipePageProps = {
    promptResponse: PromptResponse;
    generateMeal: (request: TriggerFoodGenDTO) => void;
}

const Recipe = (props: RecipePageProps) => {
    let recipeName = props.promptResponse.recipeProperties.recipeName;
    let recipe = props.promptResponse.recipeProperties.recipe;
    let imgUrl = props.promptResponse.imgUrl;

    const regenerateMealRequest = (regenerateRecipe: boolean) => {
        let regenerate: Regenerate = {
            regenerateRecipe: regenerateRecipe,
            recipe: recipeName
        }
        
        // Need to show an error if this isn't found but that's something to do later!!!
        let request: TriggerFoodGenDTO = JSON.parse(localStorage.getItem("lastRequest")!);
        
        request.regenerate = regenerate;
        props.generateMeal(request);
    }
    
    return (
        <div>
            <h1>{recipeName}</h1>
            <Markdown>{recipe}</Markdown>
            <img src={imgUrl}/>
            <Button onClick={() => regenerateMealRequest(true)}>Regenerate Recipe</Button>
            <Button onClick={() => regenerateMealRequest(false)}>Regenerate New Recipe</Button>
        </div>
    )
}

export default Recipe;