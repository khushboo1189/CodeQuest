import "../styles/Navbar.css"
import Logo from "../assets/Logo.jpg"
import { useEffect, useState } from "react";
import FirebaseInit from "../firebase/FirebaseInit";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

function Navbar() {
    const [isSticky, setSticky] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const checkScrollTop = () => {
        setSticky(window.scrollY > 130);
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    }, []);

    useEffect(() => {
        const unsubscribe = FirebaseInit.auth.onAuthStateChanged((user: any) => {
            setLoggedIn(!!user);
        });
        return () => unsubscribe();
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
            href: "/problems",
            name: "Problems"
        },
        {
            index: 3,
            href: "/about",
            name: "About us"
        }
    ];

    return (
        <div className={`navbar ${isSticky ? 'stick-nav' : ''} w-full`}>
            <div className="flex w-full h-full">
                <div className="flex-none h-full sm:flex-1">
                    <a href='/' className="logo h-full flex justify-center items-center">
                        <img src={Logo} alt="Logo" />
                    </a>
                </div>
                <div className="nav-links flex-auto h-full flex justify-center items-end sm:hidden">
                    {menu.map((item) => (
                        <NavLinks key={item.index} href={item.href} name={item.name} />
                    ))}
                </div>
                <div className="auth-btn flex-none h-full flex justify-center items-center sm:hidden">
                    {loggedIn ? <Link to="/dashboard">Dashboard</Link> : <Link to="/authentication">Sign Up</Link>}
                </div>
            </div>
        </div>
    )
}

export default Navbar