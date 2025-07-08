import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ onAddClick, weatherData, onSignUpClick, onLogInClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="wtwr logo" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__btn-group">
        <ToggleSwitch />
        <button
          type="button"
          className="header__auth-btn"
          onClick={onSignUpClick}
        >
          Sign Up
        </button>
        <button
          type="button"
          className="header__auth-btn"
          onClick={onLogInClick}
        >
          Log In
        </button>
      </div>
    </header>
  );
}

export default Header;
