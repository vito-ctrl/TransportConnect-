import React, { useState } from 'react';

export default function CreateTrajetForm() {
  const [formData, setFormData] = useState({
    departureLocation: '',
    stops: '',
    destination: '',
    departureDate: '',
    goodsType: 'other',
    maxDimensions: {
      length: '',
      width: '',
      height: ''
    },
    maxWeight: '',
    availableCapacity: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('maxDimensions.')) {
      const dimension = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        maxDimensions: {
          ...prev.maxDimensions,
          [dimension]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  const token = localStorage.getItem('authToken');

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Prepare data for submission
      const submitData = {
        ...formData,
        stops: formData.stops ? formData.stops.split(',').map(stop => stop.trim()) : [],
        maxDimensions: {
          length: parseInt(formData.maxDimensions.length) || 0,
          width: parseInt(formData.maxDimensions.width) || 0,
          height: parseInt(formData.maxDimensions.height) || 0
        },
        maxWeight: parseInt(formData.maxWeight),
        availableCapacity: parseInt(formData.availableCapacity)
      };

        try {
            if (!token) {
                console.error('No token provided');
                return;
            }

            const res = await fetch('/api/trajet/createTrajet', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submitData)
            });

            const data = await res.json();

            if (res.ok) {
                console.log('Trajet created successfully:', data);
                // Optionally reset form or redirect user
            } else {
                console.error('Failed to create trajet:', data.message || data);
            }
        } catch (error) {
            console.error('Network error:', error);
        }

      
      // Mock API response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('Trajet créé avec succès!');
      
      setFormData({
        departureLocation: '',
        stops: '',
        destination: '',
        departureDate: '',
        goodsType: 'other',
        maxDimensions: {
          length: '',
          width: '',
          height: ''
        },
        maxWeight: '',
        availableCapacity: ''
      });

    } catch (error) {
      console.error('Error:', error);
      setMessage('Erreur lors de la création du trajet');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Publier un trajet</h2>
      </div>

      {message && (
        <div className={`mb-4 p-4 rounded ${
          message.includes('succès') 
            ? 'bg-green-100 text-green-700 border border-green-300' 
            : 'bg-red-100 text-red-700 border border-red-300'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Departure Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lieu de départ *
          </label>
          <input
            type="text"
            name="departureLocation"
            value={formData.departureLocation}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ex: Casablanca"
          />
        </div>

        {/* Stops */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Arrêts intermédiaires
          </label>
          <input
            type="text"
            name="stops"
            value={formData.stops}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ex: Rabat, Fès (séparer par des virgules)"
          />
          <p className="text-sm text-gray-500 mt-1">Optionnel - séparer les villes par des virgules</p>
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destination *
          </label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ex: Oujda"
          />
        </div>

        {/* Departure Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date et heure de départ *
          </label>
          <input
            type="datetime-local"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Goods Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de marchandises *
          </label>
          <select
            name="goodsType"
            value={formData.goodsType}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="food">Nourriture</option>
            <option value="fragile">Fragile</option>
            <option value="liquid">Liquide</option>
            <option value="electronics">Électronique</option>
            <option value="other">Autre</option>
          </select>
        </div>

        {/* Max Dimensions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dimensions maximales (cm)
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Longueur</label>
              <input
                type="number"
                name="maxDimensions.length"
                value={formData.maxDimensions.length}
                onChange={handleInputChange}
                min="0"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="120"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Largeur</label>
              <input
                type="number"
                name="maxDimensions.width"
                value={formData.maxDimensions.width}
                onChange={handleInputChange}
                min="0"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="80"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Hauteur</label>
              <input
                type="number"
                name="maxDimensions.height"
                value={formData.maxDimensions.height}
                onChange={handleInputChange}
                min="0"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="100"
              />
            </div>
          </div>
        </div>

        {/* Max Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Poids maximal (kg) *
          </label>
          <input
            type="number"
            name="maxWeight"
            value={formData.maxWeight}
            onChange={handleInputChange}
            required
            min="1"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="200"
          />
        </div>

        {/* Available Capacity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Capacité disponible (kg) *
          </label>
          <input
            type="number"
            name="availableCapacity"
            value={formData.availableCapacity}
            onChange={handleInputChange}
            required
            min="1"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="150"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg font-medium transition duration-200 ${
            isSubmitting
              ? 'bg-black cursor-not-allowed'
              : 'bg-gray-800 hover:bg-gray-900'
          } text-white`}
        >
          {isSubmitting ? 'Publication en cours...' : 'Publier le trajet'}
        </button>
      </form>
    </div>
  );
}