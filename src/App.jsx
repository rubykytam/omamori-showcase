import './App.css';
import React from 'react';
import OmamoriList from './components/OmamoriList/OmamoriList';

function App() {
  const [omamoris, setOmamoris] = React.useState([]);
  // const [keyword, setKeyword] = React.useState("");

  React.useEffect(() => {
    const url = "https://omamori-api-4689048697bb.herokuapp.com/api/v1/omamoris";
    // const params = (keyword !== "") ? `?title=${keyword}` : "";
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        setOmamoris(data);
      });
  });

  return (
    <div className='app-frame'>
      {/* <Navbar setKeyword={setKeyword}/> */}
      <div className="app-body">
        {/* <Sidebar setCafes={setCafes} /> */}
        <p></p>
        <p>app body</p>
        <OmamoriList omamoris={omamoris}/>
      </div>
    </div>
  );
}

export default App;
