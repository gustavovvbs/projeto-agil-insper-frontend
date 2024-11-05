import axios from 'axios';
import ProjectCard from '../ProjectCard';
import { useState, useEffect } from 'react';
import { Button, Flex, Box, Heading, Separator} from '@chakra-ui/react';

export default function Projetos({processo_id}) {
    
    return (
        <Box className="coordenador-wrapper" p={8}>
            {/* Header with "Coordenador" on the left and "Logout" on the right */}
            <Flex justifyContent="space-between" alignItems="center" mb={8}>
                <Heading as="h1" size="lg">
                    Coordenador
                </Heading>
                <Button 
                color={"red.400"}
                _hover={{ bg: 'red.500' , color: 'white'}}
                variant="outline" onClick={logout}>
                    Logout
                </Button>
            </Flex>
            
            {/* "Projetos" heading with a divider below */}
            <Box mb={4}>
                <Flex justifyContent="space-between" alignItems="center" mb={4}>
                    <Heading as="h1" size="lg">
                        Projetos
                    </Heading>

                    <Button 
                    color={"green.400"}
                    _hover={{ bg: 'green.500' , color: 'white'}}
                     variant="outline" onClick={getProjetos}>
                        Criar Projeto
                    </Button>
                    
                </Flex>
                <Separator 
                color={'whiteAlpha.100'}
                />

            </Box>

            {/* Project Cards */}
            <ProjectCard projects={projetos} />
        </Box>
    );
}