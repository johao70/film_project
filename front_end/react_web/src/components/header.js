/* eslint-disable jsx-a11y/anchor-is-valid */
import React from'react';
import { Link } from "react-router-dom";

const Header = () => (
        <div className="flex-grow flex mr-2 ml-64">
            <div className="flex-grow flex">
                {/* <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">
                    Ayuda
                </a> */}
            </div>
            <div>
                <Link to="/">
                    <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline">
                      Salir
                    </button>
                </Link>
            </div>            
        </div>
)

export default Header;