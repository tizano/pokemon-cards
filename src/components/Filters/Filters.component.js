import React, { memo } from "react";
import PropTypes from 'prop-types';
import MOCK_CATEGORY from '../../datas/category.mock';
import './Filters.component.scss';

function Filters({ categoriesChecked, onFilter }) {
  return (
    <form className="filters">
      {MOCK_CATEGORY.map(category => (
        <div className="filters__group" key={`key-${category}`}>
          <input
            type="checkbox"
            value={category}
            id={`id-${category}`}
            onChange={onFilter}
            checked={categoriesChecked.includes(category)}
          />
          <label htmlFor={`id-${category}`}>{category}</label>
        </div>
      ))}
    </form>
  )
}

Filters.propTypes = {
  categoriesChecked: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired
};

export default memo(Filters);
