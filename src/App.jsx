import './App.css';
import React from 'react';
import OmamoriList from './components/OmamoriList/OmamoriList';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [omamoris, setOmamoris] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");

  React.useEffect(() => {
    const url = `https://omamori-api-4689048697bb.herokuapp.com/api/v1/omamoris${keyword !== "" ? `?search=${keyword}` : ""}`;
    console.log(`Fetching data from: ${url}`); // Log URL for debugging
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        console.log('Fetched data:', data); // Log fetched data for debugging
        setOmamoris(data);
      })
      .catch(error => console.error('Error fetching data:', error)); // Log any errors
  }, [keyword]);

  return (
    <div className='app-frame'>
      {<Navbar setKeyword={setKeyword} omamoris={omamoris}/>}
      <div className="app-body">


        <OmamoriList omamoris={omamoris}/>
        {<Sidebar setOmamoris={setOmamoris} />}
      </div>
    </div>
  );
}

export default App;
