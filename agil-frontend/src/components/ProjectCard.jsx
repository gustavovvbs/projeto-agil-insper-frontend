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
      borderRadius='lg'
      overflow='hidden'
      p={6}
      bg='#171717'
      _hover={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5), 0 -5px 6px rgba(255, 0, 0)", transform: "scale(1.06)",
        transition: "all 0.2s",}}
      boxShadow='10px 10px 10px 0 rgba(0, 0, 0, 0.5)'
      backgroundColor="rgba(255, 255, 255, 0.2)" // Light transparent background for each card

    >
      <VStack spacing={4} align='start'>
        <Heading as='h3' size='md' color='white' fontSize='20px'>
          {project.titulo|| 'Project Title'}
        </Heading>
        <Text color='whiteAlpha.800' fontSize='10px'>
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
            <Button colorScheme='green' onClick={handleApply} bg='#575757' height={'34px'} boxShadow='2px 2px 2px 0px rgba(0, 0, 0, 0.5)' _hover={{ bg: 'whiteAlpha.900',  color: 'black'}}>
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