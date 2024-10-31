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


  const fetchProfessores = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/professor');
        setLoading(true);
      if (response.status !== 200) {
        throw new Error('Erro ao carregar professores.');
      }
      setProfessors(response.data);
      setLoading(false);
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
      const response = await axios.post('http://127.0.0.1:5000/matchmaking/query', formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setProfessors(response.data);
    } catch (error) {
      console.error('Erro ao buscar professores:', error);
      setError('Erro ao buscar professores.');
    }
  };

  return (
    <Box fontFamily="Kumbh Sans" color="#fff">
      {/* Navbar */}
      <Flex
        bg="#17191C"
        color="#FFFFFF"
        px="4"
        py="3"
        align="center"
        justify="space-between"
        position="fixed"
        top="0"
        width="100%"
        zIndex="1000"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      >
        <Heading size="4xl" color="#690DDD">SciConnect</Heading>
        <Button as={Link} to="/estudante" color="#0E9C8B" variant="outline">
          Ver Projetos
        </Button>
      </Flex>

      {/* Spacer to prevent content from being hidden behind navbar */}
      <Box height="60px" />

      {/* Form Container with Glassmorphism */}
      <Box
        maxW="600px"
        mx="auto"
        p="8"
        borderRadius="16px"
        backdropFilter="blur(10px)"
        bg="rgba(23, 25, 28, 0.6)"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        border="1px solid rgba(255, 255, 255, 0.3)"
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={8}>
            <Heading as="h1" size="3xl" textAlign="left" color="#690DDD" mb={4}>
              Encontre seu Professor
            </Heading>

            <Field label="Tema de seu interesse" isRequired>
              <Input
                value={themeEnjoyed}
                onChange={(e) => setThemeEnjoyed(e.target.value)}
                placeholder="Ex: Machine Learning"
                bg="#4C4F54"
                color="#FFFFFF"
                border="1px solid rgba(255, 255, 255, 0.3)"
              />
            </Field>

            <Field label="Curso" isRequired>
              <Input
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="Ex: Engenharia de Software"
                bg="#4C4F54"
                color="#FFFFFF"
                border="1px solid rgba(255, 255, 255, 0.3)"
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
                />
              </Field>
            )}

            {error && <Text color="#690DDD">{error}</Text>}

            <Button type="submit" onClick={fetchProfessores} colorScheme="brand" size="lg" boxShadow="0 0 10px #690DDD" mt={4}>
              Encontrar Professores
            </Button>
            {loading && <Spinner color="#690DDD" />}
            
          </Stack>
        </form>
      </Box>

      {/* Professors List */}
      {professors.length > 1 && (
        <Box mt={4} p={8}>
          <Heading as="h2" size="md" color="#690DDD">Professores sugeridos</Heading>
          <Stack spacing={4} mt={4}>
            {professors.map((professor) => (
              <Box
                key={professor.id}
                p="4"
                borderWidth="1px"
                borderRadius="16px"
                bg="rgba(255, 255, 255, 0.1)"
                backdropFilter="blur(10px)"
                border="1px solid rgba(255, 255, 255, 0.2)"
                boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
              >
                <Stack direction="row" spacing={4} align="center">
                  {professor.metadata?.photo_url && (
                    <Image
                      boxSize="80px"
                      objectFit="cover"
                      src={professor.metadata.photo_url}
                      alt={professor.metadata?.name || 'Professor'}
                      borderRadius="full"
                      border="2px solid #0E9C8B"
                    />
                  )}
                  <Box>
                    <Heading as="h4" size="md" color="#690DDD">
                      {professor.metadata?.name || 'Nome não disponível'}
                    </Heading>
                    <Text color="#FFFFFF">Email: {professor.metadata?.email || 'N/A'}</Text>
                    <Text color="#FFFFFF">Área de Pesquisa: {professor.metadata?.research_area || 'N/A'}</Text>
                    <Text color="#FFFFFF">Descrição: {professor.metadata?.description || 'N/A'}</Text>
                    <Text color="#FFFFFF" fontStyle="italic">
                      Motivo: {professor.metadata?.reasoning || 'N/A'}
                    </Text>
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
