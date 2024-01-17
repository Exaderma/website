import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import FolderComponent from "../components/Folder";
import Navbar from "../components/NavbarPro";
import folderIcon from "../assets/folder.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import '../index.css';

import "../langage";
import { useTranslation } from "react-i18next";

interface Folder {
    id: number;
    firstName: string;
    lastName: string;
    content: {};
}

const handleFolderClick = (folder: Folder) => {
    localStorage.setItem("folder", JSON.stringify(folder));
}

const Gallery: React.FC = () => {
    const { t } = useTranslation();
    const [folders, setFolders] = useState<Folder[]>([]);

    useEffect(() => {
        console.log("Le useEffect() est appelé.");
        axios
        .get(import.meta.env.VITE_URL + "/professional/getLink", {
            headers: {
            Authorization: "Bearer " + localStorage.getItem("USERID"),
            },
        })
        .then((response) => {
            console.log(response.data);
            setFolders(response.data);
            console.log(folders);
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des utilisateurs :", error);
        });

    }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%", padding: "0", margin: "0" }}>
        <Navbar />
        <div style={{ display: "flex", flexDirection: "column", width: "80%" }}>
            <div>
                <h1 style = {{color: "#002762", fontSize: "3rem", display: "flex", justifyContent: "center"}}>
                    {t("translation:menu.gallery")}
                </h1>
                <div className="folder-list" style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%", marginLeft: "auto", marginRight: "auto", justifyContent: "space-between" }}>
                    {folders.map((folder) => (
                    <div key={folder.id} style={{ display: "flex", flexDirection: "column", width: "20%", height: "20%", marginLeft: "auto", marginRight: "auto", justifyContent: "space-between" }}>
                        <a href={`/pro/gallery/folder`} onClick={() => handleFolderClick(folder)}>
                            <img src={folderIcon} alt="folder" style={{ width: "100%", height: "100%"}} />
                        </a>
                        <Link to={`/pro/gallery/folder`} style={{ color: "#000000", fontSize: "1.5rem", textDecoration: "none", fontFamily: "Roboto", fontWeight: "700", fontStyle: "normal", lineHeight: "normal", marginLeft: "auto", marginRight: "auto" }} onClick={() => handleFolderClick(folder)}>
                            {folder.firstName}
                        </Link>
                    </div>
                    ))}
                    <Routes>
                        <Route path="/pro/gallery/folder" element={<FolderComponent folder={folders[0]} />} />
                    </Routes>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Gallery;