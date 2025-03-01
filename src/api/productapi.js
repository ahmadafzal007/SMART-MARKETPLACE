// Global API configuration
import axios from "axios"
export const API_ENDPOINT = 'http://localhost:5002/api';

// frontend/src/api/productService.js
export const createProductAd = async (productData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_ENDPOINT}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(productData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create product ad');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating product ad:', error);
      throw error;
    }
  };
  
// Fetch products by category with pagination
export const fetchProductsByCategory = async (category, page = 1, filters = null, sort = null) => {
  try {
    const params = { page };

    // Add filters if provided
    if (filters) {
      if (filters.priceRange) {
        params.minPrice = filters.priceRange[0];
        params.maxPrice = filters.priceRange[1];
      }
      if (filters.condition?.length > 0) {
        params.condition = filters.condition;
      }
      if (filters.listingType?.length > 0) {
        params.listingType = filters.listingType;
      }
      if (filters.location) {
        params.location = filters.location;
      }
    }

    // Add sort if provided
    if (sort) {
      params.sort = sort;
    }

    const response = await axios.get(`${API_ENDPOINT}/products/category/${category}`, { params });
    return response.data; // Now returns { products: [], pagination: {} } directly
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw error;
  }
};

// frontend/src/api/randomProductsApi.js
export const fetchRandomProducts = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/products/random`);
      if (!response.ok) {
        throw new Error('Failed to fetch random products');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching random products:', error);
      throw error;
    }
  };
  
// frontend/src/api/productDetailsApi.js
export const fetchProductById = async (id) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching product details:", error);
      throw error;
    }
  };
