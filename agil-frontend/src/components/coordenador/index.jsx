// src/components/coordenador/index.jsx

import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Flex, Box, Heading, Spinner, SimpleGrid, Separator, Text} from '@chakra-ui/react';
import { Link, Outlet } from 'react-router-dom';
import ProcessoCard from '../ProcessoCard';
import CreateProcesso from '../CreateProcesso';

export default function Coordenador() {
  const [processos, setProcessos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('role') !== 'coordenador') {
      window.location.href = '/login';
    } else {
      getProcessos();
    }
  }, []);

  const getProcessos = async () => {
    try {
      const response = await axios.get('https://projeto-agil-insper-backend.onrender.com/processo/');
      if (response.status === 200 && Array.isArray(response.data)) {
        setProcessos(response.data);
        console.log('Fetched processos:', response.data);
      } else {
        console.warn('Unexpected response structure:', response.data);
        setProcessos([]);
      }
    } catch (error) {
      console.error('Error fetching processos:', error);
      setProcessos([]);
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
          <Heading size='xs' fontSize={'1x1'}>Coordenador</Heading>
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
          <Heading as="h3" size="md">Processos</Heading>
          <Button
            colorScheme='red'
            variant='solid'
            _hover={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5), 0 -2px 6px rgba(255, 0, 0)" }}
            boxShadow='3px 3px 3px 0px rgba(0, 0, 0, 0.5)'
            onClick={() => setIsCreatingProjeto(true)}
          >
            Criar Processo
          </Button>
        </Flex>
        <Separator my={4}/>

        <SimpleGrid columns={[1, 2, 3]} mt={4} columnGap={8} rowGap={5}>    
            {processos.map((processo) => (
                <ProcessoCard key={processo.id} processo={processo} />
            ))}
        </SimpleGrid>
        <Outlet />
    </Box>
);
}