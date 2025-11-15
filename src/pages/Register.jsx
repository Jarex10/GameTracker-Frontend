// GameTracker-Frontend/src/pages/Register.jsx
import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { useAuthContext } from '../hooks/useAuthContext';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();
    // No necesitamos Navigate aquí, la lógica de redirección está en App.jsx

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, password);
    };

    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <h3>Registrarse</h3>

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
                {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
            
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default Register;