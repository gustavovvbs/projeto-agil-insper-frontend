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
      backgroundColor="rgba(255, 255, 255, 0.08)" // Light transparent background for each card
      backdropFilter="blur(10px)" // Frosted glass effect
      boxShadow="md"
      _hover={{
        transform: "scale(1.06)",
        transition: "all 0.2s",
        boxShadow: "2xl",
        borderColor: "rgba(255, 0, 0, 0.4)", // Red accent on hover
      }}
    >
      <VStack spacing={4} align="start">
        <Heading as="h2" size='4xl' color="gray.100" fontWeight="bold">
          {project.titulo || 'Project Title'}
        </Heading>
        <Text color="gray.300">
          <span>Professor: {project.professorName}</span>
          <br />
          <span>Descrição: {project.descricao || 'Description of the project.'}</span>
        </Text>
        {project.topics && project.topics.length > 0 && (
          <HStack spacing={2}>
            {project.topics.map((topic, index) => (
              <Badge
                key={index}
                bg="rgba(255, 255, 255, 0.2)" // Transparent badge color
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
            bgColor="whiteAlpha.300"
            color="white"
            _hover={{
              bgColor: "whiteAlpha.500",
              transform: "scale(1.05)", 
              boxShadow: "md", 
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
