import React from 'react';
import '../App.css';
import wolt_logo from '../images/wolt.svg';

// header component that uses wolt image from src/images/wolt.svg

const Header: React.FC = () => {
    return (
        <header className="App-header">
            <img src={wolt_logo} alt="wolt logo" id='wolt-logo'/>
        </header>
    );
};
export default Header;