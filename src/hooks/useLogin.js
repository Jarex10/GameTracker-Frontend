// GameTracker-Frontend/src/hooks/useLogin.js
import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    
    // Conexión al Backend (puerto 4000)
    const API_URL = 'http://localhost:7000/api/user/login'; 

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null); 

        try {
            const response = await axios.post(API_URL, { email, password });
            
            // 1. Guardar el token y email en el almacenamiento local
            localStorage.setItem('user', JSON.stringify(response.data));

            // 2. Actualizar el AuthContext global
            dispatch({ type: 'LOGIN', payload: response.data });

            setIsLoading(false);
            
        } catch (err) {
            setIsLoading(false);
            // Captura el mensaje de error del backend
            const errorMessage = err.response?.data?.error || 'Error de conexión o credenciales.';
            setError(errorMessage);
        }
    };

    return { login, isLoading, error };
};