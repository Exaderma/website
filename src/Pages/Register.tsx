import React from 'react';
import '../index.css';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Background from '../components/Background';
import Popup from '../components/Popup';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  confirmation?: string;
}


const initialFormValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmation: '',
};

function RegisterPage() {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(formValues);
    if (formValues.password !== formValues.confirmation) {
      alert('Passwords do not match');
      return;
    }
    axios.post('http://176.141.147.142/patient/register', {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password
    }).then((response) => {
      console.log(response);
      if (response.status === 201) {
        alert('Account created successfully');
        navigate('/login')
      }
    }).catch((error) => {
      console.log(error);
      if (error.response.status === 400) {
        alert('Invalid email');
      }
      if (error.response.status === 409) {
        alert('Email already in use');
      }
      if (error.response.status === 500) {
        alert('Server error');
      }
    });
    setFormValues(initialFormValues);
  };

  return (
    <div className="LoginPage" style={{ background: "#FFFFFF", width: "100%", height: "100%" }}>
      <Background />

      <Card
        backgroundColor="#E0E6FD"
        width="22vw"
        height="fit-content"
        position="absolute"
        top="8vh"
        left="39vw"
      >
        <img src="./logo.png" alt="logo" style={{ width: "13vw", height: "10vw", marginLeft: "auto", marginRight: "auto", display: "block" }} />

        <form onSubmit={handleSubmit} style={{ marginTop: "2.5vw", marginLeft: "0.5vw", display: "block" }}>
          <label style={{ marginRight: "0.4vw" }}>
            <input className='form' type="text" name="firstName" value={formValues.firstName} placeholder="Prénom" style={{ width: "9.5vw" }} onChange={handleInputChange} />
          </label>
          <label>
            <input className='form' type="text" name="lastName" value={formValues.lastName} placeholder="Nom" style={{ width: "9.5vw" }} onChange={handleInputChange} />
          </label>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label>
              <input className='form' type="email" name="email" value={formValues.email} placeholder="Adresse mail" style={{ marginTop: "2vh", width: "19vw" }} onChange={handleInputChange} />
            </label>
            <Popup content="Veuillez entrer une adresse mail valide" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label>
              <input className='form' type="password" name="password" value={formValues.password} placeholder="Mot de passe" style={{ marginTop: "2vh",width: "19vw" }} onChange={handleInputChange} />
            </label>
            <Popup content="Veuillez entrer un mot de passe qui permettra de vous connecter" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label>
              <input className='form' type="password" name="confirmation" value={formValues.confirmation} placeholder="Confirmation mot de passe" style={{ marginTop: "2vh",width: "19vw" }} onChange={handleInputChange} />
            </label>
            <Popup content="Veuillez confirmer votre mot de passe pour éviter les erreurs de frappe" />
          </div>
          <div style={{ marginTop: "1vw", marginLeft: "auto",  display: 'flex', alignItems: 'center' }}>
            <input type="checkbox" id="rememberMe" name="rememberMe" value="rememberMe" style={{ width: "1vw", height: "1vw" }} />
            <label htmlFor="rememberMe" style={{ color: "#0F6FFF", fontSize: "0.8vw", marginLeft: "0.5vw", marginRight: "0.5vw" }}>Se souvenir de moi</label>
            <Popup content="Cocher cette case pour rester connecté" />
            <a href="#" style={{ color: "#0F6FFF", fontSize: "0.8vw", textAlign: "start", marginLeft: "3vw", marginRight: "0.5vw" }}>Mot de passe oublié ?</a>
            <Popup content="Cliquer ici pour recevoir un mail qui servira à réinitialiser votre mot de passe" />
          </div>
          <div style={{ marginTop: "1vw", marginLeft: "auto", display: "block", textAlign: "center" }}>
            <button type="submit" style={{ width: "85%", height: "3vw", backgroundColor: "#0F6FFFB2", color: "#FFFFFF", borderRadius: "0.5vw", border: "none" }}>Créer un compte</button>
          </div>
        </form>
        <div style={{ marginTop: "5vh", marginLeft: "auto", display: "block", textAlign: "center" }}>
          Vous avez déjà un compte ?
          <div style={{ marginTop: "1vh", marginLeft: "7vw", display: "flex", textAlign: "center" }}>
            <a href="/login" style={{ color: "#0F6FFF", marginRight: "1vw"  }}>Connectez-vous</a>
            <Popup content="Cliquer ici pour acceder a la page de connexion si vous avez déjà un compte" />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default RegisterPage;
