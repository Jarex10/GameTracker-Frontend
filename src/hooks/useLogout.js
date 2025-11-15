// GameTracker-Frontend/src/hooks/useLogout.js
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        // 1. Eliminar el usuario de localStorage
        localStorage.removeItem('user');

        // 2. Disparar la acción de LOGOUT
        dispatch({ type: 'LOGOUT' });
    };

    return { logout };
};