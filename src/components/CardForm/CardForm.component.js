import React, { useState } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createCard } from "../../services/pokemon.services";
import MOCK_CATEGORY from '../../datas/category.mock';
import './CardForm.component.scss';

function CardForm({
  action,
  label,
  category,
  image,
  name,
  description,
  updated,
  onUpdate
}) {
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCreate = async (values, callback) => {
    setError(false);
    setIsLoading(true);
    try {
      const result = await createCard(values);
      setCard(result.data);
      // le callback fait reference au resetForm de formik
      callback({ values: '' });
    } catch (err) {
      setError(true);
    }
    setIsLoading(false);
  }

  const formik = useFormik({
    initialValues: {
      name: name || '',
      category: category || '',
      description: description || '',
      image: image || '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Le nom est requis'),
      category: Yup.string()
        .required('La catégorie est requise'),
      description: Yup.string(),
      image: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      if (action === 'update') {
        onUpdate(values);
      } else {
        handleCreate(values, resetForm);
      }
    },
  });

  const displayForm = () => (
    <form onSubmit={formik.handleSubmit} className="form">
      <div className="form__group">
        <label htmlFor="name">Nom de la carte</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="error">{formik.errors.name}</div>
        ) : null}
      </div>
      <div className="form__group">
        <label htmlFor="category">Catégorie</label>
        <select
          name="category"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.category}
        >
          {MOCK_CATEGORY.map(category => (
            <option key={`key-${category}`} value={category}>{category}</option>
          ))}
        </select>
        {formik.touched.category && formik.errors.category ? (
          <div className="error">{formik.errors.category}</div>
        ) : null}
      </div>
      <div className="form__group">
        <label htmlFor="image">Lien de l'image</label>
        <input
          id="image"
          name="image"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.image}
        />
        {formik.touched.image && formik.errors.image ? (
          <div className="error">{formik.errors.image}</div>
        ) : null}
      </div>
      <div className="form__group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          type="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        ></textarea>
        {formik.touched.description && formik.errors.description ? (
          <div className="error">{formik.errors.description}</div>
        ) : null}
      </div>

      <div className="button__wrapper">
        <button type="submit" className="btn">{label}</button>
        <Link to="/" className="btn btn--ghost">Annuler</Link>
      </div>
    </form>
  );

  return (
    <div className="card__form">
      {displayForm()}
      {error && <div className="alert alert--error">Une erreur est survenue</div>}
      {isLoading && (
        <div>Loading ...</div>
      )}
      {/* Message pour la création d'une carte */}
      {!isLoading && card !== null && (
        <div className="alert alert--success">
          <span>Carte {card.name} ajoutée</span>
          <Link to="/">Retour à la liste des cartes</Link>
        </div>
      )}
      {/* Message pour la mise à jour d'une carte */}
      {updated && (
        <div className="alert alert--success">
          <span>Carte {name} modifiée</span>
          <Link to="/">Retour à la liste des cartes</Link>
        </div>
      )}
    </div>
  );
};

CardForm.propTypes = {
  action: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  category: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  onUpdate: PropTypes.func,
};

export default CardForm;
