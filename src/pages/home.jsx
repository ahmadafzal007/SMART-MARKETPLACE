import React from 'react';
import Navbar from '../components/home/navbar/navbar';
import SmartMartAdd from '../components/home/addsense';
import ProductsDisplay from '../components/home/categories-display';
import Footer from '../components/home/footer';

const Home = () => {
    return (
        <div>
            <Navbar/>
            <div className='flex justify-center'>
            <SmartMartAdd/>          
            </div>
            <ProductsDisplay/>
            <Footer/>


        </div>
    );
};

export default Home;