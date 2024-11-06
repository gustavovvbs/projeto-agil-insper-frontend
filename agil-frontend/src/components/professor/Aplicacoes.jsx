import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Spinner,
  Text,
  SimpleGrid,
  Flex,
  Button,
  Separator,

} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProjectCard from '../ProjectCard';
import CreateProjetoCoord from '../CreateProjetoCoord';
import ApplicationCard from '../ApplicationCard';
import decodeToken from '../../utils/decodeToken';

export default function Aplicacoes() {
    const { projetoId } = useParams();
    const [aplicacoes, setAplicacoes] = useState([]);
    const [projetoName, setProjetoName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCreatingProjeto, setIsCreatingProjeto] = useState(false);

    const professor_payload = decodeToken(localStorage.getItem('token'));

    const professorId = professor_payload.user_id;
    
    useEffect(() => {
        getAplicacoes();
    }, [projetoId]);
    
    const getAplicacoes = async () => {
        setLoading(true);
        try {
            const aplicacaoResponse = await axios.get(`https://projeto-agil-insper-backend.onrender.com/professor/projeto/${projetoId}/aplicacoes`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            if (aplicacaoResponse.status === 200) {
                setAplicacoes(aplicacaoResponse.data);
            }
        }
        catch (error) {
            console.error('Error fetching projects:', error);
            setAplicacoes([]);
        }
        finally {
            setLoading(false);
        }
    }
    console.log(aplicacoes);

    const logout = () => {
        localStorage.removeItem('role');
        navigate('/login');
    };

    const navigate = useNavigate()

    const goback = () => {
        navigate('/professor');
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
            <Button onClick={goback} margin={"auto 20px auto auto"} _hover={{backgroundColor:"white", color:"black"}}>
                Voltar
            </Button>

            <br />
            
            <Flex height={"80px"}>
                <Heading as='h1' size='lg' fontSize='3xl' margin={"auto 32px"}>Aplicações</Heading>
            </Flex>
            <Separator />
            {loading && (
                        <Flex
                            position="fixed"
                            top="0"
                            left="0"
                            width="100%"
                            height="100%"
                            alignItems="center"
                            borderRadius="16px"
                            justifyContent="center"
                            bg="rgba(0, 0, 0, 0.6)"
                            zIndex="1000"
                        >
                            <Spinner color="white" size="xl" />
                    </Flex>
                )}
                <SimpleGrid 
                    columns={3} 
                    spacing={4} 
                    margin={"25px auto"} 
                    width={"80%"} 
                    rowGap={"15px"} 
                    columnGap={"15px"}
                >
                    {aplicacoes.map((aplicacao) => (
                        <ApplicationCard aplicacao={aplicacao} />
))}
                </SimpleGrid>
        </Box>
    );
    
}

