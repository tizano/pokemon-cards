import React, { memo } from "react";
import { useHistory } from "react-router-dom";
import "./AddCard.component.scss";

function AddCard() {
  const history = useHistory();

  const handleClick = () => {
    history.push('/card/add');
  }

  return (
    <div className="card card__add" onClick={handleClick}>
      <span className="card__add--plus">+</span>
    </div>
  );
}

export default memo(AddCard);
