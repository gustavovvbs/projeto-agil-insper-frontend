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
      bg="rgba(0, 0, 0, 0.8)" // Dark overlay background
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="1000"
    >
      <Box
        bg="rgba(255, 255, 255, 0.1)" // Glass background
        borderRadius="lg"
        p={10}
        position="relative"
        boxShadow="0 4px 10px rgba(0, 0, 0, 0.6)"
        maxWidth="800px"
        maxHeight="90vh"
        width="100%"
        overflowY="auto"
        border="1px solid rgba(255, 255, 255, 0.2)"
        backdropFilter="blur(20px)" // Frosted glass effect
      >
        {children}
      </Box>
    </Box>
  );
}