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
import Estudante from './components/estudante/index.jsx';
import Apply from './components/estudante/Apply.jsx';
import Matchmaking from './components/estudante/Matchmaking.jsx';
import Professor from './components/professor/index.jsx';
import Aplicacoes from './components/professor/Aplicacoes.jsx';

const router = createBrowserRouter([
  {
    path: '/professor',
    element: <Professor />,
  },
  {
    path: '/professor/:projetoId',
    element: <Aplicacoes />,
  },
  {
    path: '/coordenador',
    element: <Coordenador />,
  },
  {
    path: '/coordenador/:processoId',
    element: <ProcessoDetail />,
  },
  {
    path: '/estudante',
    element: <Estudante />
  },
  {
    path: '/projects/:projetoId/apply',
    element: <Apply />

  },
  {
    path: '/matchmaking',
    element: <Matchmaking />

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
  },
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