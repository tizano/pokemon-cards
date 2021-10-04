import React, { memo } from "react";
import PropTypes from 'prop-types';
import "./AddCard.component.scss";

function AddCard({ onClickAdd }) {
  return (
    <div className="card card__add" onClick={onClickAdd}>
      <span className="card__add--plus">+</span>
    </div>
  );
}

AddCard.propTypes = {
  onClickAdd: PropTypes.func.isRequired
}


export default memo(AddCard);
