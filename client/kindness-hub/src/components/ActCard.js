import React from 'react';
import './Home';

const ActCard = ({ act }) => {
  const { title, category, description, image, tags } = act;

  return (
    <div className="act-card">
      <img src={image} alt={title} />
      <div className="act-details">
        <h3>{title}</h3>
        <p>Category: {category}</p>
        <p>{description}</p>
        <div className="tags">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActCard;
