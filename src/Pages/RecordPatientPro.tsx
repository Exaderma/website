import { useState, useEffect } from "react";
import Navbar from "../components/NavbarPro";
import axios from "axios";
import { json } from "react-router-dom";

function RecordPatientPro () {

    const [email, setEmail] = useState('');
    const [patient, setPatient] = useState([]);
    const [patientId, setPatientId] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
      const fetchPatient = async () => {
        const encodedEmailFromHash = window.location.hash.replace('#', '');
        const decodedEmail = atob(encodedEmailFromHash);
        setEmail(decodedEmail);

        try {
          let data = await doGetRecord(decodedEmail);
          if (data === "[]") {
            await createRecord(decodedEmail);
            data = await doGetRecord(decodedEmail);
            return;
          }
          const jsonData = JSON.parse(data);
          const lastElement = jsonData[jsonData.length - 1];
          const { description, type, patientId } = lastElement;
          const patientData = await getLink();
          const patientJsonData = JSON.parse(patientData);

          setPatientId(patientId);
          setDescription(description);
          setType(type);
          const patient = patientJsonData.find((patient: any) => patient.id === patientId);
          if (patient) {
            const { firstName, lastName } = patient;
            setFirstName(firstName);
            setLastName(lastName);
          } else {
            console.error('Erreur lors de la récupération des données:', patientJsonData);
          }
        } catch (error) {
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
            console.log('Données obtenues avec succès:', data);
            console.log(typeof data);
            return data;
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            return "error";
        }
    };

    const createRecord = async (email: any) => {
      try {
        const response = await fetch(import.meta.env.VITE_URL + "/record/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("USERID"),
          },
          body: JSON.stringify({
            patientEmail: email,
            description: "Aucune description",
            type: "Veuillez choisir un type de symptôme",
          }),
        });
  
        if (!response.ok) {
          throw new Error(`Erreur de réseau: ${response.statusText}`);
        }
  
        const data = await response.text();
        console.log('Données obtenues avec succès:', data);
        setDescription("Aucune description");
        setType("Veuillez choisir un type de symptôme");
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

    return (
      <div style={{display: "flex", flexDirection: "row", width: "100%", height: "100%", padding: "0", margin: "0"}}>
        <Navbar/>
        <div>
          <h1>Record Patient Pro</h1>
          <div>
            <p>Prénom: {firstName}</p>
            <p>Nom: {lastName}</p>
            <p>Email: {email}</p>
            <p>Symptôme: {type}</p>
            <p>Commentaire: {description}</p>
          </div>
        </div>
      </div>
    );
}

export default RecordPatientPro;
