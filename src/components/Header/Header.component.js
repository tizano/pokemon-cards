import React from 'react';
import Logo from '../../Pokemon.svg';

import './Header.component.scss';

function Header({ title }) {
   return (
       <header className="header">
           <img src={Logo} alt={title} />
           <h1>{title}</h1>
       </header>
   );
};
 
export default Header;
