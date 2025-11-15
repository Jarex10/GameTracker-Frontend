// src/main.jsx (o src/index.js)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Asegúrate de que la extensión sea correcta (.jsx)
import './index.css'; 

// Importa el componente Provider desde el archivo AuthContext.jsx
import { AuthContextProvider } from './context/AuthContext'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 💥 EL PROBLEMA: El Context Provider no estaba envolviendo la app 💥 */}
    <AuthContextProvider> 
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
);