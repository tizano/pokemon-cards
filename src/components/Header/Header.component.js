import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Pokemon.svg';

import './Header.component.scss';

function Header({ title }) {
  return (
    <header className="header">
      <Link to="/">
          <img src={Logo} alt={title} />
      </Link>
      <h1>{title}</h1>
    </header>
  );
};
 
export default Header;
