import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, onOverlayClose }) {
  return (
    <div
      className={`modal ${activeModal === "preview" && "modal_opened"}`}
      onClick={onOverlayClose}
    >
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_preview"
        ></button>
        {/* using card.link instead of item.link because we're calling it card in this compenent */}
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__description">
          <h2 className="modal__description-name">{card.name}</h2>
          <p className="modal__description-weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
