import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import SideBar from './SideBar.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';


function Header() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            {/* Mobile Sidebar */}
            <SideBar
                isOpen={sidebarOpen} 
                onClose={() => setSidebarOpen(false)} 
            />

            {/* Header */}
            <header className="w-full text-white py-7 px-4 sm:px-12 flex justify-between items-center ">
                {/* Logo */}
                <div className="flex items-center z-40">
                    <h1 className="text-blue-400 text-3xl sm:text-4xl font-extrabold tracking-tight">
                        Study<span className="text-blue-300">Sync</span>
                    </h1>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-8">
                    <a className="text-lg font-medium hover:text-blue-300 transition-colors duration-300 cursor-pointer" href="#home">
                        Home
                    </a>
                    <a className="text-lg font-medium hover:text-blue-300 transition-colors duration-300 cursor-pointer" href="#description">
                        How It Works
                    </a>
                    <a className="text-lg font-medium hover:text-blue-300 transition-colors duration-300 cursor-pointer" href="#contact">
                        Contact Us
                    </a>
                    
                    <div className="flex space-x-4 ml-8">
                        <Link
                            to="/login"
                            className="border border-blue-400 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-400/10 transition-colors duration-300"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 shadow-md"
                        >
                            Get Started
                        </Link>
                    </div>
                </nav>

                {/* Mobile Hamburger Button */}
                <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden z-50 p-2 rounded-md bg-stone-700/10 text-white shadow-md"
                    aria-label={sidebarOpen ? "Close menu" : "Open menu"}
                >
                    <FontAwesomeIcon 
                        icon={sidebarOpen ? faTimes : faBars} 
                        className="h-6 w-6 transition-transform duration-300"
                    />
                </button>
            </header>
        </>
    )
}

export default Header;