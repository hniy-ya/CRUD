import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage";

import { Toaster } from "react-hot-toast";

function App() {
    return (
        <div className="min-h-screen bg-base-200 transition-colors duration-300">
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                {/* <Route path='/POS' element={<PosPage/>}/> */}
            </Routes>
            <Toaster />
        </div>
    );
}

export default App;
