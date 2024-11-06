// src/components/Register.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Flex,
  Button,
  Heading,
  Input,
Spinner
} from '@chakra-ui/react';
import { createListCollection } from '@chakra-ui/react'; // Ensure this is correctly implemented
import {
  SelectRoot,
  SelectLabel,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
} from '../ui/select'; // Ensure the path and components are correct
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Debugging: Log role changes
  useEffect(() => {
    console.log('Selected role:', role);
  }, [role]);

  const handleRegister = (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const email = event.target.email.value;
    const password = event.target.password.value;
    const nome = event.target.nome.value;

    const curso = event.target.curso ? event.target.curso.value : '';
    const semestre = event.target.semestre ? event.target.semestre.value : '';
    const area_pesquisa = event.target.area_pesquisa
      ? event.target.area_pesquisa.value
      : '';
    const descricao = event.target.descricao ? event.target.descricao.value : '';

    axios
      .post('https://projeto-agil-insper-backend.onrender.com/auth/register', {
        email,
        password,
        role,
        nome,
        curso,
        semestre,
        area_pesquisa,
        descricao,
      })
      .then((response) => {
        if (response.status === 201) {
          navigate('/login');
        } else {
          setLoading(false);
          setErrorMessage('Registro falhou. Tente novamente.');
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else {
          console.error(error);
          setErrorMessage('Erro desconhecido');
        }
      });
  };

  const roles = createListCollection({
    items: [
      { label: 'Estudante', value: 'estudante' },
      { label: 'Professor', value: 'professor' },
      { label: 'Coordenador', value: 'coordenador' },
    ],
  });

  return (
    <Box
      p={6}
      borderRadius="lg"
      boxShadow="lg"
      borderWidth="1px"
      borderColor="rgba(255, 255, 255, 0.1)"
      bgGradient="linear(to-br, gray.800, gray.700)"
      maxWidth="500px"
      margin="0 auto"
      mt={8}
    >
      <Heading as="h2" size="lg" color="gray.100" textAlign="center" mb={6}>
        Register
      </Heading>
      {errorMessage && (
        <Box bg="red.500" color="white" p={2} mb={4} borderRadius="md">
          {errorMessage}
        </Box>
      )}
      <form onSubmit={handleRegister}>
        <Flex direction="column" gap={4}>
          <Box>
            <Input
              name="nome"
              placeholder="Seu nome completo"
              required
              bg="white"
                color={'black'}
              _placeholder={{ color: 'gray.500' }}
            />
          </Box>

          <Box>
            <Input
              type="email"
              name="email"
              placeholder="Seu email"
              required
              bg="white"
                color={'black'}
              _placeholder={{ color: 'gray.500' }}
            />
          </Box>

          <Box>
            <Input
              type="password"
              name="password"
              placeholder="Senha"
              required
              bg="white"
              color={'black'}
              _placeholder={{ color: 'gray.500' }}
            />
          </Box>

          <Box>
            <SelectRoot
              collection={roles}
              value={role}
              onValueChange={(selected) => {
                console.log('SelectRoot onValueChange called with:', selected); // Debugging
                if (selected.value && selected.value.length > 0) {
                  setRole(selected.value[0]); // Extract the first value
                } else {
                  setRole('');
                }
              }}
              size="sm"
              width="100%"
            >
              <SelectLabel>Selecione o role</SelectLabel>
              <SelectTrigger>
                <SelectValueText placeholder="Selecione o role" />
              </SelectTrigger>
              <SelectContent>
                {roles.items.map((item) => (
                  <SelectItem key={item.value} value={item.value} item={item}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </Box>

          {role === 'estudante' && (
            <>
              {console.log('Rendering estudante fields')} {/* Debugging */}
              <Box>
                <Input
                  name="curso"
                  placeholder="Curso"
                  bg="white"
                color={'black'}
                  _placeholder={{ color: 'gray.500' }}
                />
              </Box>
              <Box>
                <Input
                  name="semestre"
                  placeholder="Semestre"
                  bg="white"
                  color={'black'}
                  _placeholder={{ color: 'gray.500' }}
                />
              </Box>
            </>
          )}

          {role === 'professor' && (
            <>
              {console.log('Rendering professor fields')} {/* Debugging */}
              <Box>
                <Input
                  name="area_pesquisa"
                  placeholder="Área de Pesquisa"
                  bg="white"
                  color={'black'}
                  _placeholder={{ color: 'gray.500' }}
                />
              </Box>
              <Box>
                <Input
                  name="descricao"
                  placeholder="Descrição"
                  color={'black'}
                  bg="white"
                  _placeholder={{ color: 'gray.500' }}
                />
              </Box>
            </>
          )}

          {/* If you have specific fields for 'coordenador', add them here */}

          <Button
            type="submit"
            colorScheme="red"
            width="full"
            isLoading={loading}
            mt={4}
            _hover={{
              boxShadow:
                '0px 0px 10px rgba(0, 0, 0, 0.5), 0 -1px 13px rgba(255, 0, 0)',
              transform: 'scale(1.02)',
              transition: 'all 0.2s',
            }}
          >
            Registrar
          </Button>
          {loading && (<Spinner color="white" size="lg" mt={4} />)}
        </Flex>
      </form>
    </Box>
  );
}
