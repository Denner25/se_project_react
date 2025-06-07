import "./WeatherCard.css";
import sunny from "../../assets/sunny.png";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {/* bracket notation accesses the value for the current unit */}
        {weatherData.temp[currentTemperatureUnit]}°{currentTemperatureUnit}
      </p>
      <img src={sunny} alt="sunny" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
