// src/components/TarjetaJuego.jsx
import React from 'react';
import './TarjetaJuego.css'; 
import { useAuthContext } from '../hooks/useAuthContext';

// 💥 CORRECCIÓN 1: Agregar 'onEdit' a las props
const TarjetaJuego = ({ game, onDelete, onEdit }) => { 
    const { user } = useAuthContext(); 
    
    const statusClass = (status) => {
        switch (status) {
            case 'Terminado':
                return 'status-complete';
            case 'Jugando':
                return 'status-playing';
            case 'Pendiente':
                return 'status-pending';
            case 'Abandonado': // 💥 CORRECCIÓN 1: Clase para Abandonado
                return 'status-abandonado';
            default:
                return 'status-default';
        }
    };
    
    // Lógica DELETE (Se mantiene intacta)
    const handleDelete = async () => {
        if (!user || !user.token) {
            alert('Debes estar logueado para eliminar un juego.');
            return; 
        }
        // ... (resto de la lógica DELETE) ...
        const response = await fetch(`http://localhost:7000/api/juegos/${game._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`, 
            }
        });

        if (response.ok) {
            if (onDelete) {
                onDelete(game._id); 
            }
        } else {
            console.error('Error al eliminar:', await response.json());
            alert('Error al eliminar el juego. Revisa la consola del navegador.');
        }
    };

    // La función handleEdit fue eliminada y reemplazada por la prop onEdit

    return (
        <div className={`game-card ${statusClass(game.status)}`}>
            {game.imagenPortada && (
                <img src={game.imagenPortada} alt={`Portada de ${game.titulo}`} className="game-cover" />
            )}

            <div className="game-details">
                <h3>{game.titulo}</h3>
                <p><strong>Género:</strong> {game.genero || 'N/A'}</p>
                <p><strong>Plataforma:</strong> {game.plataforma}</p>
                
                {/* 💥 CORRECCIÓN 2: Aplicar la clase de estado al tag de estado */}
                <div className={`status-tag ${statusClass(game.status)}`}> 
                    Estado: {game.status}
                </div>
            </div>
            
            <div className="game-actions">
                <button 
                    className="edit-btn" 
                    onClick={onEdit} 
                >
                    Editar
                </button>
                <button 
                    className="delete-btn" 
                    onClick={handleDelete}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default TarjetaJuego;