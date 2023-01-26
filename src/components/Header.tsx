import React from 'react';
import '../App.css';
import wolt_logo from '../images/wolt.svg';

// header component that uses wolt image from src/images/wolt.svg

const Header: React.FC = () => {
    return (
        <nav className="flex justify-center sm:justify-start items-center border-b dark:border-gray-800">
            <svg className='dark:fill-[#ffffff] logo-animation h-14 md:ml-5 md:h-28 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 652 652">
                <path d="M373 350c-11-7-15-22-12-44l1-3-7-1c-25 0-39 42-39 81 0 20 8 30 20 30 16 0 31-28 37-63m205-39s-12 57-12 78c0 15 7 20 15 20 11 0 21-7 30-23 2-4 10-2 14 3 2 2 0 6-3 11-14 23-34 36-54 36-22 0-36-10-39-37-13 20-33 37-57 37-28 0-40-16-40-44 0-19 6-50 6-50-8 7-17 13-29 15-10 51-40 79-79 79-33 0-56-18-56-59 0-52 33-98 85-98 29 0 50 16 52 52 12-2 24-10 33-22l15-77c1-4 2-11 9-13s17-2 29 0c6 1 7 7 7 12 0 14-6 44-17 71-8 30-14 60-14 84 0 17 6 23 15 23 16 0 34-22 43-51l6-45h-15c-5 1-10-1-10-6l2-16c1-4 3-6 8-6h21l6-36c1-4 5-6 9-7l23 1c6 2 8 6 7 11l-6 32 39 2c6 1 9 4 8 10-1 9-8 12-18 12l-33 1m-299-74c0 65-35 198-88 198-40 0-49-45-51-102-20 44-31 67-44 90-6 11-14 13-22 13-7 0-26-3-31-5-4-3-6-6-9-16-9-48-3-110 7-160 1-9 4-13 10-17s20-4 29-4c5 0 8 3 7 9-9 44-19 103-11 164 0 0 31-61 63-137 6-15 7-20 13-22h22c6 0 8 2 8 9l-2 66c0 39 4 83 20 83 20 0 38-95 31-176 0-5 2-11 8-12h16c16-1 24 2 24 19"/>
            </svg>
        </nav>
    );
};
export default Header;