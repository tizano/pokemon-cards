import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CardForm from "../CardForm/CardForm.component";
import { getCardById, updateCardById } from "../../services/pokemon.services";
import './CardDetail.component.scss';

function CardDetail() {
  const [card, setCard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchCard = async () => {
      setError(false);
      setIsLoading(true);
      try {
        const result = await getCardById(id);
        setCard(result.data);
      } catch (err) {
        setError(true);
      }
      setIsLoading(false);
    };
    fetchCard();
  }, [id]);

  const handleUpdate = async(values) => {
    setError(false);
    setIsLoading(true);
    try {
      const result = await updateCardById(id, values);
      setCard(result.data);
      setIsUpdated(true);
    } catch (err) {
      setError(true);
    }
    setIsLoading(false);
  }

  return (
    <>
      {error && <div>Une erreur est survenue</div>}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="container--double">
          <div className="card__detail">
            <Link to="/" className="nav__back">Retour à la liste des cartes</Link>
            <div className="card__detail__content">
              <h2>{card.name}</h2>
              <p>Categorie : {card.category}</p>
              <p>{card.description}</p>
            </div>
            <figure>
              <img src={card.image} alt={card.name} />
            </figure>
          </div>
          <CardForm
            category={card.category}
            image={card.image}
            name={card.name}
            description={card.description}
            label="Modifier"
            action="update"
            updated={isUpdated}
            onUpdate={handleUpdate}
          />
        </div>
      )}
    </>
  )
}

export default CardDetail;
