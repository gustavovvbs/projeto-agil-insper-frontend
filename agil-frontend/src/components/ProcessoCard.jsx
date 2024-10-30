// src/components/ProcessoCard.jsx

import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function ProcessoCard({ processo }) {
  return (
    <Link to={`/coordenador/${processo.id}`} style={{ textDecoration: 'none' }}>
      <Box
        width="100%"
        maxHeight={500}
        maxW="500px"
        p={6}
        borderWidth="2px"
        borderRadius="lg"
        height={300}
        backdropOpacity={0.2}
        color="white"
        _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
        transition="all 0.2s"
        textAlign="center"
        bgGradient="linear(to-b, green.400, green.500)"
      >
        <Heading         
        textAlign={'left'}
        size='6xl'>{processo.titulo || 'Processo não nomeado'}</Heading>
      </Box>
    </Link>
  );
}