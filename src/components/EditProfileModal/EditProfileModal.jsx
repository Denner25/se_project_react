import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormValidator from "../../hooks/useFormValidator";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ isOpen, onClose, onOverlayClose, onSubmit }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, errors, isValid, handleChange, resetForm } = useFormValidator(
    {
      name: "",
      avatar: "",
    }
  );

  useEffect(() => {
    if (isOpen && currentUser) {
      resetForm({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(values);
    }
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      onClose={onClose}
      isOpen={isOpen}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="modal__label">
        Name *
        <input
          type="text"
          className="modal__input"
          name="name"
          placeholder="Your name"
          minLength="2"
          maxLength="30"
          required
          value={values.name}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.name}</span>
      </label>
      <label className="modal__label">
        Avatar *
        <input
          type="url"
          className="modal__input"
          name="avatar"
          placeholder="Avatar image URL"
          required
          value={values.avatar}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.avatar}</span>
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
