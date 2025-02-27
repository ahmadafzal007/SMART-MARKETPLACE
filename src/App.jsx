import Home from "./pages/home";
import ProductPage from "./pages/product/product-display";
import Categories from "./pages/categories";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Add from "./pages/add";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/add" element={<Add />} />

      </Routes>
    </Router>
  );
}

export default App;
