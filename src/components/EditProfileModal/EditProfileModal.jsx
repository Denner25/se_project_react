import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ isOpen, onClose, onOverlayClose, onSubmit }) {
  const currentUser = useContext(CurrentUserContext);

  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen && currentUser) {
      setFormData({
        name: currentUser.name,
        avatar: currentUser.avatar,
      });
    }
  }, [isOpen, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      buttonClassName="modal__submit modal__submit_type_edit-profile"
      onClose={onClose}
      isOpen={isOpen}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
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
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Avatar *
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

export default EditProfileModal;
