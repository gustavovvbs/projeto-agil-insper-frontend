// Navbar.jsx
import React from 'react';
import { Flex, Heading, Button } from '@chakra-ui/react';

export default function Navbar() {
  return (
    <Flex
      bg="#17191C"
      color="#FFFFFF"
      px="32px" /* 8 * 4px */
      py="16px" /* 4 * 4px */
      align="center"
      justify="space-between"
      position="fixed"
      top="0"
      width="100%"
      zIndex="1000"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
    >
      <Heading size="md" fontFamily="Kumbh Sans" fontWeight="700">
        SciConnect
      </Heading>
      <Button
        onClick={() => window.location.href='/estudante'}
        bg="#0E9C8B"
        color="#FFFFFF"
        fontFamily="Kumbh Sans"
        fontWeight="500"
        borderRadius="8px"
        _hover={{ bg: '#4C4F54' }}
        boxShadow="0 0 10px #690DDD"
      >
        Ver Projetos
      </Button>
    </Flex>
  );
}