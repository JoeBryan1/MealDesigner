import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import {SiteHeader} from "@/components/site-header.tsx";
import {SiteFooter} from "@/components/site-footer.tsx";


export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <div className="border-border/40 dark:border-border">
                <div className="mx-auto w-full border-border/40 dark:border-border min-[1800px]:max-w-[1536px] min-[1800px]:border-x">
                    <SiteHeader/>
                    <Routes>
                        {AppRoutes.map((route, index) => {
                            const {element, ...rest} = route;
                            return <Route key={index} {...rest} element={element}/>;
                        })}
                    </Routes>
                    <SiteFooter/>
                </div>
            </div>
        );
    }
}