import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BACKEND_URL = 'http://localhost:5000';

const CurrentWeather = () => {
  const [location, setLocation] = useState('');
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [air, setAir] = useState(null);
  const [uv, setUV] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  const downloadFile = (format) => {
    const url = `${BACKEND_URL}/export/${format}`;
    window.open(url, '_blank');
  };

  const saveSearch = async (location, temperature) => {
    try {
      await axios.post(`${BACKEND_URL}/search`, { location, temperature });
      fetchSearches();
    } catch (error) {
      console.error('Failed to save search:', error);
    }
  };

  const fetchSearches = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/searches`);
      setRecentSearches(res.data);
    } catch (error) {
      console.error('Failed to fetch searches:', error);
    }
  };

  const deleteRow = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/search/${id}`);
      fetchSearches();
    } catch (error) {
      alert('Failed to delete entry');
    }
  };

  const enableEdit = (index) => {
    setRecentSearches((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, editing: true, newLocation: item.location } : item
      )
    );
  };

  const handleLocationChange = (index, value) => {
    setRecentSearches((prev) =>
      prev.map((item, i) => (i === index ? { ...item, newLocation: value } : item))
    );
  };

  const cancelEdit = (index) => {
    setRecentSearches((prev) =>
      prev.map((item, i) => (i === index ? { ...item, editing: false } : item))
    );
  };

  const saveEdit = async (index, id) => {
    const updatedItem = recentSearches[index];
    try {
      await axios.put(`${BACKEND_URL}/search/${id}`, {
        location: updatedItem.newLocation,
      });
      fetchSearches();
    } catch (error) {
      alert('Failed to update location');
    }
  };

  const getWeatherByCoords = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setData(res.data);
      saveSearch(res.data.name, res.data.main.temp);
    } catch {
      alert('❌ Failed to get current weather.');
      setData(null);
    }

    try {
      const airRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      setAir(airRes.data.list[0]);
    } catch {
      setAir(null);
    }

    try {
      const uvRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${API_KEY}`
      );
      setUV(uvRes.data.current.uvi);
    } catch {
      setUV(null);
    }

    try {
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const daily = forecastRes.data.list.filter((item) =>
        item.dt_txt.includes('12:00:00')
      );
      setForecast(daily.slice(0, 5));
    } catch (err) {
      console.error('Forecast error:', err);
      setForecast([]);
    }
  };

  const getWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );
      const { lat, lon } = res.data.coord;
      getWeatherByCoords(lat, lon);
      fetchSearches();
    } catch {
      alert('❌ Location not found.');
    }
  };

  const getCurrentLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        getWeatherByCoords(latitude, longitude);
        fetchSearches();
      },
      () => {
        alert("❌ Couldn't access your location.");
      }
    );
  };

  const getDay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card p-4 shadow border-0">
            <h3 className="text-center mb-4">🌦️ Check Current Weather</h3>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="📍 Enter city or zip code"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button className="btn btn-primary" onClick={getWeather}>
                🔍 Search
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={getCurrentLocationWeather}
              >
                📍 My Location
              </button>
            </div>

            {/* Export Buttons */}
            <div className="mb-3 text-end">
              <button
                className="btn btn-sm btn-outline-success me-2"
                onClick={() => downloadFile('csv')}
              >
                ⬇️ Export CSV
              </button>
              <button
                className="btn btn-sm btn-outline-info"
                onClick={() => downloadFile('json')}
              >
                ⬇️ Export JSON
              </button>
            </div>

            {data && (
              <div className="mt-4">
                <h4 className="text-primary">{data.name}</h4>
                <img
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt="icon"
                />
                <p>
                  <strong>{data.weather[0].main}</strong> - {data.weather[0].description}
                </p>
                <p>🌡️ <strong>Temperature:</strong> {data.main.temp} °C</p>
                <p>💧 <strong>Humidity:</strong> {data.main.humidity}%</p>
                <p>🌬️ <strong>Wind:</strong> {data.wind.speed} m/s</p>
                {air && <p>🌫️ <strong>Air Quality Index:</strong> {air.main.aqi} (1=Good, 5=Hazardous)</p>}
                {uv !== null && <p>🔆 <strong>UV Index:</strong> {uv}</p>}
              </div>
            )}

            {forecast.length > 0 && (
              <>
                <h5 className="mt-4">🗓️ 5-Day Forecast</h5>
                <div className="d-flex flex-wrap justify-content-around gap-3">
                  {forecast.map((item, index) => (
                    <div
                      key={index}
                      className="card p-3 text-center"
                      style={{ width: '110px', background: '#f1f1f1' }}
                    >
                      <strong>{getDay(item.dt_txt)}</strong>
                      <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt="icon"
                      />
                      <div>{item.main.temp.toFixed(0)}°C</div>
                      <small>{item.weather[0].main}</small>
                    </div>
                  ))}
                </div>
              </>
            )}

            {recentSearches.length > 0 && (
              <div className="mt-5">
                <h5>🧾 Recent Searches</h5>
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Location</th>
                      <th>Temperature (°C)</th>
                      <th>Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSearches.map((item, index) => (
                      <tr key={item.id || index}>
                        <td>{index + 1}</td>
                        <td>
                          {item.editing ? (
                            <input
                              type="text"
                              value={item.newLocation}
                              onChange={(e) => handleLocationChange(index, e.target.value)}
                              className="form-control"
                            />
                          ) : (
                            item.location
                          )}
                        </td>
                        <td>{item.temperature.toFixed(1)}</td>
                        <td>
                          {new Date(item.timestamp).toLocaleString(undefined, {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </td>
                        <td>
                          {item.editing ? (
                            <>
                              <button
                                className="btn btn-sm btn-success me-2"
                                onClick={() => saveEdit(index, item.id)}
                              >
                                💾 Save
                              </button>
                              <button
                                className="btn btn-sm btn-secondary"
                                onClick={() => cancelEdit(index)}
                              >
                                ❌ Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => enableEdit(index)}
                              >
                                ✏️ Edit
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteRow(item.id)}
                              >
                                🗑️ Delete
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ABOUT SECTION */}
            <div id="about" className="mt-5 p-4 border-top">
              <h4 className="mb-2">👤 About This App</h4>
              <p><strong>Created by:</strong> Sameera Sineen</p>
              <p>
                This weather app is part of a project built under the guidance of the{' '}
                <a
                  href="https://www.linkedin.com/school/pmaccelerator/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Product Manager Accelerator
                </a>. Our Product Manager Accelerator community are ambitious and committed.
                Through our program they have learnt, honed and developed new PM and leadership
                skills, giving them a strong foundation for their future endeavors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
