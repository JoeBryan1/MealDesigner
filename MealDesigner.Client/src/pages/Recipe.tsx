import Markdown from 'react-markdown';
import {Button} from "../components/ui/button";
import {PromptResponse, TriggerFoodGenDTO} from "@/services/PromptService.ts";

export type RecipePageProps = {
    promptResponse: PromptResponse;
    generateMeal: (request: TriggerFoodGenDTO) => void;
}

const Recipe = (props: RecipePageProps) => {
    let recipeName = props.promptResponse.recipeProperties.recipeName;
    let recipe = props.promptResponse.recipeProperties.recipe;
    let imgUrl = props.promptResponse.imgUrl;
    
    return (
        <main>
            <div>
                <h1>{recipeName}</h1>
                <Markdown>{recipe}</Markdown>
                <img src={imgUrl}/>
                <Button>Regenerate Recipe</Button>
                <Button>Regenerate New Recipe</Button>
            </div>
        </main>
    )
}

export default Recipe;