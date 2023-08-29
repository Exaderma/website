// navbar dépliable pour un site style medical sans nouvelles dependences

import { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../assets/logo.png";

import Hamburger from "../assets/hamburger.svg";
import setting from "../assets/setting.png";
import profil from "../assets/profil.png";
import home from "../assets/home.png";
import message from "../assets/message.png";
import galerie from "../assets/galerie.svg";
import "./Navbar.css"

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    
    const handleToggle = () => {
        setNavbarOpen((prev) => !prev);
    };
    
    const closeMenu = () => {
        setNavbarOpen(false);
    };

    const navbarItems = document.querySelectorAll('.nav-item');

    navbarItems.forEach((item) => {
        item.addEventListener('click', () => {
            navbarItems.forEach((item) => {
                item.classList.remove('active');
            });
            item.classList.add('active');
        });
    });
    
    return (
        <nav className="navbar" style={{ background: "#002762B2", width: "18%", height: "100vh", border: "none" }}>
            <div className="hamburger" onClick={handleToggle}>
                <img src={Hamburger} alt="hamburger" style={{ width: "10%", height: "10"}} />
            </div>
            <div className="nav-header">
                <Link to="/pro/home" className="nav-logo">
                    <img src={Logo} alt="logo" style={{ width: "65%", height: "17%", paddingLeft: "17%" }} />
                </Link>
                <div className="nav-links">
                    <ul className="navbar" style={{ listStyle: "none", paddingLeft: "7%", flexDirection: "column", display: "flex" }}>
                    <li className="nav-item active" style={{ marginRight: "10%", paddingTop: "5%", paddingBottom: "5%", paddingLeft: "10%"}}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <img src={home} alt="home" style={{ width: "10%", height: "10%", paddingRight: "10%"}} />
                                <Link to="/pro/home" style={{ color: "#FFFFFF", fontSize: "1.5rem", textDecoration: "none"}}>
                                    Accueil
                                </Link>
                            </div>
                        </li>
                        
                        <li className="nav-item" style={{ marginRight: "10%", paddingTop: "5%", paddingBottom: "5%", paddingLeft: "10%"}}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <img src={message} alt="message" style={{ width: "10%", height: "10%", paddingRight: "10%"}} />
                                <Link to="/pro/home" style={{ color: "#FFFFFF", fontSize: "1.5rem", textDecoration: "none"}}>
                                    Messages
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item" style={{ marginRight: "10%", paddingTop: "5%", paddingBottom: "5%", paddingLeft: "10%"}}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <img src={profil} alt="profil" style={{ width: "10%", height: "10%", paddingRight: "10%" }} />
                                <Link to="/pro/home" style={{ color: "#FFFFFF", fontSize: "1.5rem", textDecoration: "none"}}>
                                    Mon Profil
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item" style={{ marginRight: "10%", paddingTop: "5%", paddingBottom: "5%", paddingLeft: "10%"}}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <img src={galerie} alt="galerie" style={{ width: "10%", height: "10%", paddingRight: "10%" }} />
                                <Link to="/pro/home" style={{ color: "#FFFFFF", fontSize: "1.5rem", textDecoration: "none"}}>
                                    Galerie
                                </Link>
                            </div>
                        </li>
                        <div style={{ width: "80%", height: "3px", background: "#FFFFFF", marginBottom: "10%", marginTop: "32vh", marginLeft: "5%" }}></div>
                        <li className="nav-item" style={{ marginRight: "10%", paddingTop: "5%", paddingBottom: "5%", paddingLeft: "10%"}}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <img src={setting} alt="setting" style={{ width: "10%", height: "10%", paddingRight: "10%" }} />
                                <Link to="/pro/home" style={{ color: "#FFFFFF", fontSize: "1.5rem", textDecoration: "none"}}>
                                    Paramètres
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;