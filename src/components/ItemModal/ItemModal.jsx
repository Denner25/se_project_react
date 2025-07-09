import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, onClose, card, onOverlayClose, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const handleDelete = () => {
    onDelete(card._id);
  };

  const isOwn = card.owner === currentUser?._id;

  return (
    <div
      className={`modal${isOpen ? " modal_opened" : ""}`}
      onClick={onOverlayClose}
    >
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_preview"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__description">
          <div className="modal__description-text">
            <h2 className="modal__description-name">{card.name}</h2>
            <p className="modal__description-weather">
              Weather: {card.weather}
            </p>
          </div>
          {isOwn && (
            <button onClick={handleDelete} className="modal__delete-button">
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
