import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from "@chakra-ui/core";
import { ChakraProvider, Theme} from '@chakra-ui/react'
import Coordenador from './components/coordenador/index.jsx'
import Login from './components/login/index.jsx'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { defaultSystem } from '@chakra-ui/react';
import ProcessoDetail from './components/coordenador/ProcessoDetail.jsx'
import CreateProcesso from './components/CreateProcesso.jsx';

const router = createBrowserRouter([
  {
    path: '/coordenador',
    element: <Coordenador />,
  },
  {
    path: '/coordenador/:processoId',
    element: <ProcessoDetail />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/coordenador/create-processo',
    element: <CreateProcesso />
  },
  {
    path: '/',
    element: <App />
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ChakraProvider>
  </StrictMode>
)