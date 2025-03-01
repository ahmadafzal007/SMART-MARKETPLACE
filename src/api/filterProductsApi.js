// src/api/filterProductsApi.js
import { FILTERS_BASE_URL } from './index';

export const filterProducts = async (filters = {}) => {
    // Create a new URLSearchParams object
    const params = new URLSearchParams();

    // Handle each filter parameter
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          params.append(key, value.join(','));
        }
      } else if (value !== undefined && value !== '') {
        params.append(key, value);
      }
    });

    try {
      const response = await fetch(`${FILTERS_BASE_URL}/filter?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch filtered products");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in filterProducts API:", error);
      throw error;
    }
  };
  