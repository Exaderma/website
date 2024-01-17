import React from "react";
import { useEffect, useState } from "react";
import Navbar from "./NavbarPro";
import axios from "axios";

import "../langage";
import { useTranslation } from "react-i18next";

interface FolderPageProps {
    folder?: { id: number; firstName: string; lastName: string; };
}

export const FolderComponent: React.FC<FolderPageProps> = ({ folder }) => {
    const { t } = useTranslation();
    
    const [files, setFiles] = useState<any[]>([]);
    folder = JSON.parse(localStorage.getItem("folder") || "{}");
    
    useEffect(() => {
        const token = localStorage.getItem("USERID");

        const requestBody = {
            "id_patient" : folder?.id,
        };

        axios
        .post(import.meta.env.VITE_URL + "/image/getProfile/patient", requestBody, {
            headers: { "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        })
        // .get(import.meta.env.VITE_URL + "/image/folder/get",{
        //     headers: { "Content-Type": "application/json",
        //         Authorization: "Bearer " + token,
        //     },
        // })
        .then((response) => {
            console.log(response);
            setFiles(response.data);
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des utilisateurs :", error);
            if (error.response.data === "Patient does not have image") {
                console.log("Patient does not have image");
                setFiles([]);
            }
        });

    }, []);

    console.log(folder);

    return (
        <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%", padding: "0", margin: "0" }}>
            <Navbar />
            <div style={{ display: "flex", flexDirection: "column", width: "80%" }}>
                <h1 style = {{color: "#002762", fontSize: "3rem", display: "flex", justifyContent: "center"}}>
                    {t("translation:gallery.folder")} {folder?.firstName} {folder?.lastName}
                </h1>
                <div>
                    {files?.map((file: any) => (
                        <div key={file.id} style={{ display: "flex", alignItems: "center", margin: "10px" }}>
                            <a href={file.url} style={{ color: "#000000", fontSize: "1.5rem", textDecoration: "none", fontFamily: "Roboto", fontWeight: "700", fontStyle: "normal", lineHeight: "normal" }}>
                                {file.name}
                            </a>
                        </div>
                    ))}
                    {files.length === 0 && (
                        <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
                            <p style={{ color: "#000000", fontSize: "1.5rem", textDecoration: "none", fontFamily: "Roboto", fontWeight: "700", fontStyle: "normal", lineHeight: "normal" }}>
                                {t("translation:gallery.empty")}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FolderComponent;