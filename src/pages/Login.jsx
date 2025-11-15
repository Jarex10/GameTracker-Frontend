// GameTracker-Frontend/src/pages/Login.jsx
import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin'; 
import { useAuthContext } from '../hooks/useAuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();
    // No necesitamos Navigate aquí, la lógica de redirección está en App.jsx
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h3>Iniciar Sesión</h3>

            <label>Email:</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Contraseña:</label>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            
            <button disabled={isLoading}>
                {isLoading ? 'Conectando...' : 'Acceder'}
            </button>
            
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default Login;