// src/pages/Estadisticas.jsx
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import './Estadisticas.css'; 

const Estadisticas = () => {
    const { user } = useAuthContext();
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            console.log('Token antes del fetch:', user?.token);
            if (!user || !user.token) {
                setLoading(false);
                return;
            }

            try {
                // 💥 CORRECCIÓN CRUCIAL: Cambiar el puerto a 7000 💥
                const API_URL = 'http://localhost:7000/api/juegos/stats'; 

                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                    }
                });

                const json = await response.json();

                if (!response.ok) {
                    throw new Error(json.error || 'No se pudieron cargar las estadísticas.');
                }
                
                setStats(json);
                setLoading(false);

            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchStats();
    }, [user]);

    // Calcular el total de juegos para el porcentaje
    // Esta línea funcionará correctamente porque el Backend ya maneja los valores nulos (null)
    const totalGames = stats.reduce((sum, item) => sum + item.count, 0); 

    // Función para generar nombres de clase CSS válidos
    const generateClass = (status) => {
        // Convierte "Sin Clasificar" a "sin-clasificar"
        return status ? status.toLowerCase().replace(/\s/g, '-') : 'sin-clasificar';
    };


    if (loading) {
        return <div className="stats-container loading-screen">Calculando tus métricas...</div>;
    }

    if (error) {
        return <div className="stats-container error-message">Error al cargar estadísticas: {error}</div>;
    }

    return (
        <div className="stats-container">
            <h2>📈 Dashboard de Estadísticas Personales</h2>
            
            {totalGames === 0 ? (
                <p>Aún no tienes juegos clasificados para calcular estadísticas. ¡Actualiza el estado de tus juegos!</p>
            ) : (
                <div className="stats-grid">
                    <h3>Total de Juegos en Biblioteca: {totalGames}</h3>
                    
                    {stats.map((item) => (
                        <div 
                            key={item._id || 'unclassified'} // Usa 'unclassified' si el ID es null (Sin Clasificar)
                            // Aplica la clase CSS correcta (ej. stat-sin-clasificar)
                            className={`stat-card stat-${generateClass(item._id)}`}
                        >
                            
                            {/* Muestra el nombre de la categoría (ej. Sin Clasificar) */}
                            <h4>{item._id || 'Sin Clasificar'}</h4> 
                            
                            <p className="stat-count">{item.count}</p>
                            
                            <p className="stat-percent">
                                {((item.count / totalGames) * 100).toFixed(1)}% del total
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Estadisticas;