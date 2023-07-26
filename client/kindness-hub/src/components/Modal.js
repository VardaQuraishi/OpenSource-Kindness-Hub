// Modal.js

import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import '../styles/Modal.css';

const Tag = ({ text }) => {
  return <div className="tag">{text}</div>;
};

const Modal = ({ act, onClose }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains('modal-container')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="modal-container">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <img className="modal-image" src={act.image} alt={act.title} />
        <h2>{act.title}</h2>
        <p>Category | {act.category}</p>
        <p>{act.description}</p>
        <div className="tags-container">
          {act.tags.map((tag, index) => (
            <Tag key={index} text={tag} />
          ))}
        </div>

        {/* Add attractive styling for the "Let's Do It" button */}
        <button className="lets-do-it-button">Let's Do It</button>
      </div>
    </div>
  );
};

export default Modal;
