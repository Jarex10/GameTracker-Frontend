// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext'; 
import Home from './pages/Home';
import Login from './pages/Login'; 
import Register from './pages/Register';
import Navbar from './components/Navbar'; 
import Estadisticas from './pages/Estadisticas'; // <-- Ya estaba importado, ¡bien!

function App() {
    const { user, isAuthReady } = useAuthContext(); 

    if (!isAuthReady) {
        return <div className="loading-screen">Cargando aplicación...</div>;
    }
    
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar /> 
                <main>
                    <Routes>
                        
                        {/* 1. RUTA DE LA BIBLIOTECA (Principal) */}
                        <Route 
                            path="/"
                            element={user ? <Home /> : <Navigate to="/login" />}
                        />
                        
                        {/* 💥 RUTA FALTANTE: DASHBOARD DE ESTADÍSTICAS 💥 */}
                        <Route 
                            path="/stats"
                            element={user ? <Estadisticas /> : <Navigate to="/login" />}
                        />
                        
                        {/* 3. RUTA LOGIN */}
                        <Route 
                            path="/login"
                            element={!user ? <Login /> : <Navigate to="/" />}
                        />
                        
                        {/* 4. RUTA REGISTRO */}
                        <Route 
                            path="/register"
                            element={!user ? <Register /> : <Navigate to="/" />}
                        />
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;