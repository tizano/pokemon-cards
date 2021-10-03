import React, { memo } from "react";
import PropTypes from 'prop-types';
import './Card.component.scss';

function Card({
  _id,
  category,
  image,
  name,
  onDelete,
  onViewDetail
}) {


  const handleDeleteCard = () => {
    onDelete(_id);
  }

  const handleView = () => {
    onViewDetail(_id)
  }

  return (
    <div className="card">
      <button className="card__delete" onClick={handleDeleteCard}>x</button>
      <span className="card__category">{category}</span>
      <figure className="card__figure" onClick={handleView}>
        <img src={image} alt={name} />
      </figure>
    </div>
  )
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  onViewDetail: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  image: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string
};

export default memo(Card);
