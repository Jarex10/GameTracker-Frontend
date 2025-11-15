// src/hooks/useAuthContext.js
import { useContext } from 'react';
// Asegúrate de que esta ruta sea correcta: si AuthContext.jsx está en 'context', usa '../context/AuthContext'
import { AuthContext } from '../context/AuthContext'; 

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        // Este error indica que olvidaste envolver tu App.jsx con el AuthContextProvider
        throw Error('useAuthContext debe ser usado dentro de un AuthContextProvider');
    }

    return context;
};