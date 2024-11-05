import React, { useState } from 'react';
import { Box, Button, Input, Stack, Text, Heading } from '@chakra-ui/react';
import { createToaster } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CloseButton } from '../ui/close-button';

export default function RecuperarSenha() {
  const [email, setemail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/login'); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      email
    };

    try {
      const response = await axios.post('https://projeto-agil-insper-backend.onrender.com/auth/login', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      createToaster({
        title: 'Recuperação de senha aceita!',
        description: `Foi enviada uma mensagem para o "${email}" para recuperar sua senha`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setemail('');
    } catch (error) {
      createToaster({
        title: 'Erro ao recuperar senha',
        description: error.response?.data?.message || 'Erro desconhecido',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      bg="radial-gradient(circle at 50% -105%, #ff0000 10%, #8b0000 30%, #000000 70%)"
      minHeight="100vh"
    >
      <Heading as='h1' size='lg' fontSize='3xl' marginLeft='30px' marginTop='20px' position='absolute'>
        <Text as="span" color="red.500">Sci</Text>
        <Text as="span" color="white">Connect</Text>
      </Heading>
      <Box
        as="form"
        onSubmit={handleSubmit}
        p={6}
        maxW="md"
        mx="auto"
        position='absolute'
        marginLeft='520px'
        marginTop='197px'
        bg="black"
        borderRadius='10px'
        width='1000px'
        transform="scale(1.2)"
        boxShadow="0px 0px 7px rgba(0, 0, 0, 0), 0 -2px 10px rgba(255, 0, 0)"
      >
        
        <CloseButton color="white" onClick={handleClose} _hover={{ bg: "#FFFFF", color: '#000000' }}
        position='absolute' marginLeft = '370px' marginTop='-17px' transform="scale(0.9)" />
        
        <Stack spacing={4} color='white'>
          <Text fontSize="3xl" fontWeight="bold" marginLeft='47px' marginTop = '17px' >Recuperação de Senha</Text>
          <Box marginTop='10px'>
            <Text fontWeight="semibold" marginBottom='7px'>Email</Text>
            <Input
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              bg='white'
              color='black'
              placeholder="Digite seu email aqui"
              required
            />
          </Box>
        
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isSubmitting}
            loadingText="Enviando Mensagem..."
            bg='#28a740'
            marginTop='16px'
            width='50%'
            marginLeft='100px'
          >
            Enviar
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
