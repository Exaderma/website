import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import Hamburger from "../assets/hamburger.svg";
import setting from "../assets/setting.png";
import profil from "../assets/profil.png";
import home from "../assets/home.png";
import message from "../assets/message.png";
import galerie from "../assets/galerie.svg";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [navbarOpen, setNavbarOpen] = useState(true);

  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setNavbarOpen(false);
  };

  return (
    <nav
      className={`navbar ${navbarOpen ? "" : "closed"}`}
      style={{ background: "#002762B2", height: "100vh", border: "none", width: navbarOpen ? "20%" : "10%" }}
    >
      <div
        className="hamburger"
        onClick={handleToggle}
        style={{ display: "flex", justifyContent: "flex-end", paddingRight: "auto", paddingTop: "auto" }}
      >
        <Link to="#" className="nav-logo" style={{ display: "flex", justifyContent: "flex-end", width: navbarOpen ? "10%" : "20%", height: "10" }}>
          <img src={Hamburger} alt="hamburger" />
        </Link>
      </div>
      {navbarOpen && (
        <div className="nav-header">
          <Link to="/pro/home" className="nav-logo">
            <img src={Logo} alt="logo" style={{ width: "65%", height: "17%", paddingLeft: "17%" }} />
          </Link>
          <div className="nav-links">
            <ul className="navbar" style={{ listStyle: "none", paddingLeft: "7%", flexDirection: "column", display: "flex" }}>
              <li className={`nav-item ${location.pathname === "/pro/home" ? "active" : ""}`} style={{ marginRight: "10%", paddingTop: "5%", paddingBottom: "5%", paddingLeft: "10%" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <img src={home} alt="home" style={{ width: "10%", height: "10%", paddingRight: "10%" }} />
                  <Link to="/pro/home" style={{ color: "#FFFFFF", fontSize: "1.5rem", textDecoration: "none" }}>
                    Accueil
                  </Link>
                </div>
              </li>
              <li className={`nav-item ${location.pathname === "/pro/message" ? "active" : ""}`} style={{ marginRight: "10%", paddingTop: "5%", paddingBottom: "5%", paddingLeft: "10%" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <img src={message} alt="message" style={{ width: "10%", height: "10%", paddingRight: "10%" }} />
                  <Link to="/pro/message" style={{ color: "#FFFFFF", fontSize: "1.5rem", textDecoration: "none" }}>
                    Messages
                  </Link>
                </div>
              </li>
              <li className={`nav-item ${location.pathname === "/pro/profil" ? "active" : ""}`} style={{ marginRight: "10%", paddingTop: "5%", paddingBottom: "5%", paddingLeft: "10%" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <img src={profil} alt="profil" style={{ width: "10%", height: "10%", paddingRight: "10%" }} />
                  <Link to="/pro/profil" style={{ color: "#FFFFFF", fontSize: "1.5rem", textDecoration: "none" }}>
                    Mon Profil
                  </Link>
                </div>
              </li>
              <li className={`nav-item ${location.pathname === "/pro/galerie" ? "active" : ""}`} style={{ marginRight: "10%", paddingTop: "5%", paddingBottom: "5%", paddingLeft: "10%" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <img src={galerie} alt="galerie" style={{ width: "10%", height: "10%", paddingRight: "10%" }} />
                  <Link to="/pro/galerie" style={{ color: "#FFFFFF", fontSize: "1.5rem", textDecoration: "none" }}>
                    Galerie
                  </Link>
                </div>
              </li>
              <div style={{ width: "80%", height: "3px", background: "#FFFFFF", marginBottom: "5%", marginTop: "70%", marginLeft: "5%" }}></div>
              <li className={`nav-item ${location.pathname === "/settings" ? "active" : ""}`} style={{ marginRight: "10%", paddingTop: "5%", paddingBottom: "5%", paddingLeft: "10%", marginBottom: "5%" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <img src={setting} alt="setting" style={{ width: "10%", height: "10%", paddingRight: "10%" }} />
                  <Link to="/settings" style={{ color: "#FFFFFF", fontSize: "1.5rem", textDecoration: "none" }}>
                    Paramètres
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;