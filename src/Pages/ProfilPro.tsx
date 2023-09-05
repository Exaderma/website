import React, { useState, useEffect } from "react";
import Navbar from "../components/NavbarPro";
import profilPicture from "../assets/profilPicture.png";
import axios from "axios";
// import jwt from 'jsonwebtoken';

function UserProfile() {
    const [isNomEditable, setIsNomEditable] = useState(false);
    const [isPrenomEditable, setIsPrenomEditable] = useState(false);
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [photoDeProfil, setPhotoDeProfil] = useState("");
    const [sexe, setSexe] = useState("");
    const [adresseMail, setAdresseMail] = useState("");
    const [phone, setPhone] = useState("");
    const [etab, setEtab] = useState("");
    const [departement, setDepartement] = useState("");

    const [editMode, setEditMode] = useState(false);
    // try {
    //     const decoded = jwt.verify(token, secretKey);
    //     console.log('Token décodé :', decoded);
    // } catch (error) {
    //     console.error('Erreur de décodage du token :', error);
    // }

    // useEffect(() => {
    //     axios
    //     .get("http://51.103.66.175:8080/professional/getUserProfile", {
    //         headers: {
    //         Authorization: "Bearer " + localStorage.getItem("USERID"),
    //         },
    //     })
    //     .then((response) => {
    //         console.log(response.data);
    //         setUsers(response.data);
    //     })
    //     .catch((error) => {
    //         console.error("Erreur lors de la récupération des utilisateurs :", error);
    //     });
    // }, []);

    // const setUsers = (data) => {
    //     console.log("data : ", data.firstName);
    //     setNom(data.firstName);
    //     setPrenom(data.lastName);
    //     setPhotoDeProfil(data.photo);
    //     // setSexe(data.sexe);
    //     setAdresseMail(data.email);
    //     handleSaveChanges();
    // }

    const renderField = (label, value, stateUpdater) => {
        const isEditMode = editMode && stateUpdater !== undefined;
    
        return (
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{label}:</label>
            {isEditMode ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => stateUpdater(e.target.value)}
                  style={{
                    width: "100%",
                    fontSize: "1.3rem",
                    padding: "0.5rem",
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
                  Supprimer
                </span>
              </div>
            ) : (
              <span
                style={{
                  fontSize: "1.3rem",
                  marginLeft: "1rem",
                  color: "#333",
                }}
              >
                {value}
                {stateUpdater && (
                  <span
                    style={{
                      textDecoration: "none",
                      color: "blue",
                      cursor: "pointer",
                      marginLeft: "3rem",
                    }}
                    onClick={() => setEditMode(true)}
                  >
                    Modifier
                  </span>
                )}
              </span>
            )}
          </div>
        );
      };

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("userProfileData"));
    
        if (savedData) {
            setNom(savedData.nom || "");
            setPrenom(savedData.prenom || "");
            setPhotoDeProfil(savedData.photoDeProfil || "");
            setSexe(savedData.sexe || "");
            setAdresseMail(savedData.adresseMail || "");
            setPhone(savedData.phone || "");
            setEtab(savedData.etab || "");
            setDepartement(savedData.departement || "");
        }
        }, []);
        
        const handleSaveChanges = () => {
            const userProfileData = {
                nom,
                prenom,
                photoDeProfil,
                sexe,
                adresseMail,
                phone,
                etab,
                departement,
            };
    
            localStorage.setItem("userProfileData", JSON.stringify(userProfileData));
        
            setEditMode(false);
        };

        const reloadSavedData = () => {
            const savedData = JSON.parse(localStorage.getItem("userProfileData"));

            if (savedData) {
                setNom(savedData.nom || "");
                setPrenom(savedData.prenom || "");
                setPhotoDeProfil(savedData.photoDeProfil || "");
                setSexe(savedData.sexe || "");
                setAdresseMail(savedData.adresseMail || "");
                setPhone(savedData.phone || "");
                setEtab(savedData.etab || "");
                setDepartement(savedData.departement || "");
            }
        }
    
    return (
        <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%", padding: "0", margin: "0" }}>
            <Navbar />
            <div style={{ display: "flex", flexDirection: "column", width: "80%" }}>
                <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                    <h1 style={{ color: "#000000", fontSize: "4rem", paddingLeft: "10%" }}>Votre Profil</h1>
                </div>
                <div style={{ display: "flex", flexDirection: "row", width: "70%", height: "25%", marginLeft: "10%", marginRight: "auto" }}>
                    <div style={{ display: "flex", flexDirection: "column"}}>
                    <img
                    src={profilPicture || "placeholder.jpg"}
                    alt="Photo de Profil"
                    style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                    />
                    {editMode ? (
                        <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPhotoDeProfil(URL.createObjectURL(e.target.files[0]))}
                        />
                    ) : null}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "5%", fontSize: "1.5rem" }}>
                        {isNomEditable ? (
                            <div className="editable-field" style={{ top: "100px", left: "50px" }}>
                            <input
                                type="text"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                            />
                            <span
                                style={{
                                    textDecoration: "none",
                                    color: "green",
                                    cursor: "pointer",
                                    marginLeft: "3rem",
                                }}onClick={() => setIsNomEditable(false)}>Sauvegarder</span>
                            </div>
                        ) : (
                            <div>
                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <div style={{ marginRight: "1rem", fontSize: "1.5rem", fontWeight: "bold" }}>
                                        Nom:
                                    </div>
                                    <span>{nom}</span>
                                    <span
                                        style={{
                                            textDecoration: "none",
                                            color: "blue",
                                            cursor: "pointer",
                                            marginLeft: "6rem",
                                        }}onClick={() => setIsNomEditable(true)}>Modifier
                                    </span>
                                </div>
                            </div>
                        )}
                        {isPrenomEditable ? (
                            <div className="editable-field" style={{ top: "150px", left: "50px" }}>
                            <input
                                type="text"
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                            />
                            <span
                                style={{
                                    textDecoration: "none",
                                    color: "green",
                                    cursor: "pointer",
                                    marginLeft: "3rem",
                                }}onClick={() => setIsPrenomEditable(false)}>Sauvegarder</span>
                            </div>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <div style={{ marginRight: "1rem", fontSize: "1.5rem", fontWeight: "bold" }}>
                                    Prénom:
                                </div>
                                <span>{prenom}</span>
                                <span
                                    style={{
                                        textDecoration: "none",
                                        color: "blue",
                                        cursor: "pointer",
                                        marginLeft: "3rem",
                                    }}onClick={() => setIsPrenomEditable(true)}>
                                    Modifier
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>
                    <div style={{ display: "flex", flexDirection: "column", width: "40%", height: "50%", marginLeft: "5%", marginTop: "5%" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "5%", fontSize: "1.3rem", justifyItems: "center" }}>
                            {renderField("Sexe", sexe, setSexe)}
                            {renderField("Adresse Email", adresseMail, setAdresseMail)}
                            {renderField("Téléphone", phone, setPhone)}
                        </div>
            
                        {editMode && (
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "1rem", marginLeft: "25%", fontSize: "1.6rem" }}>
                                <span
                                    style={{ textDecoration: "none", color: "green", cursor: "pointer", marginRight: "1rem" }}
                                    onClick={handleSaveChanges}
                                >
                                    Sauvegarder les Modifications
                                </span>
                                <span
                                    style={{ textDecoration: "none", color: "gray", cursor: "pointer" }}
                                    onClick={() => {setEditMode(false); reloadSavedData()}}

                                >
                                    Annuler
                                </span>
                            </div>
                        )}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", width: "50%", height: "50%", marginLeft: "5%", marginTop: "5%" }}>
                        <div style={{ display: "flex", flexDirection: "column"}}>
                            {renderField("Etablissement", etab, setEtab)}
                            {renderField("Département", departement, setDepartement)}
                        </div>
                    </div>
                </div>
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
                >
                    Se Déconnecter
                </a>
            </div>
        </div>
        );
    }
    
    export default UserProfile;