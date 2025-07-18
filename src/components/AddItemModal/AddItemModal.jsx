import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import useFormValidator from "../../hooks/useFormValidator";

function AddItemModal({
  onClose,
  activeModal,
  onOverlayClose,
  onAddItem,
  isOpen,
}) {
  const { values, errors, isValid, handleChange, resetForm } = useFormValidator(
    {
      name: "",
      imageUrl: "",
      weather: "",
    }
  );

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onAddItem({
        name: values.name,
        imageUrl: values.imageUrl,
        weather: values.weather,
      });
    }
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      onClose={onClose}
      isOpen={activeModal === "add-garment"}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <div className="modal__label-container">
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
            name="name"
            required
            minLength="1"
            maxLength="30"
            value={values.name}
            onChange={handleChange}
          />
          <span className="modal__error">{errors.name}</span>
        </label>
      </div>
      <div className="modal__label-container">
        <label htmlFor="imageUrl" className="modal__label">
          Image
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
            name="imageUrl"
            required
            value={values.imageUrl}
            onChange={handleChange}
          />
          <span className="modal__error">{errors.imageUrl}</span>
        </label>
      </div>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <div className="modal__radio-container">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="hot"
            onChange={handleChange}
            checked={values.weather === "hot"}
            required
          />
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            Hot
          </label>
        </div>
        <div className="modal__radio-container">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="warm"
            onChange={handleChange}
            checked={values.weather === "warm"}
            required
          />
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            Warm
          </label>
        </div>
        <div className="modal__radio-container">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input modal__radio-input_last"
            name="weather"
            value="cold"
            onChange={handleChange}
            checked={values.weather === "cold"}
            required
          />
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            Cold
          </label>
        </div>
        <span className="modal__error">{errors.weather}</span>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
