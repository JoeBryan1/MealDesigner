import { Home }  from "@/pages/Home";
import FoodPicker from "@/pages/FoodPicker.tsx";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/food-picker',
        element: <FoodPicker />
    }
];

export default AppRoutes;