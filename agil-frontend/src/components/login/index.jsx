import { useState } from 'react';
import axios from 'axios';
import { Box, Flex, Text, Spinner, Button, Heading} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi'; 
import { useNavigate } from 'react-router-dom';

export default function RecuperarSenha() {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const openOtherPage = () => {
    navigate('/login/recuperar-senha');
  };

  const login = (event) => {
    setLoading(true);
    event.preventDefault();
    axios.post('https://projeto-agil-insper-backend.onrender.com/auth/login', {
        email: event.target.email.value,
        password: event.target.password.value
    })
    .then((response) => {
        console.log(response);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.user.role);
    })
    .then(() => {
        setLoading(false);
        const role = localStorage.getItem('role');
        if (role === 'coordenador') {
            window.location.href = '/coordenador';
        } else if (role === 'professor') {
            window.location.href = '/professor/professorId';
        } else if (role === 'estudante') {
            window.location.href = '/estudante';
        }
    })
    .catch((error) => {
        setLoading(false);
        if (error.response && error.response.status === 404) {
            setErrorMessage('Email ou senha incorretos');
        } else {
            setErrorMessage('Erro desconhecido');
        }
    });
  };

  return (
    <Box>
    <Heading as='h1' size='lg' fontSize='3xl' marginLeft='30px' marginTop='20px' position='absolute'>
        <Text as="span" color="red.500">Sci</Text>
        <Text as="span" color="white">Connect</Text>
        </Heading>
    <Box
        overflow="hidden"
        minHeight="100vh"
        bg="radial-gradient(circle at 50% -105%, #ff0000 10%, #8b0000 30%, #000000 70%)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="#000000"
    >

        <Flex
            direction="column"
            bg="rgba(0, 0, 0, 0.6)"
            padding="20px"
            borderRadius="10px"
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.5), 0 -5px 6px rgba(255, 0, 0)"
            width="100%"
            maxWidth="400px"
            textAlign="center"
        >
            <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '5px', color:'#fff'}}>Log In</h1>
            <br />
            {errorMessage && (  
                <Box className="error-message" color="red.300" mb="4">
                    <Text>{errorMessage}</Text>
                </Box>
            )}
            <form onSubmit={login} style={{ textAlign: 'left' }} >
                <label>
                    <Text color={'white'} marginBottom='5px'>Email:</Text>
                    <input type="text" name="email" placeholder='Insira o email aqui...' style={{ width: '100%', padding: '8px', marginBottom: '16px', borderRadius:"10px" }} />
                </label>
                <br />
                <br />
                <label>
                    <Text color={'white'} marginBottom='5px' marginTop = '-10px'>Senha:</Text>
                    <input type="password" name="password" placeholder='Insira a senha aqui...' style={{ width: '100%', padding: '8px', marginBottom: '16px', borderRadius:"10px", color: 'black' }} />
                </label>
                <br />
                <Button
                    leftIcon={<FiLogOut />} colorScheme='red' variant='solid' onClick={openOtherPage} width = '47%' height='100%'
                    _ mt={4} bg = 'transparent' marginTop = '3px' marginLeft='0px' size = 'lg' marginBottom = '7px'
                    _hover={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5), 0 -1px 13px rgba(255, 0, 0)", transform: "scale(1.06)", transition: "all 0.2s",}}
                >
                    Esqueci minha senha
                </Button>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                    <button type="submit" style={{ padding: '10px 50px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Entrar
                    </button>
                </div>
        
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
            </form>
        </Flex>
    </Box>
    </Box>
  );
}
