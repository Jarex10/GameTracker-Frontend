// GameTracker-Frontend/src/hooks/useSignup.js
import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    
    // Conexión al Backend (puerto 4000)
    const API_URL = 'http://localhost:7000/api/user/register'; 

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null); 

        try {
            const response = await axios.post(API_URL, { email, password });
            
            localStorage.setItem('user', JSON.stringify(response.data));

            dispatch({ type: 'LOGIN', payload: response.data });

            setIsLoading(false);
            
        } catch (err) {
            setIsLoading(false);
            const errorMessage = err.response?.data?.error || 'Error de conexión o credenciales.';
            setError(errorMessage);
        }
    };

    return { signup, isLoading, error };
};