const Modal = ({ open, onClose, title, children, footer }) => {
  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal>
      <div className="modal-shell">
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
