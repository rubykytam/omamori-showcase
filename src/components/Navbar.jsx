import React from 'react';
import Searchbar from './Searchbar/Searchbar';

function Navbar({ setKeyword, allTags }) {

  const handleTagClick = (tag) => {
    setKeyword(tag); // Set the keyword when a tag is clicked
    console.log(tag);
  };

  return (
    <div className="d-flex justify-content-between align-items-center w-100 py-2 px-4 bg-success-subtle">
      <div className="d-flex align-items-center">
        <h2>私のお守り</h2>
      </div>
      <div className="d-flex align-items-center gap-5">
        <Searchbar onSearch={setKeyword} />
        <div className="dropdown">
          <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Tags
          </button>
          <ul className="dropdown-menu">
            {allTags.map((tag, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="dropdown-item"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
