import React, { useState, useEffect } from "react";
import Navbar from "../components/NavbarPro";
import Profil from "../assets/profil.svg";
import Search from "../assets/search.svg";
import Card from "../components/Card";
import axios from "axios";
import profilPicture from "../assets/profilPicture.png";
import '../index.css';
import chat from "../assets/chat.png";

function Homepro() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isNavbarOpen, setIsNavbarOpen] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
        .get("http://51.103.66.175:8080/professional/getLink", {
            headers: {
            Authorization: "Bearer " + localStorage.getItem("USERID"),
            },
        })
        .then((response) => {
            setUsers(response.data);
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des utilisateurs :", error);
        });
    }, []);

    const handleSearch = () => {
        console.log("Recherche pour :", searchTerm);
    };

    const toggleNavbar = () => {
        setIsNavbarOpen((prev) => !prev);
    };

    const contentWidth = isNavbarOpen ? "80%" : "100%";

    const filteredUsers = users.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();
        return fullName.includes(searchTermLower);
    });

    return (
        <div style={{display: "flex", flexDirection: "row", width: "100%", height: "100%", padding: "0", margin: "0"}}>
            <Navbar isNavbarOpen={isNavbarOpen} toggleNavbar={toggleNavbar} />
            <div style={{display: "flex", flexDirection: "column", width: contentWidth }}>
                <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
                    <h1 style = {{color: "#000000", fontSize: "4rem", marginLeft: "auto"}}>
                    Contacter votre patient
                    </h1>
                    <a href="/pro/profil" style={{marginLeft: "auto", marginRight: "5vw", marginTop: "2%"}}>
                        <img src={Profil} alt="profil" style={{height: "11vh"}} />
                    </a>
                </div>
                <div className="search-bar" style={{display: "flex", flexDirection: "row", width: "70%", marginLeft: "auto", marginRight: "auto"}}>
                    <a href="#" style={{ color: "#000000", fontSize: "1.5rem", textDecoration: "none", fontFamily: "Roboto", fontStyle: "normal", lineHeight: "normal"}} onClick={handleSearch}>
                        <img src={Search} alt="search" style={{width: "7%", height: "17%", marginLeft: "2%", display: "block"}} />
                    </a>
                    <input
                        type="text"
                        placeholder="Rechercher votre patient"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{width: "100%", height: "100%", marginLeft: "-30%", display: "block", fontSize: "1.5rem", fontFamily: "Roboto", fontWeight: "700", fontStyle: "normal", lineHeight: "normal"}}
                    />
                </div>
                <div style={{ width: "80%", height: "1px", background: "#000000",  marginLeft: "auto", marginRight: "auto"}}></div>
                <div style={{display: "flex", flexDirection: "row", width: "70%", height: "100%", marginLeft: "auto", marginRight: "auto"}}>
                    <ul>
                        {filteredUsers.map((user) => (
                        <li key={user.id} style={{listStyle: "none"}}>
                            <Card width="10vw" height="fit-content">
                                <img src={profilPicture} alt="profil" style={{width: "100%", height: "100%", marginLeft: "auto", marginRight: "auto", display: "block"}} />
                                <div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%", marginLeft: "auto",  marginRight: "auto"}}>
                                    <h1 style={{color: "#000000", fontSize: "2rem", paddingLeft: "10%",}}>
                                        {`${user.firstName} ${user.lastName}`}
                                    </h1>
                                    {/* <h2 style={{color: "#000000", fontSize: "1.5rem", paddingLeft: "10%"}}>
                                        {user.dateNaissance}
                                    </h2> */}
                                </div>
                                <div className="message">
                                    <img src={chat} alt="chat" style={{width: "30%", height: "30%", marginLeft: "auto", marginRight: "auto", display: "block"}} />
                                    <a href="/pro/message" style={{ color: "#000000", fontSize: "1.3rem", textDecoration: "none", fontFamily: "Roboto", fontStyle: "normal", lineHeight: "normal", marginLeft: "auto", marginRight: "auto", display: "block"}}>
                                        Message
                                    </a>
                                </div>
                            </Card>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Homepro;