import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Coordenador from './components/coordenador/index.jsx'
import Login from './components/login/index.jsx'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/coordenador',
    element: <Coordenador />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <App />
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
