// src/components/professor/projetos.jsx

import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Flex, Box, Heading, Spinner, SimpleGrid, Separator, Text } from '@chakra-ui/react';
import { Link, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ProjectCard from '../ProjectCard';
import CreateProjetoCoord from '../CreateProjetoCoord';


export default function Professor() {
  const { professorId } = useParams();
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreatingProjeto, setIsCreatingProjeto] = useState(false);

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
  <Box p={8}
  bg="radial-gradient(circle at 50% -105%, #ff0000 10%, #8b0000 30%, #000000 70%)"
  minHeight='100vh'>
      {/* Header */}
      <Flex justifyContent="space-between" alignItems="center" mb={8}>
      <div class='header'>
        <Heading as='h1' size='lg' fontSize='3xl'>
            <Text as="span" color="red">Sci</Text>
            <Text as="span" color="white">Connect</Text>
        </Heading>
        <Heading size='xs' fontSize={'1x1'}>Professor</Heading>
      </div>
        <Button
          colorScheme='red'
          variant='solid'
          onClick={logout}
          _hover={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5), 0 -2px 6px rgba(255, 0, 0)" }}
          boxShadow='3px 3px 3px 0px rgba(0, 0, 0, 0.5)'>
          Logout
        </Button>
      </Flex>
      <Separator my={3} />
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Heading as="h3" size="xl">Meus Projetos</Heading>
        </Flex>
      <Separator my={4}/>
        {isCreatingProjeto && (
            <Box my={4}>
              <CreateProjetoCoord
                processoId={processoId}
                onClose={() => setIsCreatingProjeto(false)}
                refreshProjetos={getProcessoAndProjetos}
              />
            </Box>
        )}
        { <SimpleGrid columns={[1, 2, 3]} mt={4} columnGap={8} rowGap={5} wordSpacing={'inherit'}>    
            {
            projetos.map((projeto) => (
                <ProjectCard key={projeto.id} project={projeto} />
            ))}
        </SimpleGrid> }
        <Outlet />
    </Box>
);
}   