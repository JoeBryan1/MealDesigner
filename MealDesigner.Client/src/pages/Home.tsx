import { Component } from 'react';

import {Link} from "react-router-dom";

import {Button} from "@/components/ui/button";

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <h1 className={"text-3xl font-bold pb-3"}>Welcome to Meal Designer AI – Your Personal Culinary
                    Innovator!</h1>
                <ul className="list-disc pl-10 pb-3">
                    <li className={"py-1"}>
                        Discover the joy of creating unique recipes with ease.
                    </li>
                    <li className={"py-1"}>
                        Simply choose your favorite ingredients, and our intelligent AI will whip up a delicious, custom
                        recipe just for you.
                    </li>
                    <li className={"py-1"}>

                        Need a visual taste? We’ll generate a stunning image of your dish to inspire your inner chef.
                    </li>
                    <li className={"py-1"}>
                        Whether you're working with a few pantry staples or experimenting with exotic flavors, AI Recipe
                        Creator makes cooking fun, creative, and hassle-free.
                        Let’s turn your ingredients into magic today!
                    </li>
                </ul>
                
                
                <Link to="/create">
                    <Button>Get Started</Button>
                </Link>
                
                
            </div>
    );
    }
    }