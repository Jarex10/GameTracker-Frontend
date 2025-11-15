// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'; 
import TarjetaJuego from '../components/TarjetaJuego'; 
import GameFormModal from '../components/GameFormModal'; 

const Home = () => {
    const { user } = useAuthContext(); 
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // 💥 1. NUEVO ESTADO: Controla si el modal está abierto para CREAR un juego
    const [isCreating, setIsCreating] = useState(false); 
    
    // ESTADO EXISTENTE: Guarda el objeto del juego que se está editando
    const [gameToEdit, setGameToEdit] = useState(null); 
    
    // Función de carga de datos (Se ejecuta al inicio)
    useEffect(() => {
        // ... (Tu función fetchGames es correcta y usa el puerto 7000) ...
        const fetchGames = async () => {
            if (!user || !user.token) {
                setLoading(false);
                return;
            }
            
            try {
                const API_URL = 'http://localhost:7000/api/juegos'; 

                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`, 
                        'Content-Type': 'application/json' 
                    }
                });

                const json = await response.json();

                if (!response.ok) {
                    throw new Error(json.error || 'No se pudo cargar la biblioteca.');
                }
                
                setGames(json);
                setLoading(false);

            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchGames();
    }, [user]); 
    
    
    // Función para actualizar el estado después de eliminar un juego
    const handleDeleteGame = (deletedId) => {
        setGames(prevGames => prevGames.filter(g => g._id !== deletedId));
    };

    // 💥 2. FUNCIÓN PARA AGREGAR NUEVO JUEGO (POST)
    const handleNewGame = (newGame) => {
        setGames(prevGames => [newGame, ...prevGames]); // Añade el nuevo juego al principio
        setIsCreating(false); // Cierra el modal
    };
    
    // Función para iniciar la edición (llamada por TarjetaJuego)
    const handleEditStart = (game) => {
        setGameToEdit(game); 
        setIsCreating(false); // Asegura que el modo creación esté desactivado
    };

    // Función para cerrar el modal de edición/creación
    const handleEditClose = () => {
        setGameToEdit(null); // Cierra la edición
        setIsCreating(false); // Cierra la creación
    };

    // Función para actualizar el estado local después de un PUT exitoso
    const handleUpdateGame = (updatedGame) => {
        setGames(prevGames => 
            prevGames.map(game => 
                game._id === updatedGame._id ? updatedGame : game
            )
        );
        handleEditClose(); 
    };


    // ----------------------------------------------------
    // Lógica de Renderizado
    // ----------------------------------------------------

    if (loading) {
        return <div className="loading">Cargando tu biblioteca...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }
    
    // Determina si se debe mostrar el modal (si se está editando O si se está creando)
    const showModal = gameToEdit || isCreating;

    return (
        <div className="home">
            
            {/* 💥 3. BOTÓN PARA ABRIR EL FORMULARIO DE CREACIÓN */}
            <button 
                className="add-game-btn" 
                onClick={() => setIsCreating(true)} 
                style={{ padding: '10px 20px', marginBottom: '20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                + Agregar Nuevo Juego
            </button>
            
            <h2 style={{ fontSize: '2em', marginBottom: '30px' }}>Mi Biblioteca de Juegos ({games.length})</h2>
            
            <div className="game-list"> 
                {games.map(game => (
                    <TarjetaJuego 
                        key={game._id} 
                        game={game} 
                        onDelete={handleDeleteGame} 
                        onEdit={() => handleEditStart(game)} 
                    />
                ))} 
            </div>
            
            {/* 💥 4. RENDERIZAR MODAL: Pasa la función de creación (onCreate) 💥 */}
            {showModal && (
                <GameFormModal 
                    // Si estamos creando, game será null. Si estamos editando, tendrá el objeto del juego.
                    game={gameToEdit} 
                    onClose={handleEditClose} 
                    onUpdate={handleUpdateGame}
                    onCreate={handleNewGame} // <-- Función para refrescar la lista después del POST
                />
            )}
        </div>
    );
};

export default Home;