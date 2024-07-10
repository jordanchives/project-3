import React from 'react';
import logo from '../assets/logo.svg';
import { FiMenu } from 'react-icons/fi';
import {ImDownload} from 'react-icons/im';

function NavBar () {
    return (

        <div className="flex items-center bg-[#171a21]">
            {/*Left*/}
            <div className="flex items-center justify-center lg:justify-start py-2 px-2 lg:p-6 lg:py-6 lg:px-8 w-full lg:w-auto">
                <div className="text-white absolute left-4 lg:hidden">
                    <FiMenu className="text-[30px]"/>
                </div>
                <div className ="flex-items-center">
                
                <a href="/">
                <img src={logo} className="" width="176" height="44" alt="Link to HomePage" />
                </a>
                </div>

                
            </div>
            {/*Middle*/}
            <div className="hidden lg:flex pl-10">
            <div className="">
                <ul className="text-[#c5c3c0] text-[12px] flex gap-5">
                    <li>
                      <p>SHOP</p>
                    </li>
                    <li>
                      <p>COMMUNITY</p>
                    </li>
                    <li>
                      <p>ABOUT</p>
                    </li>
                    <li>
                      <p>SUPPORT</p>
                    </li>
                </ul>
                </div>
            </div>
            {/* Right */}
            <div className="text-white absolute top-0 right-[2.5rem]">
                <div className="flex items-center bg-[#5c7e10] px-1.5 mt-1.5">
                <ImDownload className="text-white mr-1.5 text-[9px]"/>
                <p className="text-[10px]">Install Steam</p>
                </div>
            </div>
        </div>
    );
};
export default NavBar;

