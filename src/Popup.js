import React from 'react';
import './Popup.css';

function Popup({ onClose, onEdit, onDelete }) {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-content">
          <h2>Actions</h2>
          <button className="popup-button" onClick={onEdit}>
            Edit
          </button>
          <button className="popup-button" onClick={onDelete}>
            Delete
          </button>
          <button className="popup-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
