import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Input,
  Stack,
  Text,
  Heading,
  Spinner,
} from '@chakra-ui/react';
import { CloseButton } from '../ui/close-button';
import axios from 'axios';
import decodeToken from '../../utils/decodeToken';
import Overlay from '../Overlay';
import { useParams, useNavigate } from 'react-router-dom';

export default function Apply({ onClose }) {
  const [projeto, setProjeto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [estudanteLattes, setEstudanteLattes] = useState('');
  const [estudanteData, setEstudanteData] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const { projetoId } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchProjeto();
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decodeToken(token);
      const estudanteId = decoded.user_id;
      getStudent(estudanteId);
    }
  }, []);



  const fetchProjeto = async () => {
    try {
      const projetoResponse = await axios.get(`https://projeto-agil-insper-backend.onrender.com/projeto/${projetoId}`);
      if (projetoResponse.status === 200) {
        const professorResponse = await axios.get(`https://projeto-agil-insper-backend.onrender.com/professor/${projetoResponse.data.professor}`);
        projetoResponse.data.professorName = professorResponse.data.nome;
        setProjeto(projetoResponse.data);
      } else {
        setSuccessMessage('Projeto não encontrado.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao carregar projeto';
      setSuccessMessage(errorMessage);
      setErrorMessage(errorMessage);
    }
  };

  const getStudent = async (estudanteId) => {
    try {
      const studentResponse = await axios.get(`https://projeto-agil-insper-backend.onrender.com/estudante/${estudanteId}`);
      if (studentResponse.status === 200) {
        setEstudanteData(studentResponse.data);
      } else {
        setSuccessMessage('Estudante não encontrado.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao carregar dados do estudante.';
      setSuccessMessage(errorMessage);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      setFile(null);
      setSuccessMessage('Por favor, selecione um arquivo para enviar sua aplicação.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setSuccessMessage('Selecione um arquivo para enviar.');
      return;
    }
  
    const formData = new FormData();
    formData.append('aplicacao_pdf', file);
    formData.append('projeto', projetoId);
    if (estudanteData && estudanteData.id) {
      formData.append('estudante', estudanteData.id);
    }
    formData.append('estudante_lattes', estudanteLattes);
    formData.append('processo_seletivo', projeto.processo_seletivo);

    try {
      setLoading(true);
      const data = await axios.post('https://projeto-agil-insper-backend.onrender.com/aplicacao/', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(data);
      if (data.status === 200 || data.status === 201){
        setSuccessMessage('Sua aplicação foi enviada com sucesso.');
      }
    } catch (err) {
        console.log(err)
      const errorMessage = err.response?.data?.message;
      setSuccessMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate('/estudante'); // Navigate to '/estudante' when closing the overlay
  };

  return (
    <Overlay onClose={handleClose}>
      <CloseButton
        position="absolute"
        top="2"
        right="2"
        color="black"
        onClick={handleClose}
      />
      <Heading as='h1' size='lg' fontSize='3xl' marginLeft='-360px' marginTop='-90px' position = 'absolute'>
            <Text as="span" color="red.500">Sci</Text>
            <Text as="span" color="white">Connect</Text>
      </Heading>
      <Box
        as="form"
        onSubmit={handleSubmit}
        p={10}
        maxW="800px"
        mx='-10'
        my='12'
        color="red.700"
        boxShadow='md'
        boxShadowColor='red.200'
        borderRadius="md"
        bg="gray.500"
      >
        <Heading as='h1' size='3xl' color='black.500' marginBottom = '40px' fontWeight="bold">
          Detalhes do Projeto
        </Heading>
        <Grid templateColumns={['1fr', null, '1fr 1fr']} gap={6}>
          {/* Left Column */}
          <GridItem>
            <Stack spacing={4}>
              <Box>
                <Heading as="h3" size="xl">Título do Projeto:</Heading>
                <Text>{projeto?.titulo}</Text>
              </Box>
              <Box>
              <Heading as="h3" size="xl">Nome do Professor: </Heading>
                <Text>{projeto?.professorName}</Text>
              </Box>
              <Box>
              <Heading as="h3" size="xl">Descrição do Projeto:</Heading>
                <Text>{projeto?.descricao}</Text>
              </Box>
            </Stack>
          </GridItem>
          {/* Right Column */}
          <GridItem>
            <Stack spacing={4}>
              <Heading as="h2" size="2xl">Enviar Aplicação</Heading>
              <Input
                type="file"
                onChange={handleFileChange}
                accept=".pdf"
                required
              />
              <Input
                placeholder="Link do Currículo Lattes"
                type='url'
                value={estudanteLattes}
                onChange={(e) => setEstudanteLattes(e.target.value)}
                required 
              />
              <Button
                mt={4}
                colorScheme="blue"
                isLoading={loading}
                type="submit"
              >
              Enviar
              </Button>
              {loading && <Spinner size="lg" mt={4} />}
              {successMessage && (
                <Box mt={4} p={3} bg="green.100" borderRadius="md">
                  <Text color="green.800">{successMessage}</Text>
                </Box>
              )}
              {errorMessage && (
                <Box mt={4} p={3} bg="red.100" borderRadius="md">
                  <Text color="red.800">{errorMessage}</Text>
                </Box>
              )}
            </Stack>
          </GridItem>
        </Grid>
      </Box>
    </Overlay>
  );
}
