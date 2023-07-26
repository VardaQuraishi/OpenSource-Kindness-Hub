// Modal.js

import React from 'react';
import { FaTimes } from 'react-icons/fa';
import '../styles/Modal.css'; // Create a new CSS file for styling the modal

const Modal = ({ act, onClose }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <h2>{act.title}</h2>
        <p>Category: {act.category}</p>
        <p>Description: {act.description}</p>
        <img src={act.image} alt={act.title} />
        <p>Tags: {act.tags.join(', ')}</p>

        {/* Add attractive styling for the "Let's Do It" button */}
        <button className="lets-do-it-button">Let's Do It</button>
      </div>
    </div>
  );
};

export default Modal;
