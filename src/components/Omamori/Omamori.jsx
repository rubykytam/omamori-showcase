import React from 'react';
import "./Omamori.css";

function Omamori({omamori}) {
  // const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${cafe.title} ${cafe.address}`;
  return (
    <div className="omamori-card">
      <img src={omamori.photo_url} alt={omamori.name} />
      <div>
        <div>
          <h5>{omamori.jinja}</h5>
          <p>
          { omamori.tags?.map(crit => <span key={crit}>{crit}</span>)}
          </p>
        </div>
        {/* <a target="_blank" href={gmapsUrl}>Show the map 📍</a> */}
      </div>
    </div>
  );
}

export default Omamori;
