import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div >

            <div className="py-3">
                <Navbar></Navbar>
            </div>
            <div className="w-11/12 mx-auto">
                <Outlet></Outlet>
            </div>

            <div className="py-3">
                <Footer></Footer>
            </div>


        </div>
    );
};

export default RootLayout;