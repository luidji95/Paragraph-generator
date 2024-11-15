// Modal.jsx
import React from "react";

function Modal({
  isOpen,
  onClose,
  addJoke,
  newJoke,
  setNewJoke,
  errorMessage,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add a new joke</h2>
        <p>Here you can add a new joke to the list:</p>
        <input
          type="text"
          placeholder="Enter your joke here"
          className="joke-input"
          value={newJoke}
          onChange={(e) => setNewJoke(e.target.value)}
        />
        {errorMessage ? <div className="empty-string">{errorMessage}</div> : ""}
        <div className="modal-buttons">
          <button className="yes-button" onClick={addJoke}>
            Yes
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
