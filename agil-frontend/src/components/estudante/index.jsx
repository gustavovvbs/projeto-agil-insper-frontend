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
      const projetosResponse = await axios.get('http://127.0.0.1:5000/projeto');
      if (projetosResponse.status === 200 && Array.isArray(projetosResponse.data)) {
        const projetosData = await Promise.all(
            projetosResponse.data.map(async (projeto) => {
                const professorResponse = await axios.get(`http://127.0.0.1:5000/professor/${projeto.professor}`);
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

  const openOtherPage = () => {
    navigate('/other-page');
  };

  if (loading) {
    return (
      <Flex align='center' justify='center' height='100vh'>
        <Spinner size='xl' />
      </Flex>
    );
  }

  return (
    <Box p={8}>
      {/* Navbar */}
      <Flex justify='space-between' align='center' mb={8}>
        <Heading as='h1' size='lg' color='green.500'>
          SciConnect
        </Heading>
        <Flex align='center'>
          <IconButton
            icon={<FiGrid />}
            variant='ghost'
            aria-label='Other Page'
            onClick={openOtherPage}
            mr={4}
          />
          <Button
            leftIcon={<FiLogOut />}
            colorScheme='red'
            variant='solid'
            onClick={logout}
          >
            Logout
          </Button>
        </Flex>
      </Flex>

      {/* Page Heading */}
      <Heading as='h2' size='6xl' mb={6} textAlign='left'>
        Projetos Disponíveis
      </Heading>
      <Separator mb={6} />

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