import Navbar from "../components/NavbarPro";
import { useState } from "react";
import "../index.css";

function Settings() {

    const [activeItem, setActiveItem] = useState("Apparence"); // État local pour suivre l'élément actif

    const handleItemClick = (itemName:any) => {
        setActiveItem(itemName);
    };

    return (
        <div style={{display: "flex", flexDirection: "row", width: "100%", height: "100%", padding: "0", margin: "0"}}>
        <Navbar />
            <div style={{display: "flex", flexDirection: "column"}}>
                <h1 style = {{color: "#002762", fontSize: "3rem", display: "flex", justifyContent: "center"}}>
                    Page de paramètres
                </h1>
                <div style={{display: "flex", flexDirection: "row", width: "100%", height: "100%", padding: "0", margin: "0"}}>
                    <div style={{display: "flex", flexDirection: "column", width: "30vw", height: "100%"}}>
                        <ul className="settings" style={{ listStyle: "none", paddingLeft: "7%", flexDirection: "column", display: "flex" }}>
                            <li className={`set-item ${activeItem === "Apparence" ? "active" : ""}`} style={{ marginRight: "10%", paddingTop: "5%", paddingBottom: "5%", paddingLeft: "10%" }}>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <a href="#" style={{ color: "#000000", fontSize: "1.5rem", textDecoration: "none", fontFamily: "Roboto", fontWeight: "700", fontStyle: "normal", lineHeight: "normal"}} onClick={() => handleItemClick("Apparence")}>
                                        Apparence
                                    </a>
                                </div>
                            </li>
                            <li className={`set-item ${activeItem === "Sécurité et vie privé" ? "active" : ""}`} style={{ marginRight: "10%", paddingTop: "5%", paddingBottom: "5%", paddingLeft: "10%" }}>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <a href="#" style={{ color: "#000000", fontSize: "1.5rem", textDecoration: "none", fontFamily: "Roboto", fontWeight: "700", fontStyle: "normal", lineHeight: "normal"}} onClick={() => handleItemClick("Sécurité et vie privé")}>
                                        Sécurité et vie privé
                                    </a>
                                </div>
                            </li>
                            <li className={`set-item ${activeItem === "Aide et support" ? "active" : ""}`} style={{ marginRight: "10%", paddingTop: "5%", paddingBottom: "5%", paddingLeft: "10%"}}>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <a href="#" style={{ color: "#000000", fontSize: "1.5rem", textDecoration: "none", fontFamily: "Roboto", fontWeight: "700", fontStyle: "normal", lineHeight: "normal"}} onClick={() => handleItemClick("Aide et support")}>
                                    Aide et support
                                    </a>
                                </div>
                            </li>
                            <li className={`set-item ${activeItem === "À propos" ? "active" : ""}`} style={{ marginRight: "10%", paddingTop: "5%", paddingBottom: "5%", paddingLeft: "10%"}}>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <a href="#" style={{ color: "#000000", fontSize: "1.5rem", textDecoration: "none", fontFamily: "Roboto", fontWeight: "700", fontStyle: "normal", lineHeight: "normal"}} onClick={() => handleItemClick("À propos")}>
                                    À propos
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
            </div>
        </div>
    </div>
  );
}


export default Settings