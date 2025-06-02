import "./ModalWithForm.css";

function ModalWithForm({ children, buttonText, title, activeModal }) {
  return (
    <div className="modal">
      <div className="modal__content">
        <button type="button" className="modal__close"></button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form">
          {children}
          <button type="button" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
