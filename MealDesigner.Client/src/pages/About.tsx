import { Link } from "@react-email/link";

export const About = () => {
    return (
        <div>
            <h1 className={"text-3xl font-bold pb-3"}>About</h1>
            <div className={"flex flex-col gap-4"}>
                <p>
                    Meal Designer AI is my personal project to show my proficiency in popular a tech-stack.
                    The website is made using React as a front-end and .Net Core as a back-end.
                    The front-end uses Vite + shadcn + TailwindCSS.
                    The back-end uses .Net Core 8 + Entity Framework + CosmosDB.
                    To generate the content I used OpenAI's API to generate text and image prompts.
                    The website is hosted on Azure, using CosmosDB to store all the food item data,
                    a Static Web App to host the font-end, and a Web App to host the backend.
                    Credits go to <a href={"https://foodb.ca/"}>foodb.ca</a> for providing the food item data.
                </p>
                
                <p>If you want access to the source code email me at <Link href={"mailto:joseph.bryan203@gmail.com"}>joseph.bryan203@gmail.com</Link>.</p>
            </div>
        </div>
    )
}

export default About;