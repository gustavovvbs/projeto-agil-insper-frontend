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
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      p={6}
      bg='white'
      boxShadow='md'
      _hover={{ boxShadow: 'xl' }}
    >
      <VStack spacing={4} align='start'>
        <Heading as='h3' size='md' color='green.600'>
          {project.titulo|| 'Project Title'}
        </Heading>
        <Text color='gray.600'>
          <p>Professor: {project.professorName}</p>
          <p>Descrição: {project.descricao || 'Description of the project.'}</p>
        </Text>
        {project.topics && project.topics.length > 0 && (
          <HStack spacing={2}>
            {project.topics.map((topic, index) => (
              <Badge key={index} colorScheme='green'>
                {topic}
              </Badge>
            ))}
          </HStack>
        )}

        {role === 'estudante' && (
            <Button colorScheme='green' onClick={handleApply}>
            Aplicar
          </Button>
        )}
        {role === 'coordenador' && (
            <Button colorScheme='red' onClick={() => navigate(`/projects/${project.id}/edit`)}>
            Detalhes
          </Button>
        )}
       
      </VStack>
    </Box>
  );
}