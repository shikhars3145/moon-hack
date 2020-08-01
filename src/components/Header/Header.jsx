import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

export default function Header() {
  return (
    <div className="header">
      <Link to="/">
        <div className="logo">STARGAZER</div>
      </Link>
      <ul className="nav">
        <Link to="/study">
          <li>Study</li>
        </Link>
        <Link to="/explore">
          <li>Explore</li>
        </Link>
        <li>
          <i className="fas fa-bell"></i>
        </li>
      </ul>
    </div>
  );
}
