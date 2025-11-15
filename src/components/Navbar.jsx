// GameTracker-Frontend/src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext(); // Obtiene el estado del usuario logueado
  
  const handleClick = () => {
      logout();
  };
  
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>GameTracker</h1>
        </Link>
        
        <nav>
          {/* Muestra email y botón de Logout si hay usuario */}
          {user && (
            // 💥 CORRECCIÓN: Usar un contenedor flex para alinear elementos 💥
            <div style={{ display: 'flex', alignItems: 'center' }}> 
              
              {/* 🎯 NUEVO ENLACE: Dashboard de Estadísticas */}
              <Link to="/stats" style={{ marginRight: '15px' }}>Dashboard</Link>
              
              <span>{user.email}</span>
              <button onClick={handleClick}>Logout</button>
            </div>
          )}
          
          {/* Muestra Login y Registro si NO hay usuario */}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Registro</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;