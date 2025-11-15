// src/context/AuthContext.jsx

import React, { createContext, useReducer, useEffect, useState } from 'react';

// 1. Crea el Contexto
export const AuthContext = createContext();

// 2. Reductor para manejar el estado del usuario (login, logout)
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { 
        user: null 
    });
    
    // **Estado Clave:** Indica si la verificación de localStorage ha terminado (Soluciona el bug de la recarga).
    const [isAuthReady, setIsAuthReady] = useState(false);

    // 3. Efecto para cargar el usuario desde localStorage al iniciar la app
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            dispatch({ type: 'LOGIN', payload: user });
        }
        
        // Marca que la autenticación está lista
        setIsAuthReady(true); 
    }, []); // Se ejecuta solo al montar

    // 4. Provee el estado y el dispatcher a toda la aplicación
    return (
        <AuthContext.Provider value={{ ...state, dispatch, isAuthReady }}> 
            {children}
        </AuthContext.Provider>
    );
};