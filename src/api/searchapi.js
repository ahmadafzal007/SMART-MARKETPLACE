import { API_BASE_URL } from './index';

// API function to communicate with the backend search endpoint
export const searchProducts = async (query, page = 1, limit = 20) => {
  try {
    if (!query || query.trim() === '') {
      return { products: [], pagination: { totalItems: 0 } };
    }

    // Parse the query to extract state information if present
    const stateMatch = query.match(/in\s+(South\s+Australia|New\s+South\s+Wales|Western\s+Australia|Northern\s+Territory|Australian\s+Capital\s+Territory|Queensland|Victoria|Tasmania)(?:\s*$|[,\s])/i);
    
    // Extract the state if found
    const stateFromQuery = stateMatch ? stateMatch[1] : null;
    
    // Check if we need to modify the query
    let modifiedQuery = query;
    
    // If state is found at the end of the query, remove it
    if (stateMatch && (stateMatch.index + stateMatch[0].length >= query.length - 3)) {
      modifiedQuery = query.replace(stateMatch[0], '').trim();
    }

    const params = new URLSearchParams({
      q: modifiedQuery, // Use the potentially modified query
      page: page.toString(),
      limit: limit.toString()
    });

    // Add state parameter if found in the query
    if (stateFromQuery) {
      params.append('state', stateFromQuery);
    }
  
    const response = await fetch(`${API_BASE_URL}/search/advanced?${params.toString()}`);
    
    if (response.status === 404) {
      // No results found
      return { products: [], pagination: { totalItems: 0 }, noResults: true };
    }
    
    if (!response.ok) {
      throw new Error('Search request failed');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};
  
// Function to get search suggestions based on user input
export const getSearchSuggestions = async (query) => {
  if (!query || query.length < 2) return [];
  
  try {
    const params = new URLSearchParams({
      q: query
    });
    
    const response = await fetch(`${API_BASE_URL}/search/suggestions?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error('Failed to get search suggestions');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting search suggestions:', error);
    return [];
  }
};
  