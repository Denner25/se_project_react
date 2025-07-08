import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

function RegisterModal({
  onClose,
  activeModal,
  onOverlayClose,
  onSignUp,
  isOpen,
  onLogInClick,
}) {
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setFormData({
      name: "",
      avatar: "",
      email: "",
      password: "",
    });
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      onClose={onClose}
      isOpen={activeModal === "register"}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
      secondaryButton={
        <button
          type="button"
          className="modal__secondary"
          onClick={onLogInClick}
        >
          or Sign In
        </button>
      }
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          name="password"
          placeholder="Password"
          minLength="6"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          name="name"
          placeholder="Your name"
          minLength="2"
          maxLength="32"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          name="avatar"
          placeholder="Avatar image URL"
          required
          value={formData.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
