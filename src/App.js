import { useState } from "react";

function weatherLabel(code){//weather marks
  if(code === 0) return "☀️"
  if(code <=3 ) return ""
  if(code <=48) return ""
  if(code <=67) return ""
  if(code <=77) return ""
  if(code <=82) return ""
  if(code <=99) return ""
  return "Unknown" 
};

export default function App() {
  const [city, setCity] = useState("Tokyo");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const q = city.trim();
    if (!q) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      // city name, longitude, latitide
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          q
        )}&count=1&language=en&format=json`
      );
      if (!geoRes.ok) throw new Error("Failed to fetch geocoding");
      const geo = await geoRes.json();

      if (!geo.results || geo.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude, longitude, name, country } = geo.results[0];

      // get weather
      const wRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m`
      );
      if (!wRes.ok) throw new Error("Failed to fetch weather");
      const w = await wRes.json();

      const current = w.current;

      setWeather({
        city: `${name}${country ? " (" + country + ")" : ""}`,
        temp: current.temperature_2m,
        wind: current.wind_speed_10m,
        code: current.weather_code,
      });
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Weather App</h1>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City (e.g. Tokyo)"
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={handleSearch} style={{ padding: "10px 14px" }}>
          Search
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "crimson" }}>{error}</p>}

        {weather && !loading && (
          <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
            <h2 style={{ margin: "0 0 8px" }}>{weather.city}</h2>
            <p>Temperature: {weather.temp} °C</p>
            <p>Wind: {weather.wind} m/s</p>
            <p>Weather code: {weather.code}</p>
          </div>
        )}
      </div>
    </div>
  );
}
