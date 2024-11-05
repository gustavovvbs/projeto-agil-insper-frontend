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
  Flex,
  Separator
} from '@chakra-ui/react';
import { CloseButton } from '../ui/close-button';
import axios from 'axios';
import decodeToken from '../../utils/decodeToken';
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
    navigate('/estudante');
  };

  return (
    <Box fontFamily="Kumbh Sans" color="#fff" bg="radial-gradient(circle at 50% -105%, #ff0000 10%, #8b0000 30%, #000000 70%)" minHeight="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={4}>
      
      <Flex
        position="fixed"
        top={0}
        left={0}
        width="100%"
        p={4}
        bg="rgba(0, 0, 0, 0)"  
        zIndex="1000"

      >
        <Heading as='h1' fontSize='3xl' color="#fff">
          <Text as="span" color="red.500">Sci</Text>
          <Text as="span" color="white">Connect</Text>
        </Heading>
      </Flex>

      <Box
        position="relative"
        bg="rgba(23, 25, 28, 0.6)"
        as="form"
        onSubmit={handleSubmit}
        p={6}
        maxW="65%"
        color="white"
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.5), 0 -5px 6px rgba(255, 0, 0)"
        borderRadius="md"
        

      >
        <Flex justify="space-between" align="center" mb={4}>
          <Heading as="h1" size="lg" color="white" fontWeight="bold" fontSize={'30px'}>
            Detalhes do Projeto
          </Heading>
          <CloseButton color="white" onClick={handleClose} _hover={{ bg: "#FFFFF", color: '#000000' }}/>
        </Flex>
        <Grid templateColumns={['1fr', null, '1fr 1fr']} gap={6}>
          <GridItem>
            <Stack spacing={4}>
              <Box>
                <Heading as="h3" size="md" fontSize={'20px'}>Título do Projeto:</Heading>
                <Text fontSize={'15px'}>{projeto?.titulo}</Text>
              </Box>
              <Separator my={1} />
              <Box>
                <Heading as="h3" size="md" fontSize={'20px'}>Nome do Professor:</Heading>
                <Text fontSize={'15px'}>{projeto?.professorName}</Text>
              </Box>
              <Separator my={1} />
              <Box>
                <Heading as="h3" size="md" fontSize={'20px'}>Descrição do Projeto:</Heading>
                <Text fontSize={'15px'}>{projeto?.descricao}</Text>
              </Box>
            </Stack>
          </GridItem>
          <GridItem>
            <Stack spacing={4}>
              <Heading as="h2" size="md">Enviar Aplicação</Heading>
              <Input
                type="file"
                onChange={handleFileChange}
                accept=".pdf"
                required
                paddingTop={'6px'}
              />
              <Input
                placeholder="Link do Currículo Lattes"
                _placeholder={{ color: "#787878" }}
                type="url"
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
    </Box>
  );
}
