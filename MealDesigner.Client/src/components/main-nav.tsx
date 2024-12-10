import {Link, useLocation } from "react-router-dom";

import {Icons} from "@/components/icons";
import { cn } from "@/lib/utils"

export const MainNav = () => {
    const pathname = useLocation().pathname;
    return (
        <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-4 flex items-center gap-2 lg:mr-6">
                <Icons.logo className="h-6 w-6"/>
                <span className="hidden font-bold lg:inline-block">
                  {"Meal Designer"}
                </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm xl:gap-6">
                <Link
                    to="/create"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname === "/create" ? "text-foreground" : "text-foreground/80"
                    )}
                >
                    Create
                </Link>
                <Link
                    to="/about"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname === "/about" ? "text-foreground" : "text-foreground/80"
                    )}
                >
                    About
                </Link> 
            </nav>
        </div>
    )
}