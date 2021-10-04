import React, { memo } from "react";
import PropTypes from 'prop-types';
import './Card.component.scss';

function Card({
  _id,
  name,
  category,
  image,
  onViewDetail,
  onDelete
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
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  image: PropTypes.string,
  onViewDetail: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default memo(Card);
