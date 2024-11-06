import React from "react";
import { useEffect, useState } from "react";    
import decodeToken from "../../utils/decodeToken";
import {
    Box,
    Heading,
    Button,
    SimpleGrid,
    Flex,
    Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProjectCard from "../ProjectCard";


export default function Professor() {
    const [projetos, setProjetos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const professor_payload = decodeToken(localStorage.getItem('token'));
    const professorId = professor_payload.user_id;
  

    useEffect(() => {
        if (localStorage.getItem('role') !== 'professor') {
            navigate('/login');
        } else {
            getProjects();
        }
    }
    , []);

    const getProjects = async () => {
      setLoading(true)
      try {
        const projetosResponse = await axios.get(`https://projeto-agil-insper-backend.onrender.com/professor/${professorId}/projeto`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        
            if (projetosResponse.status === 200) {
                setProjetos(projetosResponse.data);

            }

        } catch (error) {
            console.error('Error fetching projects:', error);
            setProjetos([]);

        } finally {
            setLoading(false);
        }

    };

    const logout = () => {
        localStorage.removeItem('role');
        navigate('/login');
    };

    
    return (
        <Box p={8}
        bg="radial-gradient(circle at 50% -105%, #ff0000 10%, #8b0000 30%, #000000 70%)"
        minHeight='100vh'>
            {/* Header */}
            <Flex justifyContent="space-between" alignItems="center" mb={8}>
            <div class='header'>
                <Heading as='h1' size='lg' fontSize='3xl'>
                    <Text as="span" color="red">Sci</Text>
                    <Text as="span" color="white">Connect</Text>
                </Heading>
                <Heading size='xs' fontSize={'1x1'}>Professor</Heading>
            </div>
            <Button 
                margin={"auto 20px auto auto"}
                _hover={{backgroundColor:"white", color:"black"}}
                onClick={logout}>
                Logout
            </Button>
            </Flex>
            <SimpleGrid columns={3} spacing={4}  rowGap={"10px"} columnGap={"10px"}>
                {projetos.map((projeto) => (
                    <ProjectCard key={projeto.id} project={projeto} role={localStorage.getItem('role')} />
                ))}
            </SimpleGrid>
        </Box>
    )
}
