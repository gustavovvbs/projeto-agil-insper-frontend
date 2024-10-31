// src/components/Overlay.jsx

import React from 'react';
import { Box } from '@chakra-ui/react';

export default function Overlay({ children, onClose }) {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      bg="blackAlpha.600"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="1000"
    >
      <Box
        bg="white"
        borderRadius="md"
        p={10}
        position="relative"
        boxShadow="lg"
        maxWidth="800px"
        maxHeight="900px"
        width="200%"
      >
        {children}
      </Box>
    </Box>
  );
}