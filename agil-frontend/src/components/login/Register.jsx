import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Flex,
  Button,
  Heading,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { createListCollection } from '@chakra-ui/react';
import {
  SelectRoot,
  SelectLabel,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
} from '../ui/select';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="radial-gradient(circle at 50% -105%, #ff0000 10%, #8b0000 30%, #000000 70%)">
      
      <Box position="fixed" top={0} left={0} p={4} bg="rgba(0, 0, 0, 0)">
        <Heading as="h1" size="lg" fontSize="3xl"  marginLeft='20px' marginTop='10px' color="white">
          <Text as="span" color="red.500">Sci</Text>
          <Text as="span" color="white">Connect</Text>
        </Heading>
      </Box>

      <Box
        p={6}
        bg="rgba(0, 0, 0, 0.6)"
        borderRadius="lg"
        borderWidth="1px"
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.5), 0 -5px 6px rgba(255, 0, 0)"
        borderColor="rgba(255, 255, 255, 0.1)"
        minWidth="30%"
        color="white"
        >
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          Registro
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
                color="black"
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
                color="black"
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
                color="black"
                _placeholder={{ color: 'gray.500' }}
              />
            </Box>

            <Box>
              <SelectRoot
                collection={roles}
                value={role}
                onValueChange={(selected) => {
                  console.log('SelectRoot onValueChange called with:', selected);
                  if (selected.value && selected.value.length > 0) {
                    setRole(selected.value[0]);
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
                    <SelectItem key={item.value} value={item.value} item={item} color="black" _hover={{ boxShadow: '#000000' }}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Box>

            {role === 'estudante' && (
              <>
                <Box>
                  <Input
                    name="curso"
                    placeholder="Curso"
                    bg="white"
                    color="black"
                    _placeholder={{ color: 'gray.500' }}
                  />
                </Box>
                <Box>
                  <Input
                    name="semestre"
                    placeholder="Semestre"
                    bg="white"
                    color="black"
                    _placeholder={{ color: 'gray.500' }}
                  />
                </Box>
              </>
            )}

            {role === 'professor' && (
              <>
                <Box>
                  <Input
                    name="area_pesquisa"
                    placeholder="Área de Pesquisa"
                    bg="white"
                    color="black"
                    _placeholder={{ color: 'gray.500' }}
                  />
                </Box>
                <Box>
                  <Input
                    name="descricao"
                    placeholder="Descrição"
                    color="black"
                    bg="white"
                    _placeholder={{ color: 'gray.500' }}
                  />
                </Box>
              </>
            )}

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

            {loading && (
                <Flex
                    position="fixed"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    alignItems="center"
                    borderRadius="16px"
                    justifyContent="center"
                    bg="rgba(0, 0, 0, 0.6)"
                    zIndex="1000"
                >
                    <Spinner color="white" size="xl" />
                </Flex>
            )}
          </Flex>
        </form>
      </Box>
    </Box>
  );
}
