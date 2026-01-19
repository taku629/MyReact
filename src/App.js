import {use, useStates} from "react";
export default function App(){
  const [city, setCity] = useState("Tokyo");
  const [weater, setWeather] = useState(null);//取得した天気データ
  const [loading, setLoding] = useState(false);
  const [error, setError] = useState("")

  const handleSearch = async() => {

  };

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Weather App</h1>
      <div style = {{ display: "flex", gap: 8}}> 
        <input
        value = {city}
        onChange = {(e) => setCity(e.taeget.value)}
        placeholder= "City(e.g. Tokyo)"
        style={{flex: 1, pandding: 10}}
        />
      <button onClick= {handleSearch} style ={{ pandding : "10px 14px"}}>
        Search
      </button>
    </div>
  <div style = {{marginTop: 16}}>
    {loading && <p>Loading...</p>}
    {error && <p style ={{ color: " crimson"}}> {error}</p>}

    {weather && !loading &&(
      <div style={{ border: "1px solid #add", padding: 12, borderRadius: 8}}>
        <h2 style={{margin: "0 0 8px"}}>{weather.city}</h2>
        <p style={{ margin: 0}}> Temperature: {weather.temp}°C</p>
        <p style={{ margin: 0}}> Wind: {weather.wind}m/s</p>
        <p style={{ margin:0}} > Weather code: {weather.code}</p>
      </div>
    )}
  </div>
</div>
  );
}
