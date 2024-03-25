import React from 'react';
import Omamori from '../Omamori/Omamori';
import "./OmamoriList.css";

function OmamoriList({omamoris}) {
  return (
    <div className="omamori-list">
      { omamoris.map( omamori => <Omamori omamori={omamori} key={omamori.name}/>)}
    </div>
  );
}

export default OmamoriList;
