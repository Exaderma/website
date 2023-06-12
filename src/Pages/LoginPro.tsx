import React from 'react';
import '../index.css';
import Box from '../components/Box';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

interface FormValues {
  email: string;
  password?: string;
}


const initialFormValues: FormValues = {
  email: '',
  password: '',
};

function LoginPagePro() {
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
    if (!formValues.password || !formValues.email) {
      alert('Please fill all the fields');
      return;
    }
    axios.post('http://176.141.147.142/professional/login',
      {
        email: formValues.email,
        password: formValues.password
      }
    ).then((response) => {
      if (response.status === 200) {
        alert('Connected successfully');
        localStorage.setItem("USERID", response.data.token);
        navigate('/pro/generateLink', { state: { token: response.data.token } })
      }
    }).catch((error) => {
      if (error.response.status === 400) {
        alert('Invalid logs');
      }
      if (error.response.status === 500) {
        alert('Server error');
      }
    });
    setFormValues(initialFormValues);
  };

  return (
    <div className="LoginPage" style={{ background: "#FFFFFF", width: "100%", height: "100%" }}>
      <Box style={{ '--box-background': '#5CFF0F' }}/>
      <Box style={{ '--box-left': '26%', '--box-right': '71.5%', '--box-top': '50%', '--box-bottom': '8%', '--box-background': '#82C659' }} />
      <Box style={{ '--box-left': '13.5%', '--box-right': '84%', '--box-top': '49%', '--box-bottom': '46%', '--box-background': '#333533' }} />
      <Box style={{ '--box-left': '20%', '--box-right': '77.5%', '--box-top': '32%', '--box-bottom': '56%', '--box-background': '#5CFF0F' }} />
      <Box style={{ '--box-left': '27%', '--box-right': '70.5%', '--box-top': '20.5%', '--box-bottom': '37.5%', '--box-background': '#F5CB5C' }} />
      <Box style={{ '--box-left': '11%', '--box-right': '86.5%', '--box-top': '15.5%', '--box-bottom': '46.5%', '--box-background': '#82C659' }} />
      <Box style={{ '--box-left': '70.5%', '--box-right': '27%', '--box-top': '20.5%', '--box-bottom': '37.5%', '--box-background': '#5CFF0F' }} />
      <Box style={{ '--box-left': '10%', '--box-right': '87.5%', '--box-top': '-2%', '--box-bottom': '75%', '--box-background': '#5CFF0F' }} />
      <Box style={{ '--box-left': '24%', '--box-right': '73.5%', '--box-top': '5%', '--box-bottom': '90%', '--box-background': '#F5CB5C' }} />
      <Box style={{ '--box-left': '65.5%', '--box-right': '32%', '--box-top': '13.5%', '--box-bottom': '57.5%', '--box-background': '#82C659' }} />
      <Box style={{ '--box-left': '75.5%', '--box-right': '22%', '--box-top': '0%', '--box-bottom': '86%', '--box-background': '#F5CB5C' }} />
      <Box style={{ '--box-left': '68.5%', '--box-right': '29%', '--box-top': '55.5%', '--box-bottom': '2.5%', '--box-background': '#82C659' }} />
      <Box style={{ '--box-left': '91.5%', '--box-right': '6%', '--box-top': '75%', '--box-bottom': '20%', '--box-background': '#333533' }} />
      <Box style={{ '--box-left': '87.5%', '--box-right': '10%', '--box-top': '45.5%', '--box-bottom': '30%', '--box-background': '#5CFF0F' }} />
      <Box style={{ '--box-left': '83.5%', '--box-right': '14%', '--box-top': '39%', '--box-bottom': '48.5%', '--box-background': '#F5CB5C' }} />
      <Box style={{ '--box-left': '87.5%', '--box-right': '10%', '--box-top': '8%', '--box-bottom': '60.5%', '--box-background': '#82C659' }} />



      <Card
        backgroundColor="#E0FDE6"
        width="22vw"
        height="fit-content"
        position="absolute"
        top="8vh"
        left="39vw"
      >
        <img src="../logo.png" alt="logo" style={{ width: "13vw", height: "10vw", marginLeft: "auto", marginRight: "auto", display: "block" }} />

        <form onSubmit={handleSubmit} style={{ marginTop: "2.5vw", marginLeft: "0.5vw", display: "block" }}>
          <label>
            <input className='form' type="email" name="email" value={formValues.email} placeholder="Adresse mail" style={{ marginTop: "2vh", width: "20vw" }} onChange={handleInputChange} />
          </label>
          <label>
            <input className='form' type="password" name="password" value={formValues.password} placeholder="Mot de passe" style={{ marginTop: "2vh", width: "20vw" }} onChange={handleInputChange} />
          </label>
          <div style={{ marginTop: "1vw", marginLeft: "auto", display: "block" }}>
            <input type="checkbox" id="rememberMe" name="rememberMe" value="rememberMe" style={{ width: "1vw", height: "1vw" }} />
            <label htmlFor="rememberMe" style={{ color: "#0F6FFF", fontSize: "0.8vw", marginLeft: "0.5vw" }}>Se souvenir de moi</label>
            <a href="#" style={{ color: "#0F6FFF", fontSize: "0.8vw", textAlign: "start", marginLeft: "5vw" }}>Mot de passe oublié ?</a>
          </div>
          <div style={{ marginTop: "1vw", marginLeft: "auto", display: "block", textAlign: "center" }}>
            <button type="submit" style={{ width: "85%", height: "3vw", backgroundColor: "#0F6FFFB2", color: "#FFFFFF", borderRadius: "0.5vw", border: "none" }}>Se connecter</button>
          </div>
        </form>
        <div style={{ marginTop: "5vh", marginLeft: "auto", display: "block", textAlign: "center" }}>
          Vous n'avez pas de compte ?
          <div>
            <a href="/pro/register" style={{ color: "#0F6FFF" }}>Créer un compte</a>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default LoginPagePro;