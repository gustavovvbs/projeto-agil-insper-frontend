import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Spinner,
  SimpleGrid,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
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

  const openOtherPage = () => {
    navigate('/matchmaking');
  };

  if (loading) {
    return (
      <Flex align='center' justify='center' height='100vh'>
        <Spinner size='xl' />
      </Flex>
    );
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      p={8}
      borderRadius="xl"
      // backgroundColor="rgba(220, 220, 220, 0.1)" // Light transparent background for frosted effect
      backdropFilter="blur(15px)" // Blur effect for frosted glass
      boxShadow="lg" // Adds a soft shadow
      m="auto"
      size='full'
    >
      {/* Navbar */}
<Flex
  justify='space-between'
  align='center'
  mb={8}
  px={6}
  py={4}

  borderRadius="md" // Rounded corners
  boxShadow="lg" // Soft shadow for depth
>
  <Heading as='h1' size='4xl' color="white">
    SciConnect
  </Heading>
  <Flex align='center'>
    <Button
      colorScheme='red'
      variant='solid'
      onClick={openOtherPage}
      leftIcon={<FiLogOut />}
      ml={4}
      size="lg" // Slightly larger buttons to match the header's importance
      _hover={{ bg: 'red.600' }} // Darker red on hover
    >
      Matchmaking
    </Button>
    <Button
      leftIcon={<FiLogOut />}
      colorScheme='red'
      variant='solid'
      onClick={logout}
      ml={4}
      size="lg"
      _hover={{ bg: 'red.600' }} // Darker red on hover
    >
      Logout
    </Button>
  </Flex>
</Flex>
      
      {/* Page Heading */}
      <Heading as='h2' size='5xl' mb={12} mt={5} textAlign='center' color="gray.100" fontWeight={'bold'}>
        Projetos Disponíveis
      </Heading>

      {/* Projects List */}
      {projetos.length > 0 ? (
        <SimpleGrid columns={[1, 2, 3]} spacing={6} columnGap={10} rowGap={10}>
          {projetos.map((project) => (
            <ProjectCard key={project.id} project={project} role={localStorage.getItem('role')} />
          ))}
        </SimpleGrid>
      ) : (
        <Text color="gray.300" fontSize="xl" textAlign="center">
          No projects available at the moment.
        </Text>
      )}
    </Box>
  );
}
