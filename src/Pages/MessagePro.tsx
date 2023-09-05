import Navbar from "../components/NavbarPro";
import "../App.css"
import Profil from "../assets/profil.svg"

function MessagePro() {
    return (
        <div style={{display: "flex", flexDirection: "row", width: "100%", height: "100%", padding: "0", margin: "0"}}>
            <Navbar />
            <div style={{display: "flex", flexDirection: "column", width: "80%"}}>
                <div style={{display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>
                    <h1 style = {{color: "#000000", fontSize: "4rem", paddingLeft: "10%"}}>
                    Messages
                    </h1>
                </div>
                <div style={{display: "flex", flexDirection: "row", width: "70%", height: "100%", marginLeft: "auto", marginRight: "auto"}}></div>
            </div>
        </div>
    );
}

export default MessagePro;