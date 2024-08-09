import "../../styles/Navbar.css"
import Logo from "../../assets/Logo.jpg"
import { useEffect, useState } from "react";
import FirebaseInit from "../../firebase/FirebaseInit";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

function Navbar() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isSticky, setIsSticky] = useState<boolean>(false);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const checkLoggedin = async () => {
            window.onload = async () => {
                await FirebaseInit.auth.onAuthStateChanged((user: any) => {
                    setLoggedIn(!!user);
                });
            };
        };

        checkLoggedin();

        // Cleanup function to remove the onload listener
        return () => {
            window.onload = null;
        };
    }, []);

    const menu = [
        {
            index: 1,
            href: "/",
            name: "Home",
            ids: "active"
        },
        {
            index: 2,
            href: "/problem",
            name: "Problems"
        },
        {
            index: 3,
            href: "/about",
            name: "About us"
        }
    ];

    return (
        <div className={`navbar max-h-[130px] max-w-screen flex sm:pb-4 bg-[#112226] ${isSticky ? 'stick-nav' : ''}`}>
            <div className="logo-box flex-1">
                <div className='w-full h-full'>
                    <img src={Logo} alt="InviewInterior Logo" onClick={() => document.location.href = "/"} />
                </div>
            </div>

            <div className="menu-btn flex-1 hidden sm:flex justify-end items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>

            <div className="nav-links sm:hidden flex-auto flex justify-center">
                {menu.map((item) => (
                    <NavLinks key={item.index} href={item.href} name={item.name} />
                ))}
            </div>

            <div className="auth-btn sm:hidden flex-1 flex justify-end place-items-center">
                {loggedIn ? <Link to="/dashboard"><span>Dashboard</span></Link> : <Link to="/authentication"><span>Sign Up</span></Link>}
            </div>
        </div>
    )
}

export default Navbar