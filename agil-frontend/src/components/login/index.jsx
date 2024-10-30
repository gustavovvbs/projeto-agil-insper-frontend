import {useState} from 'react';
import axios from 'axios';

export default function Login() {
    const [errorMessage, setErrorMessage] = useState('');
    const login = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/auth/login', {
            email: event.target.email.value,
            password: event.target.password.value
        }).then(
            (response) => {
                console.log(response);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.user.role)
            }
        )
        .then
        (
            () => {
                if (localStorage.getItem('role') === 'coordenador') {
                    window.location.href = '/coordenador';
                }
               else if (localStorage.getItem('role') === 'professor') {
                    window.location.href = '/professor';
                }
                else if (localStorage.getItem('role') === 'aluno') {
                    window.location.href = '/aluno';

            }
            }
        )
        .catch((error) => {
            if (error.response && error.response.status === 404) {
                setErrorMessage('Email ou senha incorretos');
            } else {
                setErrorMessage('Erro desconhecido');
            }
        })
    }


    return (
        <div className = "login-wrapper">
            <h1>Please Log In</h1>
            {errorMessage && (
                <div className = "error-message">
                    <p>{errorMessage}</p>
                </div>
            )}
            <form onSubmit={login}>
                <label>
                    <p>Email</p>
                    <input type='text' name = 'email' />
                </label>
                <label>
                    <p>Password</p>
                    <input type='password' name = 'password'/>
                </label>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}