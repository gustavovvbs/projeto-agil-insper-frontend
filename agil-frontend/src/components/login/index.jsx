import { useState } from 'react';
import axios from 'axios';
import { Box, Flex} from '@chakra-ui/react'

export default function Login() {
    const [errorMessage, setErrorMessage] = useState('');
    const login = (event) => {
        event.preventDefault();
        axios.post('https://projeto-agil-insper-backend.onrender.com/auth/login', {
            email: event.target.email.value,
            password: event.target.password.value
        }).then(
            (response) => {
                console.log(response);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.user.role);
            }
        )
        .then(() => {
            const role = localStorage.getItem('role');
            if (role === 'coordenador') {
                window.location.href = '/coordenador';
            } else if (role === 'professor') {
                window.location.href = '/professor';
            } else if (role === 'estudante') {
                window.location.href = '/estudante';
            }
        })
        .catch((error) => {
            if (error.response && error.response.status === 404) {
                setErrorMessage('Email ou senha incorretos');
            } else {
                setErrorMessage('Erro desconhecido');
            }
        });
    };

    return (
        <Box
            overflow="hidden"
            minHeight="100vh"
            bg="radial-gradient(circle at 50% -105%, #ff0000 10%, #8b0000 30%, #000000 70%)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="#fff"

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
                <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '5px' }}>Please Log In</h1>
                <br />
                {errorMessage && (
                    <Box className="error-message" color="red.300" mb="4">
                        <p>{errorMessage}</p>
                    </Box>
                )}
                <form onSubmit={login} style={{ textAlign: 'left' }} >
                    <label>
                        <p>Email</p>
                        <input type="text" name="email" style={{ width: '100%', padding: '8px', marginBottom: '16px', borderRadius:"10px" }} />
                    </label>
                    <br />
                    <br />
                    <label>
                        <p>Password</p>
                        <input type="password" name="password" style={{ width: '100%', padding: '8px', marginBottom: '16px', borderRadius:"10px" }} />
                    </label>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Sing in
                        </button>
                    </div>
                </form>
            </Flex>
        </Box>
    );
}