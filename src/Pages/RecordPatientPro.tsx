import { useState, useEffect } from "react";
import Navbar from "../components/NavbarPro";
import profilPicture from "../assets/profilPicture.png";
import axios from "axios";
import { json } from "react-router-dom";
import EditableField from "../components/EditableField";

function RecordPatientPro () {

    const [email, setEmail] = useState('');
    const [id, setId] = useState([]);
    const [patientId, setPatientId] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [buttonTextColor, setButtonTextColor] = useState('red');
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
      const fetchPatient = async () => {
        const encodedEmailFromHash = window.location.hash.replace('#', '');
        const decodedEmail = atob(decodeURIComponent(encodedEmailFromHash));
        setEmail(decodedEmail);

        try {
          let data = await doGetRecord(decodedEmail);
          if (data === "[]") {
            console.log("Création d'un nouveau record");
            await createRecord(decodedEmail);
            data = await doGetRecord(decodedEmail);
          }
          const jsonData = JSON.parse(data);
          const lastElement = jsonData[jsonData.length - 1];
          const { description, type, patientId, id } = lastElement;
          const patientData = await getLink();
          const patientJsonData = JSON.parse(patientData);

          setPatientId(patientId);
          setDescription(description);
          setType(type);
          setId(id);
          const patient = patientJsonData.find((patient: any) => patient.id === patientId);
          if (patient) {
            const { firstName, lastName } = patient;
            setFirstName(firstName);
            setLastName(lastName);
          } else {
            handleErrorMessage();
            console.error('Erreur lors de la récupération des données:', patientJsonData);
          }
        } catch (error) {
          handleErrorMessage();
          console.error('Erreur lors de la récupération des données:', error);
        }
      }
      fetchPatient();

    }, []);

    const doGetRecord = async (email: any): Promise<string> => {
        try {
            const response = await fetch(import.meta.env.VITE_URL + "/record/get", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + localStorage.getItem("USERID"),
              },
              body: JSON.stringify({
                patientEmail: email,
              }),
            });
      
            if (!response.ok) {
              throw new Error(`Erreur de réseau: ${response.statusText}`);
            }
      
            const data = await response.text();
            console.log('Données obtenues avec succès: ', data);
            console.log(typeof data);
            return data;
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            return "error";
        }
    };

    const createRecord = async (email: any) => {
      try {
        const response = await fetch(import.meta.env.VITE_URL + "/record/new", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("USERID"),
          },
          body: JSON.stringify({
            patientEmail: email,
            description: "Aucune description",
            type: "Veuillez choisir un type de pathologie",
          }),
        });
  
        if (!response.ok) {
          throw new Error(`Erreur de réseau: ${response.statusText}`);
        }
  
        const data = await response.text();
        console.log('Données obtenues avec succès:', data);
        setDescription("Aucune description");
        setType("Veuillez choisir un type de pathologie");
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    }

    const getLink = async (): Promise<string> => {
      try {
        const response = await fetch(import.meta.env.VITE_URL + "/professional/getLink", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("USERID"),
          },
        });
  
        if (!response.ok) {
          throw new Error(`Erreur de réseau: ${response.statusText}`);
        }
  
        const data = await response.text();
        console.log('Données obtenues avec succès:');
        return data;
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return "error";
      }
    }

    const handleTypeSave = async (newValue: string) => {
      const saveType = type;

      setType(newValue);
      console.log(newValue)
      try {
        await updateRecord(newValue, description);
      } catch (error) {
        setType(saveType);
      }
    };

    const handleDescriptionSave = async (newValue: string) => {
      const saveDescription = description;

      setDescription(newValue);
      try {
        await updateRecord(type, newValue);
      } catch (error) {
        setDescription(saveDescription);
      }
    };

    const updateRecord = async (type: any, description: any) => {
      console.log("updateRecord: ", typeof(patientId));
      const stringId = patientId.toString();
      try {
        const response = await fetch(import.meta.env.VITE_URL + "/record/update", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("USERID"),
          },
          body: JSON.stringify({
            description: description,
            type: type,
            patientEmail: email,
            id: id,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`Erreur de réseau: ${response.statusText}`);
        }
  
        const data = await response.text();
        console.log('Données obtenues avec succès:', data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    }

    const deletePatient = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_URL + "/professional/removeLink", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("USERID"),
          },
          body: JSON.stringify({
            patientEmail: email,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`Erreur de réseau: ${response.statusText}`);
        }
  
        const data = await response.text();
        console.log('Données obtenues avec succès:', data);
        window.location.href = '/pro/home';
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    }

    const handleErrorMessage = () => {
      alert(`Erreur`);
      window.location.href = '/pro/home';
    };

    const handleMouseEnter = () => {
      setButtonTextColor('black');
    };
  
    const handleMouseLeave = () => {
      setButtonTextColor('red');
    };

    const handleDeletePatient = async () => {
      setShowPopup(true);
    }

    const closePopup = () => {
      setShowPopup(false);
    }



    return (
      <div style={{display: "flex", flexDirection: "row", width: "100%", height: "100%", padding: "0", margin: "0", backgroundColor: "F1F1F1"}}>
        <Navbar/>
        <div style={{ display: "flex", flexDirection: "column", width: "80%" }}>
          <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
            <h1 style={{ color: "#000000", fontSize: "3rem", paddingLeft: "10%" }}>Fiche patient de:</h1>
          </div>
          <div style={{display: "flex", flexDirection: "row", width: "70%", height: "25%", marginLeft: "10%", marginRight: "auto"}}>
            <img src={profilPicture} alt="patientPicture" style={{width: "100px", height: "100px", borderRadius: "50%", paddingLeft: "5%"}}/>
            <h1 style={{ color: "#000000", fontSize: "2rem", paddingLeft: "10%" }}>{firstName} {lastName}</h1>
          </div>
          <div style={{display: "flex", flexDirection: "column", width: "70%", height: "25", marginLeft:"31%"}}>
            <p><strong>Email:</strong> {email}</p>
            <div><strong>Pathologie:</strong> <pre><EditableField initialValue={type} onSave={handleTypeSave}/></pre></div>
            <div><strong>Description:</strong> <pre><EditableField initialValue={description} onSave={handleDescriptionSave}/></pre></div>
          </div>
          <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
            <button style={{ backgroundColor: "transparent", color: "red", border: "none", padding: "0", margin: "0", fontSize: "1rem", cursor: "pointer" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleDeletePatient}>
            Supprimer le patient
            </button>
          </div>
          {showPopup && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ background: '#D9D9D9', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
                <p>Êtes-vous sûr de vouloir supprimer ce patient: {firstName} {lastName}. <br />Cette action est irréversible.</p>
                <div style={{ margin: '30px'}}>
                  <button style={{marginRight: '100px', backgroundColor: "#C71B1B", borderRadius: "10px", border: "none"}} onClick={closePopup}>Non <br /> (Garder patient)</button>
                  <button style={{backgroundColor: "#2DA92B", borderRadius: '10px', border: "none"}} onClick={() => {
                    console.log('Patient supprimé !');
                    deletePatient();
                    closePopup();
                  }}>Oui <br /> (Supprimer patient)</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

export default RecordPatientPro;
