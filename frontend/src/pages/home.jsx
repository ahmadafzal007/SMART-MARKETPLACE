import React from 'react';
import Navbar from '../components/home/navbar';
import SmartMartAdd from '../components/home/addsense';
import ProductsDisplay from '../components/home/products-display';
const Home = () => {
    return (
        <div>
            <Navbar/>
            <div className='flex justify-center'>
            <SmartMartAdd/>          
            </div>
            <ProductsDisplay/>

        </div>
    );
};

export default Home;