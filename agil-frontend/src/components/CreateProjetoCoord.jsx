import React, { useState, useEffect } from 'react';
import {
  Button,
  Fieldset,
  Input,
  Stack,
  Textarea,
  Text,
  Box,
} from '@chakra-ui/react';
import { Field } from './ui/field';
import { NativeSelectField, NativeSelectRoot } from './ui/native-select';
import { toaster } from './ui/toaster';
import axios from 'axios';

export default function CreateProjetoCoord({ processoId, onClose, refreshProjetos }) {
  const [professores, setProfessores] = useState([]);
  const [professorId, setProfessorId] = useState('');
  const [temasSelecionados, setTemasSelecionados] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loadingProfessores, setLoadingProfessores] = useState(true);
  const [error, setError] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);

  const temasOptions = [
    'DIREITO',
    'COMPUTACAO',
    'MACHINE LEARNING',
    'USER EXPERIENCE',
    'ADMNISTRACAO',
    'ENGENHARIA',
  ];

  useEffect(() => {
    fetchProfessores();
  }, []);

  const fetchProfessores = async () => {
    try {
      const response = await axios.get('https://projeto-agil-insper-backend.onrender.com/professor');
      setProfessores(response.data);
    } catch (err) {
      setError('Erro ao carregar professores.');
    } finally {
      setLoadingProfessores(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!professorId || temasSelecionados.length === 0 || !descricao.trim()) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    const payload = {
      titulo: titulo.trim(),
      processo_seletivo: processoId,
      professor: professorId,
      temas: temasSelecionados,
      descricao: descricao.trim(),
    };

    try {
      await axios.post('https://projeto-agil-insper-backend.onrender.com/projeto/', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toaster.success({
        title: 'Projeto criado!',
        description: 'O projeto foi criado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setProfessorId('');
    
      setTemasSelecionados([]);
      setDescricao('');
      setTitulo('');
      refreshProjetos();
      closeOverlay();
    } catch (err) {
      setError('Erro ao criar o projeto.');
    }
  };

//   const openOverlay = () => setIsOverlayOpen(true);
  const closeOverlay = () => {
    setIsOverlayOpen(false);
    onClose();
  };

  return (
    <>
        {/* <Button colorScheme="green" onClick={openOverlay}>Criar Projeto</Button> */}
      {isOverlayOpen && (
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
            <Fieldset.Root size="lg">
              <Stack>
                <Fieldset.Legend>Criar Projeto</Fieldset.Legend>
                <Fieldset.HelperText>Preencha os detalhes do novo projeto abaixo.</Fieldset.HelperText>
              </Stack>
              <form onSubmit={handleSubmit}>
                <Fieldset.Content>
                    <Field label="Título">
                        <Textarea
                            name="titulo"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Título do projeto"
                            required
                        />
                    </Field>
                  <Field label="Professor">
                    <NativeSelectRoot>
                      <NativeSelectField
                        name="professor"
                        value={professorId}
                        onChange={(e) => setProfessorId(e.target.value)}
                        disabled={loadingProfessores}
                        items={professores.map((prof) => ({
                          label: prof.nome,
                          value: prof.id,
                        }))}
                        placeholder="Selecione um professor"
                      />
                    </NativeSelectRoot>
                  </Field>
                  <Field label="Temas">
                    <NativeSelectRoot>
                      <NativeSelectField
                        name="temas"
                        value={temasSelecionados}
                        onChange={(e) =>
                          setTemasSelecionados(
                            Array.from(e.target.selectedOptions, (option) => option.value )
                          )
                        }
                        items={temasOptions.map((tema) => ({
                          label: tema,
                          value: tema,
                        }))}
                        placeholder="Selecione os temas"
                      />
                    </NativeSelectRoot>
                  </Field>
                  <Field label="Descrição">
                    <Textarea
                      name="descricao"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      placeholder="Descrição do projeto"
                      required
                    />
                  </Field>
                  {error && <Text color="red.500">{error}</Text>}
                </Fieldset.Content>
                <Stack direction="row" spacing={4} mt={4}>
                  <Button type="submit" colorScheme="green">Criar Projeto</Button>
                  <Button variant="outline" onClick={closeOverlay}>Cancelar</Button>
                </Stack>
              </form>
            </Fieldset.Root>
          </Box>
        </Box>
      )}
    </>
  );
}
