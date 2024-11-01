// src/components/ProjectCard.jsx

import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function ProjectCard({ project, role }) {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate(`/projects/${project.id}/apply`);
  };

  return (
    <Box
      p={6}
      borderRadius="lg"
      boxShadow="lg"
      borderWidth="1px"
      borderColor="rgba(255, 255, 255, 0.1)"
      bgGradient="linear(to-br, gray.800, gray.700)" // Subtle color variation with gradient
      _hover={{
        transform: "scale(1.06)",
        transition: "all 0.2s",
        boxShadow: "2xl",
        borderColor: "rgba(255, 0, 0, 0.4)", // Red accent on hover
      }}
    >
      <VStack spacing={4} align="start">
        <Heading as="h2" size="4xl" color="gray.100" fontWeight="bold">
          {project.titulo || 'Project Title'}
        </Heading>
        <Text color="gray.400">
          <span>Professor: {project.professorName}</span>
          <br />
          <span>Descrição: {project.descricao || 'Description of the project.'}</span>
        </Text>
        {project.topics && project.topics.length > 0 && (
          <HStack spacing={2}>
            {project.topics.map((topic, index) => (
              <Badge
                key={index}
                bg="red.500"
                color="white"
                borderRadius="full"
                px={3} 
                py={1}
              >
                {topic}
              </Badge>
            ))}
          </HStack>
        )}
        {role === 'estudante' && (
          <Button
            onClick={handleApply}
            backdropBlur="3xl"
            bgColor="whiteAlpha.200"
            color="white"
            _hover={{
              bgColor: "whiteAlpha.400",
              transform: "scale(1.05)", // Slightly scale button on hover
              boxShadow: "md", // Soft shadow on hover
            }}
          >
            Aplicar
          </Button>
        )}
        {role === 'coordenador' && (
          <Button
            colorScheme="red"
            onClick={() => navigate(`/projects/${project.id}/edit`)}
            _hover={{
              bgColor: "red.600",
              transform: "scale(1.05)",
            }}
          >
            Detalhes
          </Button>
        )}
      </VStack>
    </Box>
  );
}
