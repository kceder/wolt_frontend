import React from 'react';
import '../App.css';
import wolt_logo from '../images/wolt.svg';

// header component that uses wolt image from src/images/wolt.svg

const Header: React.FC = () => {
    return (
        // <div className="flex-grid justify-center items-center">
        <nav className="bg-white flex justify-center sm:justify-start items-center border-b">
            <img className='logo-animation' src={wolt_logo} alt="wolt logo" id='wolt-logo'/>
        </nav>
    );
};
export default Header;