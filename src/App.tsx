import { RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import "~/styles/App.scss";
import router from "~/core/routes/routes";

function App() {
    return (
        <AnimatePresence mode="wait">
            <RouterProvider router={router} />
        </AnimatePresence>
    );
}

export default App;
