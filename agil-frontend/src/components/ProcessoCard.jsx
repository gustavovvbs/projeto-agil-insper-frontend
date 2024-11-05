// src/components/ProcessoCard.jsx

import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function ProcessoCard({ processo }) {
  return (
    <Link to={`/coordenador/${processo.id}`} style={{ textDecoration: 'none' }}>
      <Box
      borderRadius='lg'
      overflow='hidden'
      p={6}
      bg='#171717'
      ml={2}
      mr={2}
      _hover={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5), 0 -5px 6px rgba(255, 0, 0)", transform: "scale(1.06)",
        transition: "all 0.2s",}}
      boxShadow='10px 10px 10px 0 rgba(0, 0, 0, 0.5)'
      backgroundColor="rgba(255, 255, 255, 0.2)" // Light transparent background for each card
    >
        <Heading         
        textAlign={'left'}
        size='2xl'>{processo.titulo || 'Processo não nomeado'}</Heading>
      </Box>
    </Link>
  );
}