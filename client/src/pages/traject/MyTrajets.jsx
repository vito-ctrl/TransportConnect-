import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyTrajets() {
  const [trajets, setTrajets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyTrajets = async () => {
    try {
      const token = localStorage.getItem('authToken');

      // Fixed: Remove the hardcoded :id and let the backend get the user ID from the token
      const response = await axios.get('http://localhost:3000/api/trajet/driver/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTrajets(response.data.data || response.data.trajets || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des trajets :', error);
      setTrajets([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTrajets();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Chargement...</p>;

  if (trajets.length === 0)
    return <p className="text-center text-gray-500">Aucun trajet trouvé.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Mes trajets</h2>
      <div className="space-y-4">
        {trajets.map((trajet) => (
          <div key={trajet._id} className="border p-4 rounded shadow-sm bg-white">
            <p><strong>Départ :</strong> {trajet.departureLocation}</p>
            <p><strong>Destination :</strong> {trajet.destination}</p>
            <p><strong>Date :</strong> {new Date(trajet.departureDate).toLocaleString()}</p>
            <p><strong>Type de marchandise :</strong> {trajet.goodsType}</p>
            <p><strong>Capacité disponible :</strong> {trajet.availableCapacity} kg</p>
          </div>
        ))}
      </div>
    </div>
  );
}