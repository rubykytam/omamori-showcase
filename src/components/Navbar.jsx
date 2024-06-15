import React from 'react';
// import logo from '../assets/logo.png';
import Searchbar from './Searchbar/Searchbar';

function Navbar({ setKeyword , omamoris}) {

  const uniqueTags = [...new Set(omamoris.flatMap(omamori => omamori.tags))];

  return (
    <div className="d-flex justify-content-between align-items-center w-100 py-2 px-4 bg-success-subtle">
      <div className="d-flex align-items-center">
        {/* <img height="56" className="me-3" src={logo} alt="keyboard and matcha logo" /> */}
        <h2>私のお守り</h2>
      </div>
      <div className="d-flex align-items-center gap-5">
      <Searchbar onSearch={setKeyword} />
        <div className="dropdown">
          <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fa-solid fa-bars"></i>
          </button>
          <ul className="dropdown-menu">
          {uniqueTags.map((tag, index) => (
          <li key={index}><a className="dropdown-item" href="#">{tag}</a></li>
        ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
