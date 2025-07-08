import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LogInModal from "../LogInModal/LogInModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import { getItems, addItem, deleteItem } from "../../utils/Api";
import { signUp, signIn, checkToken } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleSwtichChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleOverlayClose = (e) => {
    if (e.target === e.currentTarget) {
      closeActiveModal();
    }
  };

  const handleAddItem = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    addItem({ name, imageUrl, weather }, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("jwt");
    deleteItem(id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleSignUp = ({ name, avatar, email, password }) => {
    signUp({ name, avatar, email, password })
      .then(() => {
        handleLogIn({ email, password });
      })
      .catch(console.error);
  };

  const handleLogIn = ({ email, password }) => {
    signIn({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.sort((a, b) => b._id - a._id));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((user) => {
          setIsLoggedIn(true);
        })
        .catch(() => {
          setIsLoggedIn(false);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwtichChange }}
    >
      <div className="app">
        <div className="app__content">
          <Header onAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onAddClick={handleAddClick}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
        <RegisterModal
          onClose={closeActiveModal}
          activeModal={activeModal}
          onOverlayClose={handleOverlayClose}
          onRegister={handleSignUp}
          isOpen={activeModal === "register"}
        />
        <LogInModal
          onClose={closeActiveModal}
          activeModal={activeModal}
          onOverlayClose={handleOverlayClose}
          onLogIn={handleLogIn}
          isOpen={activeModal === "log-in"}
        />
        <AddItemModal
          onClose={closeActiveModal}
          activeModal={activeModal}
          onOverlayClose={handleOverlayClose}
          onAddItem={handleAddItem}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          onOverlayClose={handleOverlayClose}
          onDelete={handleDelete}
          isOpen={activeModal === "preview"}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
