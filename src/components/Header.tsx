import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    const closeNavbar = () => {
        setIsNavbarOpen(false);
    };

    return (
        <>
            <header className="bg-white dark:bg-gray-900 fixed top-0 left-0 w-full z-40 shadow-lg">
                <div className="container mx-auto flex items-center justify-between px-4 py-5">
                    {/* Logo */}
                    <div className="w-60 max-w-full">
                        <Link to="/" className="block text-gray-900 dark:text-gray-100">
                            MyPorto
                        </Link>
                    </div>

                    {/* Hamburger Menu Button */}
                    {!isNavbarOpen && (
                        <button
                            id="navbarToggler"
                            className="block lg:hidden px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ring-primary"
                            onClick={toggleNavbar}
                        >
                            <span className="block h-0.5 w-6 bg-gray-900 dark:bg-white my-1"></span>
                            <span className="block h-0.5 w-6 bg-gray-900 dark:bg-white my-1"></span>
                            <span className="block h-0.5 w-6 bg-gray-900 dark:bg-white my-1"></span>
                        </button>
                    )}

                    {/* Navbar Links for Large Screens */}
                    <nav className="hidden lg:flex lg:items-center lg:space-x-8 lg:ml-auto lg:px-0 lg:py-0">
                        <Link
                            to="/"
                            className="text-base font-medium text-gray-900 dark:text-gray-100 hover:text-primary transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/projects"
                            className="text-base font-medium text-gray-900 dark:text-gray-100 hover:text-primary transition-colors"
                        >
                            Projects
                        </Link>
                        <Link
                            to="/about"
                            className="text-base font-medium text-gray-900 dark:text-gray-100 hover:text-primary transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            to="/contact"
                            className="text-base font-medium text-gray-900 dark:text-gray-100 hover:text-primary transition-colors"
                        >
                            Contact
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Sidebar Navbar for Mobile */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ease-in-out ${isNavbarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={closeNavbar} // Close when clicking outside the sidebar
            ></div>
            <div
                className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 z-40 w-64 shadow-lg transform transition-transform duration-300 ease-in-out ${isNavbarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <nav className="flex flex-col p-4 space-y-4 mt-20">
                    <Link
                        to="/"
                        className="text-base font-medium text-gray-900 dark:text-gray-100 hover:text-primary transition-colors"
                        onClick={closeNavbar} // Close navbar when a link is clicked
                    >
                        Home
                    </Link>
                    <Link
                        to="/projects"
                        className="text-base font-medium text-gray-900 dark:text-gray-100 hover:text-primary transition-colors"
                        onClick={closeNavbar}
                    >
                        Projects
                    </Link>
                    <Link
                        to="/about"
                        className="text-base font-medium text-gray-900 dark:text-gray-100 hover:text-primary transition-colors"
                        onClick={closeNavbar}
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        className="text-base font-medium text-gray-900 dark:text-gray-100 hover:text-primary transition-colors"
                        onClick={closeNavbar}
                    >
                        Contact
                    </Link>
                </nav>
            </div>
        </>
    );
};

export default Header;
