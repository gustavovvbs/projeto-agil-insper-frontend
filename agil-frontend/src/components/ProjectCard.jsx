// src/components/ProjectCard.jsx

import React from 'react';
import {
  Card,
  Heading,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';
import ProjectDetails from './ProjectDetails';

export default function ProjectCard({ project }) {
    console.log('PROJECT NO PROJECT CARD', project)
  return (
    <Card.Root borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} maxWidth='-webkit-max-content'>
      <Card.Header>
        <Heading size="md" textAlign="center">{project.titulo}</Heading>
        <Text fontSize="sm" textAlign="center">Professor: {project.professorName}</Text>
      </Card.Header>

      <Card.Body textAlign='center'>
        <Text>{project.descricao || 'Sem descrição disponível.'}</Text>
      </Card.Body>

      <Card.Footer>
        <Stack direction="row" spacing={4} justify='center' width='100%'>
          <ProjectDetails project={project} />
        </Stack>
      </Card.Footer>

    </Card.Root>
  );
}