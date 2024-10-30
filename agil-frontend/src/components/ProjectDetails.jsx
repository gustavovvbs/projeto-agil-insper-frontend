import React, { useState } from "react";
import { Box, Button} from "@chakra-ui/react";

export default function ProjectDetails({ project }) {
    const [isOpen, setIsOpen] = useState(false);

    const openOverlay = () => setIsOpen(true);
    const closeOverlay = () => setIsOpen(false);

    return (
        <>
            {/* Trigger button to open the overlay */}
            <Button color={"green.400"} onClick={openOverlay}>Detalhes</Button>

            {/* Fullscreen overlay for displaying project details */}
            {isOpen && (
                <Box
                    position="fixed"
                    top="0"
                    left="0"
                    width="100vw"
                    height="100vh"
                    bg="blackAlpha.800"
                    color="white"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    zIndex="1000"
                    p={8}
                >
                    <Box
                        bg="white"
                        color="black"
                        borderRadius="md"
                        p={6}
                        maxW="600px"
                        width="90%"
                        textAlign="left"
                    >
                        <h2>{project.titulo}</h2>
                        <p>Professor: {project.professorName}
                            <p>Email do professor: {project.professorEmail}</p>  
                        </p>
                        <p>Temas: {project.temas}</p>
                        <p>Aplicações: {project.aplicacoes.length}</p>
                        <p>Processo Seletivo: {project.processoName || 'Sem título'}</p>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            mt={4}
                            textAlign="right"
                        >
                        <Button 
                        colorScheme="red" mt={4} onClick={closeOverlay}>Close</Button>
                        </Box>
                    </Box>


                </Box>
            
            )}
        </>
    );
}
