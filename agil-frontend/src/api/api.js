import axios from 'axios';
import { useContext } from 'react';

const api = axios.create({
    baseURL: 'https://projeto-agil-insper-backend.onrender.com/'
})