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
      const projetoResponse = await axios.get(`http://127.0.0.1:5000/projeto/${projetoId}`);
      if (projetoResponse.status === 200) {
        const professorResponse = await axios.get(`http://127.0.0.1:5000/professor/${projetoResponse.data.professor}`);
        projetoResponse.data.professorName = professorResponse.data.nome;
        setProjeto(projetoResponse.data);
      } else {
        setSuccessMessage('Projeto não encontrado.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao carregar projeto.';
      setSuccessMessage(errorMessage);
    }
  };

  const getStudent = async (estudanteId) => {
    try {
      const studentResponse = await axios.get(`http://127.0.0.1:5000/estudante/${estudanteId}`);
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
      const data = await axios.post('http://127.0.0.1:5000/aplicacao/', formData, {
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
        color="white"
        onClick={handleClose}
      />
      <Box
        as="form"
        onSubmit={handleSubmit}
        p={6}
        maxW="800px"
        mx="auto"
        color="black"
        boxShadow="md"
        borderRadius="md"
      >
        <Grid templateColumns={['1fr', null, '1fr 1fr']} gap={6}>
          {/* Left Column */}
          <GridItem>
            <Stack spacing={4}>
              <Heading as="h2" size="lg">Detalhes do Projeto</Heading>
              <Box>
                <Text fontWeight="bold">Título do Projeto:</Text>
                <Text>{projeto?.titulo}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Professor Responsável:</Text>
                <Text>{projeto?.professorName}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Descrição:</Text>
                <Text>{projeto?.descricao}</Text>
              </Box>
            </Stack>
          </GridItem>
          {/* Right Column */}
          <GridItem>
            <Stack spacing={4}>
              <Heading as="h2" size="lg">Enviar Aplicação</Heading>
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
            </Stack>
          </GridItem>
        </Grid>
      </Box>
    </Overlay>
  );
}