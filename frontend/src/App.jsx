import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8000/weather", {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZW1vX3VzZXIifQ.o88Jdd-_76Gs2s3wvjLDORBbjpBdS7pPmLl2UJbAhbA",
        },
      });
      setWeatherData(response.data);
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const currentData = weatherData.reduce((latest, current) => 
    new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest, weatherData[0] || {}
  );
  const hourlyData = weatherData.map(item => ({
    time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temp: item.temperature,
    icon: item.temperature > 13 ? "☀️🌤️" : "🌧️"
  }));

  const latestDate = currentData.timestamp ? new Date(currentData.timestamp).toLocaleString('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Europe/London'
  }).replace(' at ', ', ') + ' BST' : 'N/A';

  return (
    <div className="App">
      <h1 className="city-title">Aberdeen, UK</h1>
      <p className="date">{latestDate}</p>
      <div className="weather-card">
        <div className="current-weather">
          <div className="weather-icon">{currentData.temperature > 13 ? "☀️🌤️" : "🌧️"}</div>
          <p className="temp">{currentData.temperature?.toFixed(1) || 0}°</p>
          <p>Current</p>
        </div>
        <div className="weather-details">
          <p>Humidity {currentData.humidity || 0}%</p>
          <p>Updated {currentData.timestamp ? new Date(currentData.timestamp).toLocaleTimeString() : 'N/A'}</p>
        </div>
      </div>
      <h2 className="section-title">Todays weather</h2>
      <div className="hourly-grid">
        {hourlyData.map((hour, index) => (
          <div key={index} className="hourly-card">
            <p>{hour.time}</p>
            <div className="weather-icon">{hour.icon}</div>
            <p>{hour.temp.toFixed(1)}°</p>
          </div>
        ))}
      </div>
      <button onClick={fetchWeather} disabled={loading} className="refresh-btn">
        {loading ? "Loading..." : "Refresh"}
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weatherData.length === 0 && !loading && !error && <p>No data available</p>}
      {weatherData.length > 0 && (
        <table className="weather-table">
          <thead>
            <tr>
              <th>City</th>
              <th>Timestamp</th>
              <th>Temperature (°C)</th>
              <th>Humidity (%)</th>
            </tr>
          </thead>
          <tbody>
            {weatherData.map((data, index) => (
              <tr key={index}>
                <td>{data.city}</td>
                <td>{new Date(data.timestamp).toLocaleString()}</td>
                <td>{data.temperature}</td>
                <td>{data.humidity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;