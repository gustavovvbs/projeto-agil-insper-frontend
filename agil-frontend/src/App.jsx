import { useState, useEffect } from 'react'
import {useNavigate, Routes, Route} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  Login  from './components/login/index.jsx'
import Coordenador from './components/coordenador/index.jsx'

function App() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  if (!role) {
    return <Login />
  }

  useEffect(() => {
    if (role === 'coordenador') {
      navigate('/coordenador');
    }
    if (role === 'estudante') {
      navigate('/estudante');
    }
  }, [role, navigate])



  return (
      <div className="App">
        <h3 className="title">Welcome to sciconnect</h3>

        <button onClick={() => navigate('/login')}>Login</button> 

      </div>
  )
}


export default App
