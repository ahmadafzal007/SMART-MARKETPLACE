import React from 'react';
import AddForm from '../components/post/ad-form/add-form';
import { useLocation } from "react-router-dom"


// Wrapper component that extracts state from react-router
const AddFormWrapper = () => {
    const location = useLocation()
    const { category, subcategory } = location.state || {
      category: "Electronics",
      subcategory: "Smartphones",
    }
    return <AddForm category={category} subcategory={subcategory} />
  }
  
export default AddFormWrapper;