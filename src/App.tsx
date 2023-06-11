import './App.css'
import RegisterPage from './Pages/Register'
import LoginPage from './Pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='*' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
