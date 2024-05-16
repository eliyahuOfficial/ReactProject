import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.scss";
import { FaHome, FaUser } from 'react-icons/fa';
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { useAuth } from "../../hooks/useAuth";
import { FaXmark, FaBars } from "react-icons/fa6";
import { useState } from "react";


const NavBar = () => {

    const { isLoggedIn, isBusiness, logout } = useAuth();

    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            setTimeout(() => {
                setIsMenuOpen(false);
            }, 2000);
        }

    }



    return (
        <nav className="site-navbar text-xl  leading-6 tracking-tight text-gray-900  dark:text-gray-100 mx-6">
            <div className="nav-left flex justify-center items-center ">
                Home
                <NavLink to="/" className='brand'>
                    <FaHome className="icon-home-image" />
                </NavLink>

            </div>

            <div className="nav-right">
                <div className="hidden md:flex md:flex-row gap-4">
                    {isLoggedIn && <NavLink to="/cards" className="nav-link">Cards</NavLink>}
                    {isLoggedIn && <NavLink to="/favoritecards" className="nav-link">Fav Cards</NavLink>}
                    {isLoggedIn && isBusiness && <NavLink to="/mycards" className="nav-link">My Cards</NavLink>}
                    {isLoggedIn && isBusiness && <NavLink to="/createcard" className="nav-link">Create Card</NavLink>}
                    {isLoggedIn && isBusiness && <NavLink to="/spotify" className="nav-link">Spotify-Api</NavLink>}
                    {!isLoggedIn && <NavLink to="/register" className="nav-link">Register</NavLink>}
                    {!isLoggedIn && <NavLink to="/login" className="nav-link">Login</NavLink>}
                    {isLoggedIn && <button onClick={() => {
                        logout();
                        navigate("/login")
                    }} className="nav-link">Logout</button>}
                    {isLoggedIn && <NavLink to={'/profile'} className="nav-link"><FaUser /></NavLink>}

                </div>


                <DarkModeToggle />

                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none focus:text-gray-300">
                        {isMenuOpen ? (<FaXmark className="w-6 h-6 text-black dark:text-white" />) : (<FaBars className="  w-6 h-6 text-black dark:text-white" />)}
                    </button>
                </div>



            </div>

            {
                isMenuOpen && (
                    <div className="space-y-4 px-4 pt-3 pb-5 mx-2 rounded-md drop-shadow-md bg-stone-200 dark:bg-slate-500 fixed top-16 right-0 left-0 flex flex-col z-50 favorite-cards-style">
                        {isLoggedIn && <NavLink to="/cards" className="nav-link">Cards</NavLink>}
                        {isLoggedIn && <NavLink to="/favoritecards" className="nav-link">Fav Cards</NavLink>}
                        {isLoggedIn && isBusiness && (
                            <>
                                <NavLink to="/mycards" className="nav-link">My Cards</NavLink>
                                <NavLink to="/createcard" className="nav-link">Create Card</NavLink>
                                <NavLink to="/spotify" className="nav-link">Spotify-Api</NavLink>
                                <NavLink to="/profile" className="nav-link">Profile</NavLink>
                            </>
                        )}
                        {!isLoggedIn && <NavLink to="/register" className="nav-link">Register</NavLink>}
                        {!isLoggedIn && <NavLink to="/login" className="nav-link">Login</NavLink>}
                        {isLoggedIn && <button onClick={() => {
                            logout();
                            navigate("/login")
                        }} className="nav-link">Logout</button>}
                    </div>
                )
            }

        </nav>
    );
};

export default NavBar;