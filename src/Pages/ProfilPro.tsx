import { useState, useEffect } from "react";
import Navbar from "../components/NavbarPro";
import profilPicture from "../assets/profilPicture.png";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Popover from "../components/Popover";

import "../langage";
import { useTranslation } from "react-i18next";

function UserProfile() {
    const { t } = useTranslation();
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editPP, setEditPP] = useState(false);
    const [lastName, setNom] = useState("");
    const [firstName, setPrenom] = useState("");
    const [photo, setPhotoDeProfil] = useState("");
    // const [sexe, setSexe] = useState("");
    const [newEmail, setAdresseMail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setEtab] = useState("");
    const [department, setDepartement] = useState("");

    useEffect(() => {
        console.log("Le useEffect() est appelé.");
        const token = localStorage.getItem("USERID");
        if (!token) {
            return;
        }
        const decodedToken = jwt_decode(token) as { data: { id: string } };
        const id = decodedToken.data.id;

        axios.post(import.meta.env.VITE_URL + "/image/getProfile/professional", {}, {
            headers: { "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
        .then((response) => {
            console.log(response.data);
            const binaryString = window.atob(response.data);
            const binaryLen = binaryString.length;
            const bytes = new Uint8Array(binaryLen);
            for (let i = 0; i < binaryLen; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: "image/png" });
            const url = URL.createObjectURL(blob);
            console.log(url);
            setPhotoDeProfil(url);
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des utilisateurs :", error);
        });

        const url = import.meta.env.VITE_URL + "/professional/getUserProfile?id=" + id;
        axios.get(url, {
            headers: { "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
        .then((response) => {
            console.log(response.data);
            SetUser(response.data);
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des utilisateurs :", error);
        });
        // reloadSavedData();
    }, []);

    const SetUser = (data: any) => {
        setPrenom(data.firstName);
        setNom(data.lastName);
        // setSexe(data.sexe);
        setAdresseMail(data.email);
        setPhone(data.phone);
        setEtab(data.address);
        setDepartement(data.department);
        handleSaveChanges(true);
        localStorage.setItem("userProfileData", JSON.stringify(data));
    }
        
    const handleSaveChanges = (onLoad:boolean) => {
        setPopupOpen(false);
        setEditMode(false);
        const userProfileData = {
            firstName,
            lastName,
            newEmail,
            phone,
            department,
            address,
        };

        localStorage.setItem("userProfileData", JSON.stringify(userProfileData));
        if (!onLoad) {
            SaveInBase(userProfileData);
        }
    };

    const SaveInBase = (userProfileData:any) => {
        const token = localStorage.getItem("USERID");
        if (!token) {
            return;
        }

        console.log("SaveInBase");
    
        const updateUrls = [
            import.meta.env.VITE_URL + "/updateProfile/professional/firstName",
            import.meta.env.VITE_URL + "/updateProfile/professional/lastName",
            import.meta.env.VITE_URL + "/updateProfile/professional/email",
            import.meta.env.VITE_URL + "/updateProfile/professional/phone",
            import.meta.env.VITE_URL + "/updateProfile/professional/department",
            import.meta.env.VITE_URL + "/updateProfile/professional/address"
        ];
    
        updateUrls.forEach(async (url, index) => {
            if (!userProfileData[Object.keys(userProfileData)[index]]) {
                return;
            }
            try {
                const field = Object.keys(userProfileData)[index];
                const value = userProfileData[field];
                const requestBody = {
                    [field]: value
                };
                console.log("requestBody : ", requestBody);
                await axios.post(url, requestBody, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token
                    }
                });
            } catch (error) {
                console.log("field : ", Object.keys(userProfileData)[index]);
                console.error(`Erreur lors de la mise à jour de ${updateUrls[index]} :`, error);
            }
        });
    };

    const buttons = [
        { label: "Annuler", onClick: () => setPopupOpen(false), className: "close-button" },
        { label: "Sauvegarder", onClick: () => handleSaveChanges(false), className: "save-button" },
    ];

    const reloadSavedData = () => {
        const savedDataString = localStorage.getItem("userProfileData");
        const savedData = savedDataString ? JSON.parse(savedDataString) : null;
        if (savedData) {
            setNom(savedData.lastName || "");
            setPrenom(savedData.firstName || "");
            // setPhotoDeProfil(savedData.photo || "");
            // setSexe(savedData.sexe || "");
            setAdresseMail(savedData.email || "");
            setPhone(savedData.phone || "");
            setEtab(savedData.address || "");
            setDepartement(savedData.department || "");
        }
    }

    const renderField = (label: any, value: any, stateUpdater: any) => {
        const isEditMode = editMode && stateUpdater !== undefined;
    
        return (
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{label}:</label>
            {isEditMode ? 
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => stateUpdater(e.target.value)}
                  style={{
                    width: "100%",
                    fontSize: "1rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
                <span
                  style={{
                    textDecoration: "none",
                    color: "blue",
                    cursor: "pointer",
                    marginLeft: "1rem",
                  }}
                  onClick={() => stateUpdater("")}
                >
                  {t("translation:profilEdit.supress")}
                </span>
              </div>
            : <span style={{ fontSize: "1.3rem", marginLeft: "1rem" }}>{value}</span>}
          </div>
        );
    };

    const changeImage = () => {
        const token = localStorage.getItem("USERID");
        if (!token) {
            return;
        }

        const base64Image = photo.split(",")[1];

        const requestBody = {
            data: base64Image,
        };

        console.log("requestBody : ", requestBody);
        axios.post(import.meta.env.VITE_URL + "/image/setProfile/professional", requestBody, {
            headers: { "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des utilisateurs :", error);
        });
    };

    const handleImageClick = () => {
        if (!editMode) {
            setEditPP(true);
        }
        if (editPP) {
            setEditPP(false);
            changeImage();
        }
    };
    
    return (
        <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%", padding: "0", margin: "0" }}>
            <Popover isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} message="Voulez-vous sauvegarder les modifications ?" buttons={buttons} isCloseButtonVisible={false}  />
            <Navbar />
            <div style={{ display: "flex", flexDirection: "column", width: "80%" }}>
                <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                    <h1 style={{ color: "#000000", fontSize: "4rem", paddingLeft: "10%" }}>
                        {t("translation:profil.pageTitle")}
                    </h1>
                </div>
                <div style={{ display: "flex", flexDirection: "row", width: "70%", height: "25%", marginLeft: "10%", marginRight: "auto" }}>
                    <div style={{ display: "flex", flexDirection: "column"}}>
                    <img
                        src={photo || profilPicture}
                        alt="Photo de profil"
                        style={{
                        width: "100px",
                        height: "100px",
                        display: "block",
                        marginTop: "2%",
                        cursor: "pointer",
                        borderRadius: "50%",
                        }}
                        onClick={handleImageClick}
                    />
                    {editPP ? (
                        <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    const base64 = e.target?.result;
                                    setPhotoDeProfil(base64 as string);
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                        />
                    ) : null}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "5%", fontSize: "1.5rem" }}>
                        {renderField(t("translation:profil.name"), lastName, setNom)}
                        {renderField(t("translation:profil.firstName"), firstName, setPrenom)}
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>
                    <div style={{ display: "flex", flexDirection: "column", width: "40%", height: "50%", marginLeft: "5%", marginTop: "5%" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "5%", fontSize: "1.3rem", justifyItems: "center" }}>
                            {renderField(t("translation:profil.email"), newEmail, setAdresseMail)}
                            {renderField(t("translation:profil.phoneNumber"), phone, setPhone)}
                            {/* {renderField("Sexe", sexe, setSexe)} */}
                        </div>
            
                        {editMode && (
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "1rem", marginLeft: "25%", fontSize: "1.6rem" }}>
                                <span
                                    style={{ textDecoration: "none", color: "green", cursor: "pointer", marginRight: "1rem" }}
                                    onClick={() => setPopupOpen(true)}
                                >
                                    {t("translation:profilEdit.save")}
                                </span>
                                <span
                                    style={{ textDecoration: "none", color: "gray", cursor: "pointer" }}
                                    onClick={() => {setEditMode(false); reloadSavedData()}}

                                >
                                    {t("translation:profilEdit.cancel")}
                                </span>
                            </div>
                        )}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", width: "50%", height: "50%", marginLeft: "5%", marginTop: "5%" }}>
                        <div style={{ display: "flex", flexDirection: "column"}}>
                            {renderField(t("translation:profil.establishment"), address, setEtab)}
                            {renderField(t("translation:profil.department"), department, setDepartement)}
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row"}}>
                <a
                href="#"
                style={{
                    color: "#FF0000",
                    fontSize: "1.3rem",
                    textDecoration: "none",
                    fontFamily: "Roboto",
                    fontStyle: "normal",
                    lineHeight: "normal",
                    marginLeft: "10%",
                    marginRight: "auto",
                    display: "block",
                    marginBottom: "5%",
                }}
                onClick={() => {
                    localStorage.clear();
                    window.location.href = "/pro/login";
                }}
                >
                    {t("translation:profil.disconnect")}
                </a>
                <span
                    style={{
                    textDecoration: "none",
                    color: "blue",
                    cursor: "pointer",
                    marginRight: "10%",
                    fontSize: "1.3rem",
                    }}
                    onClick={() => setEditMode(true)}
                >
                    {t("translation:profil.modify")}
                </span>
                </div>
            </div>
        </div>
        );
    }
    
    export default UserProfile;