// frontend/src/api/productService.js
export const createProductAd = async (productData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('http://localhost:5000/api/products', {
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
  

  // frontend/src/api/randomProductsApi.js
export const fetchRandomProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products/random');
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
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
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
  