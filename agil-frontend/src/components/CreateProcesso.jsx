import React, { useState } from 'react';
import { Box, Button, Input, Stack, Text} from '@chakra-ui/react';
import { createToaster, Heading} from '@chakra-ui/react';
import axios from 'axios';
import dayjs from 'dayjs';

export default function CreateProcesso() {
  const [titulo, setTitulo] = useState('');
  const [data, setData] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedDate = dayjs(data).format('YYYY-MM-DD');

    const payload = {
      titulo,
      data_encerramento: formattedDate,
    };

    try {
      const response = await axios.post('https://projeto-agil-insper-backend.onrender.com/processo/', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      createToaster({
        title: 'Processo criado!',
        description: `O processo "${titulo}" foi criado com sucesso.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setTitulo('');
      setData('');

    } catch (error) {
      createToaster({
        title: 'Erro ao criar processo',
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
      <Heading as='h1' size='lg' fontSize='3xl' marginLeft='30px' marginTop='20px' position = 'absolute'>
            <Text as="span" color="red.500">Sci</Text>
            <Text as="span" color="white">Connect</Text>
      </Heading>
      <Box as="form"
      onSubmit={handleSubmit}
      p={6}
      maxW="md"
      mx="auto"
      position = 'absolute'
      marginLeft='520px'
      marginTop = '197px'
      bg="black"
      borderRadius='10px'
      width='1000px'
      transform="scale(1.2)"
      boxShadow = "0px 0px 7px rgba(0, 0, 0, 0), 0 -2px 10px rgba(255, 0, 0)"
      >
        <Stack spacing={4} color = 'white'>

          <Text fontSize="3xl" fontWeight="bold" marginLeft='63px'>Criar Novo Processo</Text>

          {/* Título Field */}
          <Box marginTop = '10px'>
            <Text fontWeight="semibold" marginBottom='7px'>Título</Text>
            <Input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              bg = 'white'
              color = 'black'
              placeholder="Digite o título do processo"
              required
            />
          </Box>

          {/* Data Field */}
          <Box marginTop = '20px'>
            <Text fontWeight="semibold" marginBottom='7px'>Data de Encerramento</Text>
            <Input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="YYYY-MM-DD"
              required
              color = 'black'
              bg = 'white'
            />
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isSubmitting}
            loadingText="Enviando Processo..."
            bg = '#28a740'
            marginTop = '16px'
            width='50%'
            marginLeft='100px'
          >
            Criar Processo
          </Button>
        </Stack>
      </Box>
    </Box>
    );
  }
  
