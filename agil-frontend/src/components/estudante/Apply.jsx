import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  VStack,
  Input,
  Text,
  Heading,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import { CloseButton } from '../ui/close-button';
import {
  FileInput,
  FileUploadClearTrigger,
  FileUploadLabel,
  FileUploadRoot
} from '../ui/file-button';
import axios from 'axios';
import decodeToken from '../../utils/decodeToken';
import { useParams, useNavigate } from 'react-router-dom';

export default function Apply() {
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
    } else {
      navigate('/login');
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
      const errorMessage = err.response?.data?.message || 'Erro ao carregar projeto.';
      setSuccessMessage(errorMessage);
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
      if (data.status === 200 || data.status === 201) {
        setSuccessMessage('Sua aplicação foi enviada com sucesso.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message;
      setSuccessMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate('/estudante');
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      mx="auto"
      p={8}
      mt={10}
      color="white"
      bg="rgba(255, 255, 255, 0.1)" // Translucent background
      boxShadow="lg"
      borderRadius="lg"
      border="1px solid rgba(255, 255, 255, 0.2)"
      backdropFilter="blur(15px)"
    >
      <CloseButton
        position="absolute"
        top="2"
        right="2"
        color="white"
        onClick={handleClose}
      />

      <Flex
        align="center"
        justify="space-between"
        p="4"
        borderBottom="1px solid rgba(255, 255, 255, 0.2)"
        mb="8"
      >
        <Heading as="h2" size="lg" color="white">Sciconnet</Heading>
        <Flex gap="4">
          <Button variant="ghost" color="white" onClick={() => navigate('/matchmaking')}>Matchmaking</Button>
          <Button variant="ghost" color="white" onClick={() => navigate('/logout')}>Logout</Button>
        </Flex>
      </Flex>

      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Heading as="h2" size="md" color="gray.300">Detalhes do Projeto</Heading>
          <Text color="white" mt={2}><strong>Título do Projeto:</strong> {projeto?.titulo}</Text>
          <Text color="white" mt={2}><strong>Professor Responsável:</strong> {projeto?.professorName}</Text>
          <Text color="white" mt={2}><strong>Descrição:</strong> {projeto?.descricao}</Text>
        </Box>

        <Box textAlign="center" pt={4} borderTop="1px solid rgba(255, 255, 255, 0.2)">
          <Heading as="h2" size="md" color="gray.300">Enviar Aplicação</Heading>
          <Input
            type="file"
            onChange={handleFileChange}
            accept=".pdf"
            mt={3}
            bg="rgba(255, 255, 255, 0.1)"
            color="white"
            _hover={{ borderColor: "gray.300" }}
          />
          <Input
            placeholder="Link do Currículo Lattes"
            type="url"
            value={estudanteLattes}
            onChange={(e) => setEstudanteLattes(e.target.value)}
            mt={4}
            bg="rgba(255, 255, 255, 0.1)"
            color="white"
            _hover={{ borderColor: "gray.300" }}
          />
          <Button
            mt={6}
            colorScheme="gray"
            isLoading={loading}
            type="submit"
            _hover={{
              bg: 'gray.500',
            }}
          >
            Enviar
          </Button>
          {loading && <Spinner size="lg" mt={4} color="gray.300" />}
          {successMessage && (
            <Box mt={4} p={3} bg="rgba(76, 175, 80, 0.2)" borderRadius="md">
              <Text color="white">{successMessage}</Text>
            </Box>
          )}
        </Box>
      </VStack>
    </Box>
  );
}
