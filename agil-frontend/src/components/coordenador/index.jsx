// src/components/coordenador/index.jsx

import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Flex, Box, Heading, Spinner, SimpleGrid, Separator} from '@chakra-ui/react';
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
    <Box p={4}>
        <Flex justifyContent="space-between" alignItems="center">
            <Heading fontSize='3xl'>Coordenador</Heading>
            <Button onClick={logout} colorScheme="red">
                Logout
            </Button>
        </Flex>
        <Separator my={6} />
        <Flex justifyContent="space-between" alignItems="center" mt={6} mb={50}>
            <Heading size="6xl">
                Processos
            </Heading>
            <Button as={Link} to="http://localhost:5173/processo" colorScheme="green">
                Criar Processo
            </Button>
        </Flex>
        <SimpleGrid columns={[1, 2, 3]} wordSpacing='inherit' columnGap={10} rowGap={20}>    
            {
            processos.map((processo) => (
                <ProcessoCard key={processo.id} processo={processo} />
            ))}
        </SimpleGrid>
        <Outlet />
    </Box>
);
}