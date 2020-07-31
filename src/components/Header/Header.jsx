import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="header">
      <div className="logo">MOONHACK</div>
      <ul className="nav">
        <Link to="/study">
          <li>Study</li>
        </Link>
        <Link to="/explore">
          <li>Explore</li>
        </Link>
      </ul>
    </div>
  );
}
