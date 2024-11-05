// src/components/professor/index.jsx

import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Flex, Box, Heading, Spinner, SimpleGrid, Separator} from '@chakra-ui/react';
import { Link, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ProjectCard from '../ProjectCard';


export default function Professor() {
  const { professorId } = useParams();
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('role') !== 'professor') {
      window.location.href = '/login';
    } else {
      getProjetos();
    }
  }, [professorId]);

  const getProjetos = async () => {
    try {
        const projetosResponse = await axios.get(`https://projeto-agil-insper-backend.onrender.com/professor/${professorId}/projeto`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });

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
    } catch (error) {
      console.error('Error fetching projetos:', error);
      setProjetos([]);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

return (
    <Box p={4}>
        <Flex justifyContent="space-between" alignItems="center">
            <Heading fontSize='3xl'>Professor</Heading>
            <Button onClick={logout} colorScheme="red">
                Logout
            </Button>
        </Flex>
        <Separator my={6} />
        <Flex justifyContent="space-between" alignItems="center" mt={6} mb={50}>
            <Heading size="6xl">
                Meus Projetos
            </Heading>
            <Button as={Link} to="create-projeto" colorScheme="green">
                Criar Projeto
            </Button>
        </Flex>
        { <SimpleGrid columns={[1, 2, 3]} wordSpacing='inherit' columnGap={10} rowGap={20}>    
            {
            projetos.map((projeto) => (
                <ProjectCard key={projeto.id} project={projeto} />
            ))}
        </SimpleGrid> }
        <Outlet />
    </Box>
);
}