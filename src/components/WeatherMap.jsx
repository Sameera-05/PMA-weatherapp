import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const LocationMarker = ({ onLocationClick }) => {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        );
        onLocationClick({
          name: res.data.name || `Lat: ${lat.toFixed(2)}, Lon: ${lng.toFixed(2)}`,
          temp: res.data.main.temp,
          condition: res.data.weather[0].description,
        });
      } catch {
        onLocationClick(null);
        alert('Weather info not found for this location.');
      }
    },
  });
  return null;
};

const WeatherMap = () => {
  const [weather, setWeather] = useState(null);

  return (
    <div>
      <div className="mb-4">
        <MapContainer center={[20, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <LocationMarker onLocationClick={setWeather} />
        </MapContainer>
      </div>

      {weather && (
        <div className="card shadow-sm p-4">
          <h4>📍 Location: {weather.name}</h4>
          <p>🌡️ Temperature: {weather.temp} °C</p>
          <p>🌥️ Condition: {weather.condition}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherMap;
