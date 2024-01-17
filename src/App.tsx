import './App.css'
import RegisterPage from './Pages/Register'
import LoginPage from './Pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LinkPatient from './Pages/LinkPatient'
import RegisterPagePro from './Pages/RegisterPro'
import LoginPagePro from './Pages/LoginPro'
import GenerateLinkPro from './Pages/GenerateLinkPro'
import HomePatient from './Pages/HomePatient'
import Homepro from './Pages/HomePro'
import Settings from './Pages/Settings'
import ProfilPro from './Pages/ProfilPro'
import GalleryPro from './Pages/GalleryPro'
import MessagePro from './Pages/MessagePro'
import FolderComponent from './components/Folder'
import { createContext, useState } from "react";

export const ThemeContext = createContext("light");

function App() {
  const saveTheme = localStorage.getItem("theme") || "light";
  console.log(saveTheme);
  const [theme] = useState(saveTheme);


  return (
    <ThemeContext.Provider value={theme}>
      <div className="App" style={{ background: theme === "dark" ? "#4e5057" : "#FFFFFF", color: theme === "dark" ? "#FFFFFF" : "#000000" }}>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/pro/login' element={<LoginPagePro />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/pro/register' element={<RegisterPagePro />} />
            <Route path='/home/link' element={<LinkPatient />} />
            <Route path='/pro/generateLink' element={<GenerateLinkPro />} />
            <Route path='/home' element={<HomePatient />} />
            <Route path='/pro/home' element={<Homepro />} />
            <Route path='/pro/profil' element={<ProfilPro />} />
            <Route path='/pro/gallery/*' element={<GalleryPro />} />
            <Route path='/pro/gallery/folder' element={<FolderComponent />} />
            <Route path='/pro/message' element={<MessagePro />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/pro/*' element={<LoginPagePro />} />
            <Route path='/' element={<LoginPage />} />
            <Route path='*' element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
