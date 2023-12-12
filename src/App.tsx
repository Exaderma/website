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
import RecordPatientPro from './Pages/RecordPatientPro'

function App() {

  return (
    <div className="App">
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
          <Route path='/pro/galerie' element={<GalleryPro />} />
          <Route path='/pro/message' element={<MessagePro />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/pro/record' element={<RecordPatientPro />} />
          <Route path='*' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
