// src/components/ProcessoCard.jsx

import React, { useEffect, useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ProcessoCard({ aplicacao }) {
  const [estudanteName, setEstudanteName] = useState('');
  const [loading, setLoading] = useState(false);
  const [processoName, setProcessoName] = useState('');
  
  useEffect(() => {
    getEstudante();
    }, []);

    const getEstudante = async () => {
        setLoading(true);
        try{
            const estudanteResponse = await axios.get(`https://projeto-agil-insper-backend.onrender.com/estudante/${aplicacao.estudante}`);
            if (estudanteResponse.status === 200){
                setEstudanteName(estudanteResponse.data.nome);
            } else {
                console.warn('Unexpected response structure:', response.data);
                setEstudanteName('Estudante não nomeado');
            }
        }
        catch (error) {
            console.error('Error fetching estudante:', error);
            setEstudanteName('Estudante não nomeado');}

        finally {
            setLoading(false);
        }

    };

    const getProcesso = async () => {
        setLoading(true);
        try{
            const processoResponse = await axios.get(`https://projeto-agil-insper-backend.onrender.com/processo/${aplicacao.processo}`);
            if (processoResponse.status === 200){
                setProcessoName(processoResponse.data.nome);
            } else {
                console.warn('Unexpected response structure:', response.data);
                setProcessoName('Processo não nomeado');
            }
        }
        catch (error) {
            console.error('Error fetching processo:', error);
            setProcessoName('Processo não nomeado');}

        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProcesso();
    }, []);

  return (
      <Box
      borderRadius='lg'
      overflow='hidden'
      p={6}
      bg='#171717'
      ml={2}
      mr={2}
      _hover={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5), 0 -5px 6px rgba(255, 0, 0)", transform: "scale(1.06)",
        transition: "all 0.2s",}}
      boxShadow='10px 10px 10px 0 rgba(0, 0, 0, 0.5)'
      backgroundColor="rgba(255, 255, 255, 0.2)" // Light transparent background for each card
    >
        <Heading         
        textAlign={'left'}
        size='2xl'>{estudanteName || 'estudante sem nome'}</Heading>
        <Heading 
        textAlign={'left'}
        size='2xl'>{processoName || 'processo sem nome'}</Heading>
        
      </Box>
  );
}