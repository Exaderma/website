import Navbar from "../components/NavbarPro";
import "../App.css"
import Profil from "../assets/profil.svg"

function Homepro() {
  return (
      <div style={{display: "flex", flexDirection: "row", width: "100%", height: "100%", padding: "0", margin: "0"}}>
        <Navbar />
        <h1 style = {{color: "#000000", fontSize: "4rem", paddingLeft: "20%"}}>
          Contacter votre patient
        </h1>
        <img src={Profil} alt="profil" style={{width: "7%", height: "17%", marginLeft: "auto", marginRight: "2%", display: "block", marginTop: "2%"}} />
    </div>
  );
}

export default Homepro;