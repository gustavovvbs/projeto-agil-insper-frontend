import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Textarea,
  Text,
  Image,
  Link,
  Spinner
} from '@chakra-ui/react';
import { Field } from '../ui/field';
import { Switch } from '../ui/switch';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Matchmaking() {
  const [themeEnjoyed, setThemeEnjoyed] = useState('');
  const [course, setCourse] = useState('');
  const [academicOrProduct, setAcademicOrProduct] = useState('');
  const [semester, setSemester] = useState('');
  const [hasIdea, setHasIdea] = useState(false);
  const [idea, setIdea] = useState('');
  const [professors, setProfessors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
}
  const navigate = useNavigate()

  const goToProjetos = () => {
    navigate('/estudante')
  }


  const fetchProfessores = async () => {
    setLoading(true);
    try {
        const response = await axios.get('https://projeto-agil-insper-backend.onrender.com/professor');
      if (response.status !== 200) {
        throw new Error('Erro ao carregar professores.');
      }
      setProfessors(response.data);
    } catch (err) {
      setError('Erro ao carregar professores.');
    } 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      theme_enjoyed: themeEnjoyed,
      course,
      academic_or_product: academicOrProduct,
      semester,
      has_idea: hasIdea,
      idea: hasIdea ? idea : null,
    };

    try {
      setLoading(true)
      const response = await axios.post('https://projeto-agil-insper-backend.onrender.com/matchmaking/query', formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setProfessors(response.data);
    } catch (error) {
      console.error('Erro ao buscar professores:', error);
      setError('Erro ao buscar professores.');
    } finally {
      setLoading(false)
    }
  };

  return (
    <Box fontFamily="Kumbh Sans" color="#fff" bg="radial-gradient(circle at 50% -105%, #ff0000 10%, #8b0000 30%, #000000 70%)" minHeight="100vh" >
      <Flex
        color="#fff"
        px="4"
        py="3"
        align="center"
        gap="80%"
        position="relative"
        top="0"
        width="100%"
        zIndex="1000"
      >
        <Heading as='h1' size='lg' fontSize='3xl'>
            <Text as="span" color="red.500">Sci</Text>
            <Text as="span" color="white">Connect</Text>
        </Heading>
        <Button to="/estudante" color="#DC143C" variant="outline" borderColor={'#808080'} _hover={{ bg: "FFFFF" }} onClick={goToProjetos}>
          Ver Projetos
        </Button>
      </Flex>

      <br />
      <Box
        maxW="600px"
        mx="auto"
        p="8"
        mt="60px"
        borderRadius="16px"
        backdropFilter="blur(10px)"
        bg="rgba(23, 25, 28, 0.6)"
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.5), 0 -5px 6px rgba(255, 0, 0)"
        position={'relative'}

      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={8}>
            <Heading as="h1" size="3xl" textAlign="left" color="#fff" mb={4}>
              Encontre seu Professor
            </Heading>

            <Field label="Curso" isRequired>
              <Input
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="Ex: Engenharia de Software"
                bg="#4C4F54"
                color="#FFFFFF"
                border="1px solid rgba(255, 255, 255, 0.3)"
                _placeholder={{ color: "#787878" }}
              />
            </Field>

            <Field label="Tema de seu interesse" isRequired>
              <Input
                value={themeEnjoyed}
                onChange={(e) => setThemeEnjoyed(e.target.value)}
                placeholder="Ex: Machine Learning"
                bg="#4C4F54"
                color="#FFFFFF"
                border="1px solid rgba(255, 255, 255, 0.3)"
                _placeholder={{ color: "#787878" }}
              />
            </Field>

            <Field label="Trabalho acadêmico ou produto" isRequired>
              <Input
                value={academicOrProduct}
                onChange={(e) => setAcademicOrProduct(e.target.value)}
                placeholder="Ex: Acadêmico"
                bg="#4C4F54"
                color="#FFFFFF"
                border="1px solid rgba(255, 255, 255, 0.3)"
                _placeholder={{ color: "#787878" }}
              />
            </Field>

            <Field label="Semestre" isRequired>
              <Input
                type="number"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                placeholder="Ex: 5"
                bg="#4C4F54"
                color="#FFFFFF"
                border="1px solid rgba(255, 255, 255, 0.3)"
                _placeholder={{ color: "#787878" }}
              />
            </Field>

            <Field label="Já tem uma ideia?" mt={3}>
              <Switch
                isChecked={hasIdea}
                onChange={() => setHasIdea(!hasIdea)}
                colorScheme="brand"
              />
            </Field>

            {hasIdea && (
              <Field label="Descreva sua ideia">
                <Textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Descreva sua ideia"
                  bg="#4C4F54"
                  color="#FFFFFF"
                  border="1px solid rgba(255, 255, 255, 0.3)"
                  _placeholder={{ color: "#787878" }}
                />
              </Field>
            )}

            {error && <Text color="#DC143C">{error}</Text>}

            <Button type="submit" onClick={fetchProfessores} colorScheme="brand" size="lg" boxShadow="0 0 10px #DC143C" mt={4} >
              Encontrar Professores
            </Button>
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
            
          </Stack>
        </form>
      </Box> 
      <br />
      <br />
      <br />

      {professors.length > 1 && ( 
        
      <Box mt={4} p={8}>
        <Flex alignItems="center" justifyContent="center" textAlign="center">
          <Heading as="h1" size="md" color="#fff" fontSize="4xl">
            Professores sugeridos
          </Heading>
        </Flex>
        <br />
        <br />
        <br />
        <Stack spacing={8} mt={4}>
          {professors.map((professor) => (
            <Box
            p="4"
            W="90%"
            mx="auto"
            minW='50%'
            borderWidth="1px"
            borderRadius="16px"
            bg="black"
            backdropFilter="blur(10px)"
            border="1px solid rgba(255, 255, 255, 0.2)"
            boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
          >
            <Stack spacing={4} align="center">
              {professor.metadata?.photo_url && (
                <Image
                  boxSize="200px"
                  objectFit="cover"
                  src={professor.metadata.photo_url}
                  alt={professor.metadata?.name || 'Professor'}
                  borderRadius="full"
                  border="2px solid #0E9C8B"
                />
              )}
              <Box p="3" textAlign="center">
                <Heading as="h4" size="md" color="#DC143C" fontSize='30px'>
                  {professor.metadata?.name || 'Nome não disponível'}
                </Heading>
                <br />
                <Text color="#fff" fontSize='15px'>Email: {professor.metadata?.email || 'N/A' }</Text>
                <br />
                <Text color="#fff" fontSize='15px'>Área de Pesquisa: {professor.metadata?.research_area || 'N/A'}</Text>
                <br />
                <Text color="#fff" fontSize='15px'>
                  Descrição: {showMore ? professor.metadata?.description || 'N/A' : `${(professor.metadata?.description || 'N/A').slice(0, 50)}...`}
                </Text>
                <br />
                <Text color="#fff" fontStyle="italic" fontSize='15px'>
                  Motivo: {showMore ? professor.metadata?.reasoning || 'N/A' : `${(professor.metadata?.reasoning || 'N/A').slice(0, 50)}...`}
                </Text>
      
                <Button colorScheme="teal" size="sm" onClick={toggleShowMore} mt={3}>
                  {showMore ? 'Ver menos' : 'Ver mais'}
                </Button>
              </Box>
            </Stack>
          </Box>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}