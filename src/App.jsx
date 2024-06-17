import React, { useState, useEffect, useCallback } from 'react';
import OmamoriList from './components/OmamoriList/OmamoriList';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [omamoris, setOmamoris] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [allTags, setAllTags] = useState([]);

  // Function to fetch omamoris based on keyword
  const fetchOmamoris = useCallback(() => {
    let url = `https://omamori-api-4689048697bb.herokuapp.com/api/v1/omamoris`;
    if (keyword !== "") {
      url += `?search=${keyword}`;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setOmamoris(data);
      })
      .catch(error => console.error('Error fetching omamoris:', error));
  }, [keyword]);

  // Function to fetch all tags once when component mounts
// Function to fetch all tags once when component mounts
const fetchAllTags = useCallback(() => {
  const url = `https://omamori-api-4689048697bb.herokuapp.com/api/v1/omamoris`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const tagCounts = {};
      data.forEach(omamori => {
        const name = omamori.name;
        tagCounts[name] = tagCounts[name] ? tagCounts[name] + 1 : 1;
      });
      setAllTags(tagCounts);
    })
    .catch(error => console.error('Error fetching all tags:', error));
}, []);


  // useEffect to fetch omamoris based on keyword
  useEffect(() => {
    fetchOmamoris();
  }, [fetchOmamoris, keyword]);

  // useEffect to fetch allTags once when component mounts and when omamoris updates
  useEffect(() => {
    fetchAllTags();
  }, [fetchAllTags, omamoris]); // Update allTags when omamoris changes

  // Function to add new omamori
  const addOmamori = useCallback((newOmamori) => {
    setOmamoris(prevOmamoris => [...prevOmamoris, newOmamori]);
    setKeyword(""); // Ensure setKeyword("") is called
    console.log('Keyword after setKeyword(""):', keyword); // Check keyword value after setting
  }, [setOmamoris, setKeyword]);

  return (
    <div className='app-frame'>
      <Navbar setKeyword={setKeyword} allTags={allTags} />
      <div className="app-body">
        <Sidebar fetchOmamoris={fetchOmamoris} addOmamori={addOmamori} />
        <OmamoriList omamoris={omamoris} />
      </div>
    </div>
  );
}

export default App;
