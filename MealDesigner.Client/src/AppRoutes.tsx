import { Home }  from "@/pages/Home";
import FoodPicker from "@/pages/FoodPicker";
import About from "@/pages/About";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/create',
        element: <FoodPicker />
    },
    {
        path: 'about',
        element: <About />
    }
];

export default AppRoutes;