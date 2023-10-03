import React, { useEffect } from 'react';
import '../index.css';
import Box from '../components/Box';
import Card from '../components/Card';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function GenerateLinkPro() {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const data = useLocation();
  let token: any = data.state as any;

  useEffect(() => {
    if (!token.token) {
      navigate('/login')
    }
  }, [token, navigate])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("TOKEN IS :", token.token);
    console.log(email);
    axios.post('http://51.103.66.175:8080/professional/link',{
      email : email
    }, {
      headers: {
        'Authorization': `Bearer ${token.token}`
      }
    }).then((response) => {
      console.log(email);
      console.log(response);
      if (response.status === 200) {
        setCode(response.data);
      }
    }).catch((error) => {
      console.log(error);
      if (error.response.status === 400) {
        alert('There was an error generating the link, please try again later');
      }
    });
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
        <img src="../ExadermaPro.svg" alt="logo" style={{ width: "13vw", height: "12vw", marginLeft: "auto", marginRight: "auto", display: "block",  }} />

        <form onSubmit={handleSubmit} style={{ marginTop: "2.5vw", marginLeft: "0.5vw", display: "block" }}>
          <label>
              Rentrez l'email correspondant à votre nouveau patient. Une fois le code généré, il sera affiché ci-dessous.
          </label>
          <div>
            <br />
            <br />
          <label>
            Le code à donner au patient est : {code}
          </label>
            <br />
          </div>
          <div style={{ marginTop: "1vw", marginLeft: "auto", display: "block", textAlign: "center" }}>
          <input type="email" name="email" style={{ width: "85%", height: "3vw", borderRadius: "0.5vw", margin: "auto" }} onChange={(e: any)=> { setEmail(e.target.value) }} />
          <br />
          <br />
            <button type="submit" style={{ width: "85%", height: "3vw", backgroundColor: "#0F6FFFB2", color: "#FFFFFF", borderRadius: "0.5vw", border: "none" }}>Générer un code</button>
          </div>
        </form>
        <button style={{ width: "85%", height: "3vw", backgroundColor: "#0F6FFFB2", color: "#FFFFFF", borderRadius: "0.5vw", border: "none", marginTop: "1vw", marginLeft: "1.8rem", display: "block" }} onClick={() => {
          localStorage.removeItem('USERID')
          navigate('/pro/login')
        }}>Retour</button>
      </Card>
    </div>
  );
}

export default GenerateLinkPro;
