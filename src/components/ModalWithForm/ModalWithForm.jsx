import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onOverlayClose,
  onSubmit,
  secondaryButton,
  isValid,
}) {
  return (
    <div
      className={`modal${isOpen ? " modal_opened" : ""}`}
      onClick={onOverlayClose}
    >
      <div className="modal__content">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <h2 className="modal__title">{title}</h2>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__button-group">
            <button
              type="submit"
              className={`modal__submit${
                !isValid ? " modal__submit_disabled" : ""
              }`}
              disabled={!isValid}
            >
              {buttonText}
            </button>
            {secondaryButton}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
