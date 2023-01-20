import React from 'react';
import '../App.css';
import wolt_logo from '../images/wolt.svg';

// header component that uses wolt image from src/images/wolt.svg

const Header: React.FC = () => {
    return (
        // <div className="flex-grid justify-center items-center">
        <div className="bg-white flex justify-between items-center p-4 border-b">
            <img className='animate-waving-hand object-left' src={wolt_logo} alt="wolt logo" id='wolt-logo'/>
        </div>
    );
};
export default Header;