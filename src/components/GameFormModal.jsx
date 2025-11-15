// src/components/GameFormModal.jsx
import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';

// 💥 NUEVAS PROPS: onUpdate, onCreate (para creación), y game (que puede ser null)
const GameFormModal = ({ game, onClose, onUpdate, onCreate }) => {
    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);

    // Determina si estamos editando (si la prop 'game' tiene datos)
    const isEditing = !!game; 
    
    // 💥 1. DEFINICIÓN DE DATOS INICIALES y OPCIONES DE SELECT 💥
    const [formData, setFormData] = useState({
        // Si editando, usa la data del juego; si creando, usa valores iniciales vacíos
        titulo: isEditing ? game.titulo : '',
        genero: isEditing ? game.genero : '',
        plataforma: isEditing ? game.plataforma : '',
        status: isEditing ? game.status : 'Pendiente', // Valor por defecto
        imagenPortada: isEditing ? game.imagenPortada : ''
    });

    // Opciones para los campos SELECT
    const generos = ["RPG", "Aventura", "FPS", "Estrategia", "Lucha", "Simulación", "Plataformas", "Otro"];
    const plataformas = ["PC", "PS5", "Xbox Series X", "Nintendo Switch", "Multiplataforma"];


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;
        setIsLoading(true);

        try {
            // 💥 2. LÓGICA CONDICIONAL DE POST vs. PUT 💥
            const gameId = isEditing ? game._id : '';
            const initialUrl = isEditing ? `/api/juegos/${gameId}` : '/api/juegos';
            const method = isEditing ? 'PUT' : 'POST';
            
            const API_URL = `http://localhost:7000${initialUrl}`;
            
            const response = await axios({
                method: method, 
                url: API_URL,
                data: formData, // Los datos a enviar
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            // 💥 3. LLAMAR AL CALLBACK CORRECTO 💥
            if (isEditing) {
                onUpdate(response.data); // Actualiza el estado de Home para PUT
            } else {
                onCreate(response.data); // Añade el nuevo juego al estado de Home para POST
            }
            
            setIsLoading(false);

        } catch (error) {
            console.error(`Error al ${isEditing ? 'editar' : 'crear'} el juego:`, error);
            alert(`Fallo la ${isEditing ? 'actualización' : 'creación'}.`);
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose} style={modalStyles.backdrop}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={modalStyles.content}>
                <h3>{isEditing ? `Editar ${game.titulo}` : 'Crear Nuevo Juego'}</h3>
                
                <form onSubmit={handleSubmit} style={modalStyles.form}>
                    
                    {/* 💥 4. CAMPOS DE SELECCIÓN Y URL 💥 */}
                    <label>Título: <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required /></label>
                    
                    <label>Género: 
                        <select name="genero" value={formData.genero} onChange={handleChange}>
                            <option value="">Seleccionar Género</option>
                            {generos.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                    </label>

                    <label>Plataforma: 
                        <select name="plataforma" value={formData.plataforma} onChange={handleChange}>
                            <option value="">Seleccionar Plataforma</option>
                            {plataformas.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </label>

                    <label>Estado:
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Jugando">Jugando</option>
                            <option value="Terminado">Terminado</option>
                            <option value="Abandonado">Abandonado</option>
                            <option value="Sin Clasificar">Sin Clasificar</option>
                        </select>
                    </label>
                    
                    <label>URL de Imagen: <input type="url" name="imagenPortada" value={formData.imagenPortada} onChange={handleChange} /></label>


                    <button type="submit" disabled={isLoading} style={modalStyles.buttonSave}>
                        {isLoading ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Juego')}
                    </button>
                    <button type="button" onClick={onClose} style={modalStyles.buttonCancel}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

// Estilos básicos para que el modal se muestre (Se asume que ya tienes esto en tu código)
const modalStyles = {
    backdrop: {
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', 
        alignItems: 'center', zIndex: 1000 
    },
    content: {
        backgroundColor: '#fff', padding: '30px', borderRadius: '10px', 
        width: '90%', maxWidth: '400px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
    },
    form: {
        display: 'flex', flexDirection: 'column', gap: '15px' 
    },
    buttonSave: {
        backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' 
    },
    buttonCancel: {
        backgroundColor: '#f44336', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' 
    }
};


export default GameFormModal;