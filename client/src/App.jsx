import './App.css'
import Dashbord from './pages/Dashbord'
import Profile from './pages/Profile'
import Register from './pages/auth/Register'
import Login from './pages/auth/login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashbord />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
