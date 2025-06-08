import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

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
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZW1vX3VzZXIiLCJleHAiOjE3NDkzODc5ODJ9.swPa9rkF1VPIGvX9S8XLBQ3WCSBiylvAworxkZHnZGQ", // Replace with demo token
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

  return (
    <div className="App">
      <h1>Aberdeen Weather</h1>
      <button onClick={fetchWeather} disabled={loading}>
        {loading ? "Loading..." : "Refresh"}
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weatherData.length === 0 && !loading && !error && <p>No data available</p>}
      {weatherData.length > 0 && (
        <table>
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