import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { store } from './store';
import { loadUserProfile } from './store/thunks/authThunks';
import Home from "./pages/home";
import ProductPage from "./pages/product/product-display";
import Categories from "./pages/categories";
import Add from "./pages/add";
import AllCategoryProducts from "./pages/product/productspage";
import "./App.css";

// App component with Redux integration
const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load user profile from token on app startup
    dispatch(loadUserProfile());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:productId" element={<ProductPage />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/add" element={<Add />} />
      <Route path="/category/:category" element={<AllCategoryProducts />} />
    </Routes>
  );
};

// Main App component that provides the Redux store
function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;