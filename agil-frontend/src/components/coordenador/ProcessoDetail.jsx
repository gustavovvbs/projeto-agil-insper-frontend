// src/components/coordenador/ProcessoDetail.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Spinner,
  Text,
  SimpleGrid,
  Flex,
  Button,
  Separator,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProjectCard from '../ProjectCard';
import CreateProjetoCoord from '../CreateProjetoCoord';

export default function ProcessoDetail() {
  const { processoId } = useParams();
  const [projetos, setProjetos] = useState([]);
  const [processoName, setProcessoName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreatingProjeto, setIsCreatingProjeto] = useState(false);

  useEffect(() => {
    getProcessoAndProjetos();
  }, [processoId]);

  const getProcessoAndProjetos = async () => {
    try {
      const processoResponse = await axios.get(`http://127.0.0.1:5000/processo/${processoId}`);
      setProcessoName(processoResponse.data.titulo || 'Processo não nomeado');

      const projetosResponse = await axios.get(`http://127.0.0.1:5000/projeto/processo/${processoId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
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
    } catch (err) {
      return (
        <>
          <Text 
          md={'bold'}
          mt={4}>Nenhum projeto encontrado para este processo.</Text>
    
          <Flex justifyContent="space-between" alignItems="center" mb={8}>
            <Heading as="h1" size="lg">Coordenador</Heading>
            <Button colorScheme="red" variant="outline" onClick={logout}>
              Logout
            </Button>
          </Flex>
    
          <Box mb={4}>
            <Heading as="h2" size="lg" textAlign="left">
              Processo Seletivo: {processoName || 'Processo sem Título'}
            </Heading>
            <Separator my={4} />
          </Box>
    
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Heading as="h3" size="md">Projetos</Heading>
            <Button
              colorScheme="green"
              variant="solid"
              onClick={() => setIsCreatingProjeto(true)}
            >
              Criar Projeto
            </Button>
          </Flex>
    
          {isCreatingProjeto && (
            <Box my={4}>
              <CreateProjetoCoord
                processoId={processoId}
                onClose={() => setIsCreatingProjeto(false)}
                refreshProjetos={getProcessoAndProjetos}
              />
            </Box>
          )}
        </>
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
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

  if (error) {
    return (
      <Box p={4}>
        <Text color="red.500">Erro: {error}</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      {/* Header */}
      <Flex justifyContent="space-between" alignItems="center" mb={8}>
        <Heading as="h1" size="lg">Coordenador</Heading>
        <Button colorScheme="red" variant="outline" onClick={logout}>
          Logout
        </Button>
      </Flex>

      {/* Process Name and Divider */}
      <Box mb={4}>
        <Heading as="h2" size="lg" textAlign="left">
          Processo Seletivo: {processoName}
        </Heading>
        <Separator my={4} />
      </Box>

      {/* Project Section */}
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h3" size="md">Projetos</Heading>
        <Button
          colorScheme="green"
          variant="solid"
          onClick={() => setIsCreatingProjeto(true)}
        >
          Criar Projeto
        </Button>
      </Flex>
      <Separator />

      {/* Create Projeto Form */}
      {isCreatingProjeto && (
        <Box my={4}>
          <CreateProjetoCoord
            processoId={processoId}
            onClose={() => setIsCreatingProjeto(false)}
            refreshProjetos={getProcessoAndProjetos}
          />
        </Box>
      )}

      {/* Project Cards */}
      {projetos.length > 0 ? (
        <SimpleGrid columns={[1, 2, 3]} spacing={3} mt={4} rowGap={10}>
          {projetos.map((projeto) => (
            <ProjectCard key={projeto.id} project={projeto} />
          ))}
        </SimpleGrid>
      ) : (
        <Text mt={4}>Nenhum projeto encontrado para este processo.</Text>
      )}
    </Box>
  );
}