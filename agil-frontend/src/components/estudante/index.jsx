// src/components/estudante/index.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Flex,
  Spinner,
  IconButton,
  SimpleGrid,
  Separator,
  VStack,
  useBreakpointValue
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiGrid } from 'react-icons/fi';
import ProjectCard from '../ProjectCard';
import axios from 'axios';

export default function Estudante() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('role') !== 'estudante') {
      navigate('/login');
    } else {
      getProjects();
    }
  }, []);

  const getProjects = async () => {
    try {
      const projetosResponse = await axios.get('https://projeto-agil-insper-backend.onrender.com/projeto');
      if (projetosResponse.status === 200 && Array.isArray(projetosResponse.data)) {
        const projetosData = await Promise.all(
            projetosResponse.data.map(async (projeto) => {
                const professorResponse = await axios.get(`https://projeto-agil-insper-backend.onrender.com/professor/${projeto.professor}`);
                return {
                    ...projeto,
                    professorName: professorResponse.data.nome,
                    professorEmail: professorResponse.data.email,
                };
            })
            );
        setProjetos(projetosData);

    } else {
        console.warn('Unexpected response structure:', response.data);
        setProjetos([]);
      }
   
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjetos([]);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('role');
    navigate('/login');
  };

 

  if (loading) {
    return (
      <Flex align='center' justify='center' height='100vh'>
        <Spinner size='xl' />
      </Flex>
    );
  }

  const goToMatchmaking = () => {
    navigate('/matchmaking');
  }

  return (
    <Box
    p={8}
    bg="radial-gradient(circle at 50% -105%, #ff0000 10%, #8b0000 30%, #000000 70%)"
    minHeight='100vh'
    >
      {/* Navbar */}
      <Flex justify='space-between' align='center' mb={8}>
      <div class='header'>
        <Heading as='h1' size='lg' fontSize='3xl'>
            <Text as="span" color="red.500">Sci</Text>
            <Text as="span" color="white">Connect</Text>
        </Heading>
      </div>
        <Flex align='center' gap='12px'>
          <Button
            eftIcon={<FiLogOut />}
            colorScheme='red'
            variant='solid'
            onClick={goToMatchmaking}
            _hover={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5), 0 -2px 6px rgba(255, 0, 0)" }}
            boxShadow='2px 2px 2px 0px rgba(0, 0, 0, 0.5)'
          >
            Matchmaking
          </Button>
          <Button
            leftIcon={<FiLogOut />}
            colorScheme='red'
            variant='solid'
            onClick={logout}
            _hover={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5), 0 -2px 6px rgba(255, 0, 0)" }}
            boxShadow='3px 3px 3px 0px rgba(0, 0, 0, 0.5)'
          >
            Logout
          </Button>
        </Flex>
      </Flex>

      {/* Page Heading */}
      <Heading as='h2' size='4xl' mb={6} textAlign='center'>
        Projetos Disponíveis
      </Heading>
      <br />
      <br />
      {/* Projects List */}
      {projetos.length > 0 ? (
        <SimpleGrid columns={[1, 2, 3]} spacing={6} columnGap={10} rowGap={10}>
          {projetos.map((project) => (
            <ProjectCard key={project.id} project={project} role={localStorage.getItem('role')} />
          ))}
        </SimpleGrid>
      ) : (
        <Text>No projects available at the moment.</Text>
      )}
    </Box>
  );
}