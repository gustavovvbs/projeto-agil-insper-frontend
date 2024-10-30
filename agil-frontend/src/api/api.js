import axios from 'axios';
import { useContext } from 'react';

const api = axios.create({
    baseURL: 'http://localhost:5000'
})