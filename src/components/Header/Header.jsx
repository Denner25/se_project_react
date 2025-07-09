import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ weatherData, onSignUpClick, onLogInClick }) {
  const currentUser = useContext(CurrentUserContext);

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
        {currentUser ? (
          <div className="header__user-info">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar-placeholder">
                {currentUser.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="header__username">{currentUser.name}</span>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
