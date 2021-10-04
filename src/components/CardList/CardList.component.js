import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Card from "../Card/Card.component";
import AddCard from "../AddCard/AddCard.component";
import Filters from "../Filters/Filters.component";
import MOCK_CATEGORY from '../../datas/category.mock';
import { getCards, deleteCardById } from "../../services/pokemon.services";

import './CardList.component.scss';

function CardList() {
  const [cards, setCards] = useState([]);
  const [cardsFiltered, setCardsFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);
  const history = useHistory();

  const fetchCards = async () => {
    setError(false);
    setIsLoading(true);
    try {
      const result = await getCards();
      // on sauvegarde le resulat de recupération
      // de toutes les cartes dans le state cards
      setCards(result.data);
      // on sauvegarde le resulat de recupération
      // de toutes les cartes dans le state cardsFiltered
      // afin de pouvoir filtrer et comparer les 2 tableaux de state
      setCardsFiltered(result.data);
    } catch (err) {
      setError(true);
    }
    setIsLoading(false);
  };

  // Equivalent du componentDidMount
  useEffect(() => {
    setCategories(MOCK_CATEGORY);
    fetchCards();
  }, []);

  const handleFilter = (e) => {
    // il faut recupérer le state precédent pour mettre à jour le suivant
    // si on utilise setCategories sans callback, le handleFilter a un de décalage
    // par rapport aux checkbox cochés en front
    setCategories((prevState) => {

      const filters = prevState.filter(cat => cat !== e.target.value);
      if (e.target.checked) {
        filters.push(e.target.value);
      }

      // on filtre le state cards avec les filtres actifs
      // puis on met à jour le state cardsFiltered avec le nouveau tableau newCards
      // on utilise le state cards car il contient les anciennes valeurs non filtrées
      const newCards = cards.filter(card => filters.includes(card.category));
      setCardsFiltered(newCards);
      return filters;
    });
  }

  const handleDelete = async (id) => {
    setError(false);
    setIsLoading(true);
    try {
      await deleteCardById(id);
      const newCards = cards.filter(card => card._id !== id);
      setCards(newCards);
      setCardsFiltered(newCards);
    } catch (err) {
      setError(true);
    }
    setIsLoading(false);
  }

  const handleViewDetail = (id) => {
    history.push(`/card/${id}`);
  }

  const handleClickAdd = () => {
    history.push('/card/add');
  }

  const displayCards = () => (cardsFiltered.map((card) => (
    <Card
      {...card}
      key={card._id}
      onViewDetail={handleViewDetail}
      onDelete={handleDelete}
    />
  )));

  return (
    <div>
      {error && <div>Une erreur est survenue</div>}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <>
          <Filters categoriesChecked={categories} onFilter={handleFilter} />
          <div className='cards'>
            {displayCards()}
            <AddCard onClickAdd={handleClickAdd} />
          </div>
        </>
      )}
    </div>
  );
}

export default CardList;
