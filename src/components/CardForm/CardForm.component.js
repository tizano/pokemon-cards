import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { createCard, updateCardById } from "../../services/pokemon.services";
import MOCK_CATEGORY from '../../datas/category.mock';

function CardForm({
  action,
  label,
  id,
  category,
  image,
  name,
  description,
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

  const handleUpdate = async(values, callback) => {
    setError(false);
    setIsLoading(true);
    try {
      const result = await updateCardById(id, values);
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
        handleUpdate(values, resetForm);
      } else {
        handleCreate(values, resetForm);
      }
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
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

        <button type="submit">{label}</button>
        <Link to="/">Annuler</Link>
      </form>
      {error && <div>Une erreur est survenue</div>}
      {isLoading && card === null && (
        <div>Loading ...</div>
      )}
      {!isLoading && card !== null && (
        <div>
          <span>Carte {card.name} {action === 'update' ? 'modifiée' : 'ajoutée'}</span>
          <Link to="/">Retour à la liste des cartes</Link>
        </div>
      )}
    </div>
    
  );
};

export default CardForm;
