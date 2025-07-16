import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

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
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Profile from "../Profile/Profile";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  updateProfile,
} from "../../utils/Api";
import { signUp, signIn, checkToken } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

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
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

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
  const handleSignUpClick = () => setActiveModal("register");
  const handleLogInClick = () => setActiveModal("log-in");
  const handleEditProfileClick = () => setActiveModal("edit-profile");

  const handleAddItem = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    addItem({ name, imageUrl, weather }, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem.data, ...prevItems]);
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
        // Fetch user info right after login
        checkToken(res.token)
          .then((user) => {
            setCurrentUser(user);
            closeActiveModal();
            navigate("/profile");
          })
          .catch(console.error);
      })
      .catch(console.error);
  };

  const handleEditProfileSubmit = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    updateProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    closeActiveModal();
    navigate("/");
  };

  const handleCardLike = ({ _id, likes }) => {
    const token = localStorage.getItem("jwt");
    const isLiked = likes.some((id) => id === currentUser?._id);

    const updateState = (updatedCard) => {
      setClothingItems((cards) =>
        cards.map((item) => (item._id === _id ? updatedCard.data : item))
      );
    };

    if (!isLiked) {
      addCardLike(_id, token).then(updateState).catch(console.error);
    } else {
      removeCardLike(_id, token).then(updateState).catch(console.error);
    }
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
        setClothingItems(data.data.sort((a, b) => b._id - a._id));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setCurrentUser(null);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwtichChange }}
      >
        <div className="app">
          <div className="app__content">
            <Header
              onAddClick={handleAddClick}
              weatherData={weatherData}
              onSignUpClick={handleSignUpClick}
              onLogInClick={handleLogInClick}
              currentUser={currentUser}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
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
                      onEditProfile={handleEditProfileClick}
                      onLogOut={handleLogOut}
                      onCardLike={handleCardLike}
                      currentUser={currentUser}
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
            onSignUp={handleSignUp}
            isOpen={activeModal === "register"}
            onLogInClick={handleLogInClick}
          />
          <LogInModal
            onClose={closeActiveModal}
            activeModal={activeModal}
            onOverlayClose={handleOverlayClose}
            onLogIn={handleLogIn}
            isOpen={activeModal === "log-in"}
            onSignUpClick={handleSignUpClick}
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
          <EditProfileModal
            onClose={closeActiveModal}
            activeModal={activeModal}
            onOverlayClose={handleOverlayClose}
            isOpen={activeModal === "edit-profile"}
            onSubmit={handleEditProfileSubmit}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
