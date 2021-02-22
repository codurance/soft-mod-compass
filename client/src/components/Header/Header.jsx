import React from 'react';
import CoduranceLogo from '../../assets/icons/logo-codurance.svg';
import CompassLogo from '../../assets/icons/logo-compass.svg';
import './styles.scss';

function Header() {
  return (
    <header className="header">
      <img src={CoduranceLogo} alt="Codurance" />
      <span className="header__separator" />
      <img src={CompassLogo} alt="Compass" />
    </header>
  );
}

export default Header;
