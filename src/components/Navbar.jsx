import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import "./Navbar.css";

function Navbar({ setKeyword, allTags }) {
  const handleTagClick = (tag) => {
    setKeyword(tag); // Set the keyword when a tag is clicked
  };

  return (
    <div className="Navbar d-flex justify-content-between align-items-bottom w-100 py-2 px-4">
      <div className="d-flex align-items-center">
        <h2>私のお守り</h2>
      </div>
      <div className="d-flex align-items-center gap-5">
        <Searchbar onSearch={setKeyword} />
        <div className="dropdown">
          <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            ご利益
          </button>
          <ul className="dropdown-menu">
            {Object.keys(allTags).map((tag, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="dropdown-item"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag} ({allTags[tag]})
                </a>
              </li>

            ))}
                <li>
      <a
        href="#"
        className="dropdown-item"
        onClick={() => handleTagClick('')}
      >
        一覧
      </a>
    </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
