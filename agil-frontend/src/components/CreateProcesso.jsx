import React, { useState } from 'react';
import { Box, Button, Input, Stack, Text} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { createToaster } from '@chakra-ui/react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link, useHref } from 'react-router-dom';

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
      const response = await axios.post('http://127.0.0.1:5000/processo/', payload, {
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
    <Box as="form" onSubmit={handleSubmit} p={6} maxW="md" mx="auto">
      <Stack spacing={4}>
        <Text fontSize="xl" fontWeight="bold">Criar Novo Processo</Text>

        {/* Título Field */}
        <Box>
          <Text fontWeight="semibold">Título</Text>
          <Input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Digite o título do processo"
            required
          />
        </Box>

        {/* Data Field */}
        <Box>
          <Text fontWeight="semibold">Data de Encerramento</Text>
          <Input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="YYYY-MM-DD"
            required
          />
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isSubmitting}
          loadingText="Enviando"
        >
          Criar Processo
        </Button>
      </Stack>
    </Box>
  );
}
