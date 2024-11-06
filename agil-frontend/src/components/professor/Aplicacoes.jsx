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
import { useParams } from 'react-router-dom';
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
    return (
        <Box
        bg="radial-gradient(circle at 50% -105%, #ff0000 10%, #8b0000 30%, #000000 70%)"
        minHeight='100vh'>
            <Flex height={"80px"}>
                <Heading as='h1' size='lg' fontSize='3xl' margin={"auto 32px"}>Aplicações</Heading>
                <Button 
                    onClick={() => setIsCreatingProjeto(true)} 
                    margin={"auto 20px auto auto"}
                    _hover={{backgroundColor:"white", color:"black"}}
                >
                    Criar Projeto
                </Button>
            </Flex>
            <Separator />
            {loading ? (
                <Spinner />
            ) : (
                <SimpleGrid 
                    columns={2} 
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
            )}
        </Box>
    );
    
}

