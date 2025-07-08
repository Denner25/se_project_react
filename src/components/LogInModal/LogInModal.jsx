import "./LogInModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

function LogInModal({
  onClose,
  activeModal,
  onOverlayClose,
  onLogIn,
  isOpen,
  onSignUpClick,
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setFormData({ email: "", password: "" });
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogIn(formData);
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      onClose={onClose}
      isOpen={activeModal === "log-in"}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
      secondaryButton={
        <button
          type="button"
          className="modal__secondary"
          onClick={onSignUpClick}
        >
          or Sign Up
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
    </ModalWithForm>
  );
}

export default LogInModal;
