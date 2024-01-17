import Navbar from "../components/NavbarPro";
import { useState, useEffect } from "react";
import "../index.css";
import "../langage";

import { useTranslation } from "react-i18next";

function Settings() {
    const { t, i18n } = useTranslation();

    const saveTheme = localStorage.getItem("theme") || "light";
    const [theme, setTheme] = useState(saveTheme);

    useEffect(() => {
        document.documentElement.className = theme;
        setActiveItem(localStorage.getItem("activeItem") || "Langue");
    }, [theme]);

    const toggleTheme = (theme: string) => {
        localStorage.setItem("theme", theme);
        setTheme(theme);
        window.location.reload();
    };

    const changeLanguage = (lng: string) => {
        localStorage.setItem("lang", lng);
        i18n.changeLanguage(lng);
    };

    const [activeItem, setActiveItem] = useState("Langue");

    const handleItemClick = (itemName:any) => {
        localStorage.setItem("activeItem", itemName);
        setActiveItem(itemName);
    };

    return (
            <div style={{display: "flex", flexDirection: "row", width: "100%", height: "100%", padding: "0", margin: "0"}}>
            <Navbar />
                <div style={{display: "flex", flexDirection: "column", width: "80%"}}>
                    <h1 style = {{fontSize: "3rem", display: "flex", justifyContent: "center"}}>
                        {t("translation:menu.settings")}
                    </h1>
                    <div style={{display: "flex", flexDirection: "row", width: "100%", height: "100%", padding: "0", margin: "0"}}>
                        <div style={{display: "flex", flexDirection: "column", width: "30vw", height: "100%"}}>
                            <ul className="settings" style={{ listStyle: "none", paddingLeft: "7%", flexDirection: "column", display: "flex" }}>
                            <li className={`set-item ${activeItem === "Langue" ? "active" : ""}`} style={{ marginRight: "10%", paddingTop: "5%", paddingBottom: "5%", paddingLeft: "10%" }}>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <a href="#" style={{ color: "#000000", fontSize: "1.5rem", textDecoration: "none", fontFamily: "Roboto", fontWeight: "700", fontStyle: "normal", lineHeight: "normal"}} onClick={() => handleItemClick("Langue")}>
                                            {t("translation:settings.language")}
                                        </a>
                                    </div>
                                </li>
                                <li className={`set-item ${activeItem === "Apparence" ? "active" : ""}`} style={{ marginRight: "10%", paddingTop: "5%", paddingBottom: "5%", paddingLeft: "10%" }}>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <a href="#" style={{ color: "#000000", fontSize: "1.5rem", textDecoration: "none", fontFamily: "Roboto", fontWeight: "700", fontStyle: "normal", lineHeight: "normal"}} onClick={() => handleItemClick("Apparence")}>
                                            {t("translation:settings.appearance")}
                                        </a>
                                    </div>
                                </li>
                                <li className={`set-item ${activeItem === "Sécurité et vie privé" ? "active" : ""}`} style={{ marginRight: "10%", paddingTop: "5%", paddingBottom: "5%", paddingLeft: "10%" }}>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <a href="#" style={{ color: "#000000", fontSize: "1.5rem", textDecoration: "none", fontFamily: "Roboto", fontWeight: "700", fontStyle: "normal", lineHeight: "normal"}} onClick={() => handleItemClick("Sécurité et vie privé")}>
                                            {t("translation:settings.security")}
                                        </a>
                                    </div>
                                </li>
                                <li className={`set-item ${activeItem === "Aide et support" ? "active" : ""}`} style={{ marginRight: "10%", paddingTop: "5%", paddingBottom: "5%", paddingLeft: "10%"}}>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <a href="#" style={{ color: "#000000", fontSize: "1.5rem", textDecoration: "none", fontFamily: "Roboto", fontWeight: "700", fontStyle: "normal", lineHeight: "normal"}} onClick={() => handleItemClick("Aide et support")}>
                                        {t("translation:settings.support")}
                                        </a>
                                    </div>
                                </li>
                                <li className={`set-item ${activeItem === "À propos" ? "active" : ""}`} style={{ marginRight: "10%", paddingTop: "5%", paddingBottom: "5%", paddingLeft: "10%"}}>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <a href="#" style={{ color: "#000000", fontSize: "1.5rem", textDecoration: "none", fontFamily: "Roboto", fontWeight: "700", fontStyle: "normal", lineHeight: "normal"}} onClick={() => handleItemClick("À propos")}>
                                        {t("translation:settings.about")}
                                        </a>
                                    </div>
                                </li>
                            </ul>
                            <a href="#" style={{
                                    color: "#FF0000",
                                    fontSize: "1.3rem",
                                    textDecoration: "none",
                                    fontFamily: "Roboto",
                                    fontStyle: "normal",
                                    lineHeight: "normal",
                                    marginLeft: "10%",
                                    marginRight: "auto",
                                    display: "block",
                                    marginTop: "auto",
                                    marginBottom: "auto",
                                }}onClick={() => {}}>
                                    {t("translation:profil.accountsupress")}
                                </a>
                        </div>
                
                <div style={{display: "flex", flexDirection: "column", width: "40%", height: "100%"}}>
                    <div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%"}}>
                        {activeItem === "Langue" && (
                            <div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%"}}>
                                <h1 style = {{fontSize: "2rem", display: "flex", justifyContent: "center"}}>
                                    {t("translation:languageSettings.appLanguage")}
                                </h1>
                                <div style={{display: "flex", flexDirection: "row", width: "100%", height: "100%"}}>
                                    <div style={{display: "flex", flexDirection: "column", width: "50%", height: "100%"}}>
                                        <button className="button" onClick={() => changeLanguage("fr")}>
                                            {t("translation:languageSettings.french")}
                                        </button>
                                        <button className="button" onClick={() => changeLanguage("en")}>
                                            {t("translation:languageSettings.english")}
                                        </button>
                                    </div>
                                </div>
                            </div>)}
                        {activeItem === "Apparence" && (
                            <div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%"}}>
                                <h1 style = {{fontSize: "2rem", display: "flex", justifyContent: "center"}}>
                                    {t("translation:settings.appearance")}
                                </h1>
                                <div style={{display: "flex", flexDirection: "row", width: "100%", height: "100%"}}>
                                    <div style={{display: "flex", flexDirection: "column", width: "50%", height: "100%"}}>
                                        <button className="button" onClick={() => toggleTheme("dark")}>
                                            {t("translation:appearanceSettings.darkMode")}
                                        </button>
                                        <button className="button" onClick={() => toggleTheme("light")}>
                                            {t("translation:appearanceSettings.lightMode")}
                                        </button>
                                    </div>
                                </div>
                                
                            </div>)}
                        {activeItem === "Sécurité et vie privé" && (
                            <div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%"}}>

                            </div>)}
                        {activeItem === "Aide et support" && (
                            <div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%"}}>
                            </div>)}
                        {activeItem === "À propos" && (
                            <div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%"}}>
                            </div>)}
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}



export default Settings