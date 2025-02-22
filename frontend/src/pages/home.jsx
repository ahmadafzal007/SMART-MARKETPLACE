import React from 'react';
import Navbar from '../components/home/navbar';
import SmartMartAdd from '../components/home/addsense';
const Home = () => {
    return (
        <div>
            <Navbar/>
            <div className='mt-15'>
            <SmartMartAdd/>
            </div>
        </div>
    );
};

export default Home;